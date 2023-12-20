'use client'

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import clsx from 'clsx'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const props = useTheme()
  console.log(props)

  return (
    <button className='absolute top-5 right-5 py-2 px-4 rounded border bg-neutral-2 border-neutral-6 text-neutral-12' type='button' >
      {props.theme}
    </button>
  )
}
