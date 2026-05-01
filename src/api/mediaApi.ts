import type { MediaItem, Genre, MediaApiParams } from '../types/media'

const rawUrl = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:8080'
const BASE_URL = rawUrl.startsWith('http') ? rawUrl : `http://${rawUrl}`

async function request<T>(path: string, params?: Record<string, string>): Promise<T> {
  const fullUrl = `${BASE_URL}${path}`
  const url = new URL(fullUrl)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v))
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

export async function getMedia(
  type?: MediaApiParams['type'],
  search?: string
): Promise<MediaItem[]> {
  const params: Record<string, string> = {}
  if (type) params.type = type
  if (search) params.search = search

  const data = await request<{ data: MediaItem[] }>('/api/media', params)
  return data.data
}

export async function getMediaById(id: number): Promise<MediaItem> {
  try {
    const data = await request<{ data: MediaItem }>(`/api/media/${id}`)
    return data.data
  } catch (err) {
    if (err instanceof TypeError && (err as unknown as { message: string }).message.includes('404')) {
      throw new Error('Media not found')
    }
    throw err
  }
}

export async function getGenres(): Promise<Genre[]> {
  const items = await getMedia()

  const genreSet = new Set<string>()
  for (const item of items) {
    if (item.genres) {
      const names = item.genres.split(',').map((g) => g.trim())
      names.forEach((name) => genreSet.add(name))
    }
  }

  return Array.from(genreSet)
    .sort()
    .map((name, index) => ({ id: index + 1, name }))
}