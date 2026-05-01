import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MediaCard from './MediaCard.vue'
import type { MediaItem } from '../types/media'

// Push spy for navigation
const pushSpy = vi.fn()

// Mock vue-router at top level
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushSpy,
  }),
}))

const mockMovie: MediaItem = {
  id: 1,
  title: 'Inception',
  type: 'movie',
  year: 2010,
  path: '/movies/inception.mp4',
  duration_seconds: 7200,
  codec: 'h264',
  resolution: '1080p',
  tmdb_id: 27205,
  overview: 'A thief who steals corporate secrets.',
  vote_average: 8.8,
  genres: 'Action,Thriller',
  poster_url: 'https://image.tmdb.org/inception.jpg',
  backdrop_url: null,
}

describe('MediaCard', () => {
  beforeEach(() => {
    pushSpy.mockClear()
  })

  describe('rendering', () => {
    it('renders poster image with correct src', () => {
      const wrapper = mount(MediaCard, {
        props: { media: mockMovie },
      })

      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('https://image.tmdb.org/inception.jpg')
    })

    it('renders title text', () => {
      const wrapper = mount(MediaCard, {
        props: { media: mockMovie },
      })

      expect(wrapper.text()).toContain('Inception')
    })

    it('renders year badge', () => {
      const wrapper = mount(MediaCard, {
        props: { media: mockMovie },
      })

      expect(wrapper.text()).toContain('2010')
    })

    it('renders rating when available', () => {
      const wrapper = mount(MediaCard, {
        props: { media: mockMovie },
      })

      expect(wrapper.text()).toContain('8.8')
    })

    it('renders genre pills when genres present', () => {
      const wrapper = mount(MediaCard, {
        props: { media: mockMovie },
      })

      expect(wrapper.text()).toContain('Action')
      expect(wrapper.text()).toContain('Thriller')
    })

    it('shows placeholder when poster_url is null', () => {
      const noPosterMovie: MediaItem = {
        ...mockMovie,
        poster_url: null,
      }

      const wrapper = mount(MediaCard, {
        props: { media: noPosterMovie },
      })

      expect(wrapper.find('.media-card__poster--placeholder').exists()).toBe(
        true
      )
    })
  })

  describe('navigation', () => {
    it('navigates to /player/:id when clicked', async () => {
      const wrapper = mount(MediaCard, {
        props: { media: mockMovie },
      })

      await wrapper.trigger('click')

      expect(pushSpy).toHaveBeenCalledWith('/player/1')
    })
  })
})