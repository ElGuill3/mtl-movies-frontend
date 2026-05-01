import { describe, it, expect } from 'vitest'

describe('useDebounce', () => {
  it('is a function that returns a debounced version of the given function', async () => {
    // Simple test: the composable exports a function
    const { useDebounce } = await import('../composables/useDebounce')

    let callCount = 0
    const fn = vi.fn(() => {
      callCount++
      return 'result'
    })

    const debouncedFn = useDebounce(fn, 300)

    // Should not call immediately
    expect(callCount).toBe(0)

    // Call first time
    debouncedFn('arg1')
    expect(callCount).toBe(0) // still 0 because of debounce

    // Wait and check
    await new Promise((resolve) => setTimeout(resolve, 350))
    expect(callCount).toBe(1)
  })

  it('debounces multiple calls within the delay period', async () => {
    const { useDebounce } = await import('../composables/useDebounce')

    let callCount = 0
    const fn = vi.fn(() => {
      callCount++
    })

    const debouncedFn = useDebounce(fn, 300)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(callCount).toBe(0)

    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(callCount).toBe(1)
  })
})