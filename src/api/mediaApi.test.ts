import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { MediaItem } from '../types/media'

// Create mock instance
const mockGet = vi.fn()

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: mockGet,
    })),
  },
}))

describe('mediaApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMedia', () => {
    it('calls GET /api/media with type param when type is provided', async () => {
      const mockData: MediaItem[] = [
        {
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
        },
      ]

      mockGet.mockResolvedValue({ data: { data: mockData } })

      const { getMedia } = await import('../api/mediaApi')
      const result = await getMedia('movie')

      expect(mockGet).toHaveBeenCalledWith('/api/media', {
        params: { type: 'movie' },
      })
      expect(result).toEqual(mockData)
    })

    it('calls GET /api/media without params when type is undefined', async () => {
      mockGet.mockResolvedValue({ data: { data: [] } })

      const { getMedia } = await import('../api/mediaApi')
      await getMedia()

      expect(mockGet).toHaveBeenCalledWith('/api/media', {
        params: {},
      })
    })

    it('calls GET /api/media with search param', async () => {
      mockGet.mockResolvedValue({ data: { data: [] } })

      const { getMedia } = await import('../api/mediaApi')
      await getMedia(undefined, 'inception')

      expect(mockGet).toHaveBeenCalledWith('/api/media', {
        params: { search: 'inception' },
      })
    })

    it('combines type and search params', async () => {
      mockGet.mockResolvedValue({ data: { data: [] } })

      const { getMedia } = await import('../api/mediaApi')
      await getMedia('movie', 'inception')

      expect(mockGet).toHaveBeenCalledWith('/api/media', {
        params: { type: 'movie', search: 'inception' },
      })
    })
  })

  describe('getMediaById', () => {
    it('calls GET /api/media/:id and returns item', async () => {
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
        overview: 'A thief who steals corporate secrets.',
        vote_average: 8.8,
        genres: 'Action,Thriller',
        poster_url: 'https://image.tmdb.org/inception.jpg',
        backdrop_url: null,
      }

      mockGet.mockResolvedValue({ data: { data: mockItem } })

      const { getMediaById } = await import('../api/mediaApi')
      const result = await getMediaById(1)

      expect(mockGet).toHaveBeenCalledWith('/api/media/1')
      expect(result).toEqual(mockItem)
    })

    it('throws error when media not found', async () => {
      mockGet.mockRejectedValue({
        response: { status: 404 },
        isAxiosError: true,
      })

      const { getMediaById } = await import('../api/mediaApi')
      await expect(getMediaById(999)).rejects.toThrow('Media not found')
    })
  })

  describe('getGenres', () => {
    it('extracts unique genres from media items', async () => {
      const mockItems: MediaItem[] = [
        {
          id: 1,
          title: 'Movie 1',
          type: 'movie',
          year: 2020,
          path: '/movies/m1.mp4',
          duration_seconds: null,
          codec: null,
          resolution: null,
          tmdb_id: null,
          overview: null,
          vote_average: null,
          genres: 'Action,Thriller',
          poster_url: null,
          backdrop_url: null,
        },
        {
          id: 2,
          title: 'Movie 2',
          type: 'movie',
          year: 2021,
          path: '/movies/m2.mp4',
          duration_seconds: null,
          codec: null,
          resolution: null,
          tmdb_id: null,
          overview: null,
          vote_average: null,
          genres: 'Drama,Action',
          poster_url: null,
          backdrop_url: null,
        },
      ]

      mockGet.mockResolvedValue({ data: { data: mockItems } })

      const { getGenres } = await import('../api/mediaApi')
      const genres = await getGenres()

      // Should have 3 unique genres: Action, Drama, Thriller (sorted alphabetically)
      expect(genres).toHaveLength(3)
      expect(genres[0].name).toBe('Action')
      expect(genres[1].name).toBe('Drama')
      expect(genres[2].name).toBe('Thriller')
    })

    it('returns empty array when no media items have genres', async () => {
      const mockItems: MediaItem[] = [
        {
          id: 1,
          title: 'Movie 1',
          type: 'movie',
          year: 2020,
          path: '/movies/m1.mp4',
          duration_seconds: null,
          codec: null,
          resolution: null,
          tmdb_id: null,
          overview: null,
          vote_average: null,
          genres: null,
          poster_url: null,
          backdrop_url: null,
        },
      ]

      mockGet.mockResolvedValue({ data: { data: mockItems } })

      const { getGenres } = await import('../api/mediaApi')
      const genres = await getGenres()

      expect(genres).toHaveLength(0)
    })
  })
})