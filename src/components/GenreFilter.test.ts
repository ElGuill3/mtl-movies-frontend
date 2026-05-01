import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GenreFilter from './GenreFilter.vue'
import type { Genre } from '../types/media'

const mockGenres: Genre[] = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
  { id: 3, name: 'Thriller' },
]

describe('GenreFilter', () => {
  describe('rendering', () => {
    it('renders select with genres', () => {
      const wrapper = mount(GenreFilter, {
        props: { genres: mockGenres, modelValue: null },
      })

      const select = wrapper.find('select')
      expect(select.exists()).toBe(true)
    })

    it('renders all genre options', () => {
      const wrapper = mount(GenreFilter, {
        props: { genres: mockGenres, modelValue: null },
      })

      const options = wrapper.findAll('option')
      // "All Genres" + 3 genres
      expect(options.length).toBe(4)
    })

    it('shows "All Genres" as first option', () => {
      const wrapper = mount(GenreFilter, {
        props: { genres: mockGenres, modelValue: null },
      })

      const firstOption = wrapper.find('option')
      expect(firstOption.text()).toBe('All Genres')
      expect(firstOption.attributes('value')).toBe('')
    })

    it('shows correct genre names', () => {
      const wrapper = mount(GenreFilter, {
        props: { genres: mockGenres, modelValue: null },
      })

      const options = wrapper.findAll('option')
      expect(options[1].text()).toBe('Action')
      expect(options[2].text()).toBe('Drama')
      expect(options[3].text()).toBe('Thriller')
    })
  })

  describe('emitting', () => {
    it('emits update:modelValue when selection changes', async () => {
      const wrapper = mount(GenreFilter, {
        props: { genres: mockGenres, modelValue: null },
      })

      const select = wrapper.find('select')
      await select.setValue('Action')

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
      expect(wrapper.emitted()['update:modelValue']![0]).toEqual(['Action'])
    })

    it('emits genre-id when genre is selected', async () => {
      const wrapper = mount(GenreFilter, {
        props: { genres: mockGenres, modelValue: null },
      })

      const select = wrapper.find('select')
      await select.setValue('Action')

      expect(wrapper.emitted()['genre-id']).toBeTruthy()
      expect(wrapper.emitted()['genre-id']![0]).toEqual(['Action'])
    })
  })
})