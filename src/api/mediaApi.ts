import axios from 'axios'
import type { MediaItem, Genre, MediaApiParams } from '../types/media'

// Axios instance configured with base URL for backend
export const mediaApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
})

export async function getMedia(
  type?: MediaApiParams['type'],
  search?: string
): Promise<MediaItem[]> {
  const params: Record<string, string> = {}
  if (type) params.type = type
  if (search) params.search = search

  const response = await mediaApi.get<{ data: MediaItem[] }>('/api/media', { params })
  return response.data.data
}

export async function getMediaById(id: number): Promise<MediaItem> {
  try {
    const response = await mediaApi.get<{ data: MediaItem }>(`/api/media/${id}`)
    return response.data.data
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      (error as { response: { status: number } }).response?.status === 404
    ) {
      throw new Error('Media not found')
    }
    throw error
  }
}

export async function getGenres(): Promise<Genre[]> {
  // Fetch all media and extract unique genres from genres field
  const items = await getMedia()

  const genreSet = new Set<string>()
  for (const item of items) {
    if (item.genres) {
      const names = item.genres.split(',').map((g) => g.trim())
      names.forEach((name) => genreSet.add(name))
    }
  }

  // Map to Genre[] with numeric ids derived from sorted names
  return Array.from(genreSet)
    .sort()
    .map((name, index) => ({ id: index + 1, name }))
}