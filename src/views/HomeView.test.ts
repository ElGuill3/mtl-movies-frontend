import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from './HomeView.vue'

describe('HomeView', () => {
  describe('rendering', () => {
    it('renders the page title', () => {
      const wrapper = mount(HomeView)
      expect(wrapper.find('.home-view__title').text()).toBe('MTL Movies')
    })

    it('renders three MediaRow sections', () => {
      const wrapper = mount(HomeView)
      // Find all MediaRow components in the template
      const rows = wrapper.findAll('.media-row')
      expect(rows.length).toBe(3)
    })

    it('renders Movies section header', () => {
      const wrapper = mount(HomeView)
      expect(wrapper.text()).toContain('Movies')
    })

    it('renders Series section header', () => {
      const wrapper = mount(HomeView)
      expect(wrapper.text()).toContain('Series')
    })

    it('renders Anime section header', () => {
      const wrapper = mount(HomeView)
      expect(wrapper.text()).toContain('Anime')
    })
  })
})