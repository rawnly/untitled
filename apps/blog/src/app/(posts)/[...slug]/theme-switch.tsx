'use client'

import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export default function ThemeSwitch(props: { className?: string }) {
  const { resolvedTheme: theme, setTheme } = useTheme()

  return (
    <button 
      type='button' 
      onClick={() => setTheme(theme==='dark'?'light':'dark')}
      className={clsx(
        'hover:bg-neutral-2 active:bg-neutral-3 rounded text-neutral-12',
        'aspect-square p-3',
        'flex items-center justify-center',
        props.className
      )}
    >
      {theme==='dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
