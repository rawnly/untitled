---
title: Thread safe queue in Rust 🦀
summary: A simple FIFO queue implemented in Rust with thread safety
date: 2023-01-21
origin: https://medium.com/swlh/thread-safe-queue-in-rust-1ed1acb9b93e
tags:
  - rust
  - thread-safety
  - multi-threading
---

I started my rust journey ~1 year ago and I feel like it helped me a lot to become a better developer, even if I primarily work with React and Typescript.

Today I'd like to share with you what I learned about thread safety in rust, by implementing a simple data structure such as a FIFO queue.

Let's get started by declaring a trait to describe our queues:

```rust
trait Queue<T> {
	/// Create a new, empty queue
	fn new() -> Self;

	/// Enqueue a new value
	fn push(&self, value: T);

	/// Dequeue a value
	/// Returns None if the queue is empty
	fn pop(&self) -> Option<T>;

	/// Returns the number of elements enqueued
	fn len(&self) -> usize;

	/// Checks if the `size()` is 0
	fn is_empty(&self) -> bool;
}
```

This trait can then be implemented by a struct or data type to create a queue. The actual implementation of the methods will depend on the type of queue that you want to create.

## Implementation

Ok, now that we have our generic trait we can start writing some code for our first queue, the FIFO (_First In, First Out_)

```rust
///! queue/mod.rs
use std::collections::VecDeque;

/// A FIFO queue implemented using a VecDeque
struct FifoQueue<T> {
    /// The underlying data structure of the queue
	data: VecDeque<T>
}
```

It's a simple generic struct with a `data` parameter holding the enqueued values. We use `VecDeque{:rust}` over `Vec{:rust}` for some convenience methods that we'll see later on.

Now let's implement our `Queue<T>{:rust}` trait for `FifoQueue<T>{:rust}`

```rust
///! queue/prelude.rs
impl<T> Queue<T> for FifoQueue<T> {
	fn new() -> Self {
		Self {
			data: VecDeque::new()
		}
	}

	/// Adds an element to the back of the queue
	fn push(&self, value: T) {
		self.data.push_back(value)
	}

	/// Removes an element from the front of the queue
	fn pop(&self) -> Option<T> {
		self.data.pop_front()
	}

	fn len(&self) -> usize {
		self.data.len()
	}

	fn is_empty(&self) -> bool {
		self.data.is_empty()
	}
}
```

The reason why we choose to use `VecDeque{:rust}` over a simple `Vec{:rust}` is the ability to use the `pop_front` / `push_back` and later on `pop_back` / `push_front` methods

## Thread Safe? How?

Our queue now is completed but is not thread-safe, so it is subject to race conditions and errors if accessed from multiple threads at the same time.

> It's important to note that making a queue thread-safe can have an impact on performance, as synchronization mechanisms can slow down access to the queue. Therefore, it's important to evaluate whether a thread-safe queue is really necessary based on the needs of the program.

To make our queue struct thread safe we just have to wrap the `data` property holding our values with a `Mutex{:rust}` (`std::sync::Mutex{:rust}` and `CondVar{:rust}`) and check for its status on every operation.

```diff
- data: VecDeque<T>
+ data: Mutex<VecDeque<T>>
+ cv: CondVar
```

The `Mutex{:rust}` alone is not enough to be safe. The `CondVar{:rust}` will allow us to wait for the queue to be populated before popping an element. In this way we can run 100 `pushes` and `pops` in parallel and have as a final result an empty queue.

First of all, let's update the `pop` method to return the element (`T`) itself and not the `Option`

```diff
- fn pop(&self) -> Option<T>;
+ fn pop(&self) -> T;
```

> We update the method in the trait `queue/prelude.rs` to return always the element since now with `CondVar{:rust}` we wait for the queue to be populated before popping an element.

```rust
///! queue/mod.rs
use std::{ collections::VecDeque, sync::{Mutex, CondVar} };

/// includes common traits
pub mod prelude;

// import our Queue<T> trait
use self::prelude::*;

struct FifoQueue<T> {
	data: Mutex<VecDeque<T>>,
	/// The condvar used to signal when the queue is not empty
	cv: CondVar
}

impl<T> Queue<T> for FifoQueue<T> {
	fn new() -> Self {
		Self {
			data: Mutex::new(VecDeque::new()),
			cv: CondVar::new()
		}
	}

	/// push input on the back of the queue
	/// - unrecoverable if lock fails so just unwrap
	fn push(&self, value: T) {
		let mut data = self.data.lock().unwrap();
		data.push_back(value)

		// notify the thread that the queue has been populated
		self.cv.notify_one();
	}

	/// pop element from the queue
	/// - unrecoverable if the lock fails so just unwrap
	/// - same for condvar variable
	fn pop(&self) -> T {
		let mut data = self.data.lock().unwrap();

		// wait for the notification if the queue is empty
		while data.is_empty() {
			data = self.cv.wait(data).unwrap();
		}

		data.pop_front().unwrap()
	}

	fn len(&self) -> usize {
		let data = self.data.lock().unwrap();
		data.len()
	}

	fn is_empty(&self) -> bool {
		let data = self.data.lock().unwrap();
		data.is_empty()
	}
}
```

## Testing

In the following test, we create a new queue using the `Arc{:rust}` (atomic reference count) of Rust, which allows us to share the queue instance safely between threads. Once the threads are completed, the tests check if the queue contains the inserted elements by all the threads.

```rust
///! queue/mod.rs
use std::{ thread, sync::Arc, time::Duration };

#[cfg(test)]
mod test {
    use crate::queue::prelude::*;
    use crate::queue::FifoQueue;
    use std::{sync::Arc, thread};

    #[test]
    fn test_queue_thread_safety() {
        // create a queue of numbers
        let queue = Arc::new(FifoQueue::<i32>::new());

        let q1 = queue.clone();
        let t1 = thread::spawn(move || {
            q1.push(1);
            q1.push(2);
        });

        let q2 = queue.clone();
        let t2 = thread::spawn(move || {
            q2.push(3);
            q2.push(4)
        });

        t1.join().unwrap();
        t2.join().unwrap();

        assert_eq!(queue.len(), 4);
    }
}
```

This is just an example of how we can test the queue. As always this code can be tested in multiple ways, you could add some tests to check concurrent `pushes` and `pops` or test mixed operations.

> Hint: you can also add some delays using `thread::sleep(){:rust}` to fake some overload.

## TLDR

Thread-safe queues are data structures that allow multiple threads to safely add and remove elements from a queue without the risk of data corruption or race conditions. In Rust, thread-safe queues can be implemented using a variety of techniques, including using a mutex to synchronize access to the queue, using an atomic reference counter to track shared ownership of the queue, or using a lock-free queue data structure. It is important to carefully consider the trade-offs of each approach and choose the one that is most appropriate for the specific needs of the application.

You can find example code at [](https://github.com/rawnly/queue-rs)
