import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import SectionView from './SectionView.vue'

// Create router outside tests
const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', component: {} }],
})

describe('SectionView', () => {
  describe('rendering', () => {
    it('renders section title based on props', () => {
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          plugins: [router],
        },
      })

      expect(wrapper.find('.section-view__title').text()).toBe('Movies')
    })

    it('renders back button', () => {
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          plugins: [router],
        },
      })

      expect(wrapper.find('.section-view__back').exists()).toBe(true)
    })

    it('renders search bar', () => {
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          plugins: [router],
        },
      })

      expect(wrapper.find('.search-bar').exists()).toBe(true)
    })

    it('renders genre filter', () => {
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          plugins: [router],
        },
      })

      expect(wrapper.find('.genre-filter').exists()).toBe(true)
    })
  })
})