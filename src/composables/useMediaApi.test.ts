import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMediaApi } from './useMediaApi'
import type { MediaItem } from '../types/media'

// Mock the API module
vi.mock('../api/mediaApi', () => ({
  getMedia: vi.fn(),
}))

import { getMedia } from '../api/mediaApi'
const mockedGetMedia = vi.mocked(getMedia)

describe('useMediaApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('state', () => {
    it('returns loading state as ref', () => {
      mockedGetMedia.mockResolvedValue([])

      const { loading } = useMediaApi()
      expect(loading.value).toBe(false)
    })

    it('returns error state as ref', () => {
      mockedGetMedia.mockResolvedValue([])

      const { error } = useMediaApi()
      expect(error.value).toBe(null)
    })

    it('returns items state as ref', () => {
      mockedGetMedia.mockResolvedValue([])

      const { items } = useMediaApi()
      expect(items.value).toEqual([])
    })
  })

  describe('fetchMedia', () => {
    it('sets loading to true while fetching', async () => {
      mockedGetMedia.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
      )

      const { fetchMedia, loading } = useMediaApi()

      const promise = fetchMedia()
      expect(loading.value).toBe(true)

      await promise
      expect(loading.value).toBe(false)
    })

    it('sets items when fetch succeeds', async () => {
      const mockItems: MediaItem[] = [
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

      mockedGetMedia.mockResolvedValue(mockItems)

      const { fetchMedia, items } = useMediaApi()
      await fetchMedia()

      expect(items.value).toEqual(mockItems)
    })

    it('sets error when fetch fails', async () => {
      mockedGetMedia.mockRejectedValue(new Error('Network error'))

      const { fetchMedia, error } = useMediaApi()
      await fetchMedia()

      expect(error.value).toBe('Network error')
    })

    it('clears error on new fetch', async () => {
      mockedGetMedia.mockRejectedValueOnce(new Error('First error'))
        .mockResolvedValueOnce([])

      const { fetchMedia, error } = useMediaApi()

      await fetchMedia()
      expect(error.value).toBe('First error')

      await fetchMedia()
      expect(error.value).toBe(null)
    })

    it('passes type parameter to getMedia', async () => {
      mockedGetMedia.mockResolvedValue([])

      const { fetchMedia } = useMediaApi()
      await fetchMedia('movie')

      expect(mockedGetMedia).toHaveBeenCalledWith('movie', undefined)
    })

    it('passes search parameter to getMedia', async () => {
      mockedGetMedia.mockResolvedValue([])

      const { fetchMedia } = useMediaApi()
      await fetchMedia(undefined, 'inception')

      expect(mockedGetMedia).toHaveBeenCalledWith(undefined, 'inception')
    })

    it('passes both type and search to getMedia', async () => {
      mockedGetMedia.mockResolvedValue([])

      const { fetchMedia } = useMediaApi()
      await fetchMedia('movie', 'inception')

      expect(mockedGetMedia).toHaveBeenCalledWith('movie', 'inception')
    })
  })

  describe('fetchAll', () => {
    it('fetches all three media types', async () => {
      const mockMovies: MediaItem[] = [
        { id: 1, title: 'Movie 1', type: 'movie', year: 2020, path: '/m1.mp4', duration_seconds: null, codec: null, resolution: null, tmdb_id: null, overview: null, vote_average: null, genres: null, poster_url: null, backdrop_url: null },
      ]
      const mockSeries: MediaItem[] = [
        { id: 2, title: 'Series 1', type: 'series', year: 2021, path: '/s1.mp4', duration_seconds: null, codec: null, resolution: null, tmdb_id: null, overview: null, vote_average: null, genres: null, poster_url: null, backdrop_url: null },
      ]
      const mockAnime: MediaItem[] = [
        { id: 3, title: 'Anime 1', type: 'anime', year: 2022, path: '/a1.mp4', duration_seconds: null, codec: null, resolution: null, tmdb_id: null, overview: null, vote_average: null, genres: null, poster_url: null, backdrop_url: null },
      ]

      mockedGetMedia
        .mockResolvedValueOnce(mockMovies)
        .mockResolvedValueOnce(mockSeries)
        .mockResolvedValueOnce(mockAnime)

      const { fetchAll, movies, series, anime } = useMediaApi()
      await fetchAll()

      expect(movies.value).toEqual(mockMovies)
      expect(series.value).toEqual(mockSeries)
      expect(anime.value).toEqual(mockAnime)
    })
  })
})