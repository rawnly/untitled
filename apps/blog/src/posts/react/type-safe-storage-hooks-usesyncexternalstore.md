---
title: "Type-Safe Storage Hooks in React"
date: 2026-02-10
summary: "React 18 introduced a powerful but often overlooked hook: useSyncExternalStore, let's see how to use it"
tags:
  - react
  - typescript
  - frontend
  - web
---

React 18 introduced a powerful but often overlooked hook: `useSyncExternalStore`. While it often flies under the radar, it is the modern standard for subscribing to external data sources. In this article, we'll explore how to leverage this hook to build robust, type-safe storage hooks for `localStorage` and `sessionStorage`.

## The Problem with External Stores

Before diving into the solution, let's understand the problem. Browser storage APIs like `localStorage` and `sessionStorage` are external to React's state management system. This creates several challenges:

1. **Tearing**: In React 18's concurrent rendering model, your UI could display inconsistent states if the external store changes mid-render (showing a mix of old and new values)
2. **Synchronization**: Changes to storage in one tab should reflect in other tabs
3. **Server-Side Rendering**: Storage APIs don't exist on the server, requiring careful handling
4. **Type Safety**: Native storage APIs only work with strings, making type safety challenging

## Enter useSyncExternalStore

`useSyncExternalStore` is React's answer to these challenges. It takes three arguments:

```typescript
useSyncExternalStore(
  subscribe,    // Function to subscribe to the external store
  getSnapshot,  // Function to get the current value
  getServerSnapshot // Optional: value to use during SSR
)
```

The hook ensures that:
- Your component re-renders when the external store changes
- There's no tearing during concurrent rendering
- SSR works correctly with a separate server snapshot

## Building a Storage Hook

Let's see how to build a production-ready storage hook using this pattern. Here's the core implementation:

```typescript
import { useSyncExternalStore, useCallback, useRef } from "react";

function subscribeToStorage(
  key: string,
  storage: Storage,
  callback: (v: string | null) => void,
) {
  function handleStorageEvent(event: StorageEvent) {
    if (event.storageArea !== storage || event.key !== key) return;
    callback(event.newValue);
  }

  window.addEventListener("storage", handleStorageEvent, false);
  return () => window.removeEventListener("storage", handleStorageEvent, false);
}

export function useStorage<T>(
  key: string,
  defaultValue: T | null,
  options: { storage: Storage },
) {  
  function parseValue(value: string | null): T | null {
    if (!value) return defaultValue;

    try {
      return JSON.parse(value);
    } catch {
      return defaultValue;
    }
  }

  // basic snapshot implementation, we’ll see later how to improve this 
  const getSnapshot = () => parseValue(options.storage.getItem(key))

  const value = useSyncExternalStore(
    (callback) => subscribeToStorage(key, options.storage, callback),
    getSnapshot,
    () => defaultValue, // Server snapshot
  );

  const setValue = useCallback(
    function (newValue: T) {
      options.storage.setItem(key, JSON.stringify(newValue));
    },
    [key, options.storage],
  );

  return [value, setValue] as const;
}
```

## Breaking Down and improve the Implementation

### 1. The Subscribe Function

```typescript
function subscribeToStorage(
  key: string,
  storage: Storage,
  callback: (v: string | null) => void,
) {
  function handleStorageEvent(event: StorageEvent) {
    if (event.storageArea !== storage || event.key !== key) return;
    callback(event.newValue);
  }

  window.addEventListener("storage", handleStorageEvent, false);
  return () => window.removeEventListener("storage", handleStorageEvent, false);
}
```

The subscribe function listens to the `storage` event, which fires when storage changes in **other tabs**. This gives us cross-tab synchronization for free. The function returns a cleanup function to remove the listener.

**NOTE**: Because the storage event does not fire for changes made within the same window, a production version should also trigger a local update when `setValue` is called. We can do this by emitting a custom `StorageEvent` ourselves or by triggering a react state update.

I’ll go for the first option:

```diff
const setValue = useCallback(
  function (newValue: T) {
+  	const raw = JSON.stringify(newValue)
+    options.storage.setItem(key, raw);
-    options.storage.setItem(key, JSON.stringify(newValue));

+   // emit a fake storage-event 
+   window.dispatchEvent(new StorageEvent(“storage”, {
+		key,
+		newValue: raw,
+		storageArea: options.storage
+	}))
  },
  [key, options.storage],
);
```

### 2. The Snapshot Functions
In order to reduce unnecessary re-renderings that may cause infinite-loops we can provide our snapshot a cache to check 
if the value we’re going to parse changed since last time we parsed it. 

> NOTE: this is for educational purposes only, in a real-world scenario you might want to
> evaluate your data to see if it’s large enough to justify a memory overload. If parsing is not compute-heavy
> the extra logic might add complexity without a noticeable impact. However this remain a critical point if
> the returned value is used as dependency of other hooks such as `useEffect` or `useMemo`.

```typescript
// we use a Ref to cache last parsed value and its string value
const cache = useRef<{ raw: string | null; value: T | null }>({ raw:null, value:null})

const getSnapshot = useCallback(() => {
  const raw = options.storage.getItem(key)
  // skip cache on first load
  if ( cache.current.raw === raw && cache.current.raw !== null) return cache.current.value
  
  if (raw === null) {
    cache.current = { raw, value: defaultValue }
    return defaultValue
  }

  try {
    const parsed = parseValue(raw)
    cache.current = { raw, value: parsed }
    return parsed
  } catch {
    cache.current = { raw, value: defaultValue }
    return defaultValue
  }
}, [key, defaultValue, options.storage])

const value = useSyncExternalStore(
  (callback) => subscribeToStorage(key, options.storage, callback),
  getSnapshot,  		// Client snapshot
  () => defaultValue,   // Server snapshot
);
```

- The **client snapshot** reads the current value from storage
- The **server snapshot** returns the default value (remember: `Storage APIs` are unavailable on the server, which can lead to hydration mismatches)

### 3. Type-Safe Updates

By automatically serialize to JSON, we allowing you to store any JSON-serializable data while maintaining type safety. Emitting the `StorageEvent` ourselves ensures that the current tab is also notified.

```typescript
const setValue = useCallback(
  function <T>(newValue: T) {
    const raw = JSON.stringify(newValue)
	options.storage.setItem(key, raw);

	window.dispatchEvent(new StorageEvent(“storage”, {
		key,
		newValue: raw,
		storageArea: options.storage
	}))
  },
  [key, options.storage],
);
```

## Convenience Wrappers

With the base implementation, we can create convenient wrappers:

```typescript
export function useLocalStorage<T>(
  key: string,
  defaultValue: T | null = null,
) {
  return useStorage(key, defaultValue, { storage: localStorage });
}

export function useSessionStorage<T>(
  key: string,
  defaultValue: T | null = null,
) {
  return useStorage(key, defaultValue, { storage: sessionStorage });
}

// in-memory storage helper
function makeStorage() {
  const m = new Map()
  
  return {
    setItem: (key: string, value: string) => m.set(key, value),
    getItem: (key: string) => m.get(key),
    removeItem: (key: string) => m.delete(key),
    key: (index: number) => Array.from(m.keys())[index],
    length: m.size,
    clear: () => m.clear(),
  } satisfies Storage 
}

const memoryStorage = makeStorage()

export function useMemStorage<T>(
  key: string,
  defaultValue: T | null = null
) {
  return useStorage(key, defaultValue, {
    storage: memoryStorage
  })
}
```

## Adding Schema Validation

To make our hooks even more robust, we can add runtime validation using the [Standard Schema](https://github.com/standard-schema/standard-schema) specification:

```typescript
interface Options<T> {
  storage: Storage;
  schema?: StandardSchemaV1<T>;
}

export function useStorage<T>(
  key: string,
  defaultValue: T | null,
  options: Options<T>,
) {
  function parseValue(value: string | null): T | null {
    if (!value) return defaultValue;

    const parsedValue = parseJSON<T>(value);
    if (!parsedValue.ok) return defaultValue;

    // Validate against schema if provided
    if (options.schema) {
      // read standard-schema docs to understand how to write your own `syncValidateSchema`
      return syncValidateSchema(options.schema, parsedValue.value);
    }

    return parsedValue.value;
  }

  // ... rest of implementation
}
```

This allows you to validate data at runtime, ensuring that stored values match your expected schema:

```typescript
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const [user, setUser] = useLocalStorage("user", null, {
  schema: userSchema, // Using a Standard Schema-compatible validator
});
```

Since we used a standard-schema implementation the developer using our hook will be able to use any schema validation library to parse and validate the data.

## Real-World Usage

Here's how you'd use these hooks in a real application:

```typescript
function UserPreferences() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(
    'theme',
    'light'
  );

  const [sessionId, setSessionId] = useSessionStorage<string>(
    'sessionId',
    null
  );

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme (Current: {theme})
      </button>
      <p>Session ID: {sessionId}</p>
    </div>
  );
}
```

## The Benefits

By leveraging `useSyncExternalStore`, we get:

1. **Concurrent-Safe**: No tearing in React 18's concurrent mode
2. **Cross-Tab Sync**: Changes in one tab automatically reflect in others
3. **SSR Compatible**: Works seamlessly with server-side rendering
4. **Type-Safe**: Full TypeScript support with generic types
5. **Schema Validation**: Optional runtime validation for data integrity
6. **Minimal Bundle**: Small, focused implementation with zero dependencies (except React)

## Performance Considerations

One concern with storage hooks is performance. However, `useSyncExternalStore` is optimized for this:

- It only re-renders when the subscribed value actually changes
- The subscription is managed by React, ensuring proper cleanup
- Reading from storage is synchronous and fast
- The `storage` event only fires for changes in other tabs, not the current one

## Conclusion

`useSyncExternalStore` is a powerful primitive for building hooks that interact with external data sources. By understanding its API and guarantees, we can build robust storage hooks that handle edge cases gracefully.

The pattern shown here can be extended to other external stores:
- WebSocket connections
- Browser APIs (Geolocation, Media Devices, etc.)
- IndexedDB
- Custom pub/sub systems

The key insight is that `useSyncExternalStore` bridges the gap between React's declarative model and imperative external APIs, giving you the best of both worlds.

## Further Reading

- [React useSyncExternalStore Documentation](https://react.dev/reference/react/useSyncExternalStore)
- [Standard Schema Specification](https://github.com/standard-schema/standard-schema)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

---

**Implementation Note**: The complete, production-ready implementation with tests is available in this repository. Feel free to use it in your projects or as a learning resource.
