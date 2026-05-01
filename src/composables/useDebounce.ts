import { ref } from 'vue'

type AnyFunction = (...args: unknown[]) => unknown

export function useDebounce<T extends AnyFunction>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

// Also export a promise-based version for use in async contexts
export function useDebouncedValue<T>(initialValue: T, delay: number) {
  const value = ref<T>(initialValue)
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const setValue = (newValue: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      value.value = newValue
      timeoutId = null
    }, delay)
  }

  return { value, setValue }
}