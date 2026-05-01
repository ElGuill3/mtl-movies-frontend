import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

// Mock useDebounce
vi.mock('../composables/useDebounce', () => ({
  useDebounce: (fn: (...args: unknown[]) => void, _delay: number) => {
    void _delay // unused in mock
    return (...args: unknown[]) => {
      // Immediate call for testing
      fn(...args)
    }
  },
}))

describe('SearchBar', () => {
  describe('rendering', () => {
    it('renders search input', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      })

      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
    })

    it('displays current value in input', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: 'inception' },
      })

      const input = wrapper.find('input')
      expect((input.element as HTMLInputElement).value).toBe('inception')
    })
  })

  describe('emitting', () => {
    it('emits update:modelValue when user types', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      })

      const input = wrapper.find('input')
      await input.setValue('inception')

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
      expect(wrapper.emitted()['update:modelValue']![0]).toEqual(['inception'])
    })

    it('emits search event after input', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      })

      const input = wrapper.find('input')
      await input.setValue('inception')

      // The debounced emit happens as search
      expect(wrapper.emitted()['search']).toBeTruthy()
      expect(wrapper.emitted()['search']![0]).toEqual(['inception'])
    })
  })

  describe('clear button', () => {
    it('shows clear button when input has value', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: 'test' },
      })

      const clearBtn = wrapper.find('.search-bar__clear')
      expect(clearBtn.exists()).toBe(true)
    })

    it('does not show clear button when input is empty', () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: '' },
      })

      const clearBtn = wrapper.find('.search-bar__clear')
      expect(clearBtn.exists()).toBe(false)
    })

    it('clears input when clear button is clicked', async () => {
      const wrapper = mount(SearchBar, {
        props: { modelValue: 'test' },
      })

      const clearBtn = wrapper.find('.search-bar__clear')
      await clearBtn.trigger('click')

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
      expect(wrapper.emitted()['update:modelValue']![0]).toEqual([''])
    })
  })
})