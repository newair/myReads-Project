import { useEffect, useState } from 'react'

/**
 * This is a generic debounce custom hook.
 * @param {*} value 
 * @param {*} delay 
 * @returns 
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}