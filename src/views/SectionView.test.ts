import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import SectionView from './SectionView.vue'

// Helper to create router with mocked route
const createRouterWithRoute = (type: string) => {
  return createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: `/section/${type}`,
        component: SectionView,
        props: true,
      },
      { path: '/', component: { template: '<div>Home</div>' } },
    ],
  })
}

describe('SectionView', () => {
  describe('rendering', () => {
    it('renders section title based on route params', () => {
      const router = createRouterWithRoute('movie')
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          router,
        },
      })

      expect(wrapper.find('.section-view__title').text()).toBe('Movies')
    })

    it('renders back button', () => {
      const router = createRouterWithRoute('movie')
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          router,
        },
      })

      expect(wrapper.find('.section-view__back').exists()).toBe(true)
    })

    it('renders search bar', () => {
      const router = createRouterWithRoute('movie')
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          router,
        },
      })

      expect(wrapper.find('.search-bar').exists()).toBe(true)
    })

    it('renders genre filter', () => {
      const router = createRouterWithRoute('movie')
      const wrapper = mount(SectionView, {
        props: { type: 'movie' },
        global: {
          router,
        },
      })

      expect(wrapper.find('.genre-filter').exists()).toBe(true)
    })
  })
})