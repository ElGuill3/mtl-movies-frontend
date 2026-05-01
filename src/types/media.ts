// Media types from backend API
export interface MediaItem {
  id: number
  title: string
  type: 'movie' | 'series' | 'anime'
  year: number | null
  path: string
  duration_seconds: number | null
  codec: string | null
  resolution: string | null
  tmdb_id: number | null
  overview: string | null
  vote_average: number | null
  genres: string | null // comma-separated from backend
  poster_url: string | null
  backdrop_url: string | null
}

export interface Genre {
  id: number
  name: string
}

export interface ApiResponse<T> {
  data: T
}

export interface MediaApiParams {
  type?: 'movie' | 'series' | 'anime'
  search?: string
}