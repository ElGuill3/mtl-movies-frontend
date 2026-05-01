import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import PlayerView from './PlayerView.vue'
import type { MediaItem } from '../types/media'

// Mock getMediaById
vi.mock('../api/mediaApi', () => ({
  getMediaById: vi.fn(),
}))

import { getMediaById } from '../api/mediaApi'
const mockedGetMediaById = vi.mocked(getMediaById)

// Mock VideoPlayer
vi.mock('../components/VideoPlayer.vue', () => ({
  default: {
    name: 'VideoPlayer',
    template: '<div class="video-player-mock"></div>',
    props: ['src', 'error'],
  },
}))

const mockItem: MediaItem = {
  id: 1,
  title: 'Inception',
  type: 'movie',
  year: 2010,
  path: '/movies/inception.mp4',
  duration_seconds: 7200,
  codec: 'h264',
  resolution: '1080p',
  tmdb_id: 27205,
  overview: 'A thief.',
  vote_average: 8.8,
  genres: 'Action,Thriller',
  poster_url: 'https://example.com/inception.jpg',
  backdrop_url: null,
}

describe('PlayerView', () => {
  describe('rendering', () => {
    it('renders back button', async () => {
      mockedGetMediaById.mockResolvedValue(mockItem)

      const wrapper = mount(PlayerView, {
        props: { id: '1' },
        global: {
          plugins: [
            createRouter({
              history: createWebHashHistory(),
              routes: [{ path: '/', component: {} }],
            }),
          ],
        },
      })

      // Wait for onMounted to complete
      await new Promise((resolve) => setTimeout(resolve, 100))

      const backBtn = wrapper.find('.player-view__back')
      expect(backBtn.exists()).toBe(true)
    })

    it('renders title', async () => {
      mockedGetMediaById.mockResolvedValue(mockItem)

      const wrapper = mount(PlayerView, {
        props: { id: '1' },
        global: {
          plugins: [
            createRouter({
              history: createWebHashHistory(),
              routes: [{ path: '/', component: {} }],
            }),
          ],
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(wrapper.text()).toContain('Inception')
    })

    it('renders VideoPlayer component', async () => {
      mockedGetMediaById.mockResolvedValue(mockItem)

      const wrapper = mount(PlayerView, {
        props: { id: '1' },
        global: {
          plugins: [
            createRouter({
              history: createWebHashHistory(),
              routes: [{ path: '/', component: {} }],
            }),
          ],
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 100))

      const videoPlayer = wrapper.find('.video-player-mock')
      expect(videoPlayer.exists()).toBe(true)
    })
  })

  describe('data loading', () => {
    it('calls getMediaById with id from route', async () => {
      mockedGetMediaById.mockResolvedValue(mockItem)

      mount(PlayerView, {
        props: { id: '1' },
        global: {
          plugins: [
            createRouter({
              history: createWebHashHistory(),
              routes: [{ path: '/', component: {} }],
            }),
          ],
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(mockedGetMediaById).toHaveBeenCalledWith(1)
    })
  })

  describe('error state', () => {
    it('shows error when media not found', async () => {
      mockedGetMediaById.mockRejectedValue(new Error('Media not found'))

      const wrapper = mount(PlayerView, {
        props: { id: '999' },
        global: {
          plugins: [
            createRouter({
              history: createWebHashHistory(),
              routes: [{ path: '/', component: {} }],
            }),
          ],
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(wrapper.text()).toContain('Media not found')
    })
  })
})