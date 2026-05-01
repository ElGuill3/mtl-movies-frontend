import { ref } from 'vue'
import { getMedia } from '../api/mediaApi'
import type { MediaItem } from '../types/media'

export interface UseMediaApiReturn {
  items: ReturnType<typeof ref<MediaItem[]>>
  loading: ReturnType<typeof ref<boolean>>
  error: ReturnType<typeof ref<string | null>>
  fetchMedia: (type?: 'movie' | 'series' | 'anime', search?: string) => Promise<void>
  fetchAll: () => Promise<void>
  movies: ReturnType<typeof ref<MediaItem[]>>
  series: ReturnType<typeof ref<MediaItem[]>>
  anime: ReturnType<typeof ref<MediaItem[]>>
}

export function useMediaApi(): UseMediaApiReturn {
  const items = ref<MediaItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const movies = ref<MediaItem[]>([])
  const series = ref<MediaItem[]>([])
  const anime = ref<MediaItem[]>([])

  const fetchMedia = async (
    type?: 'movie' | 'series' | 'anime',
    search?: string
  ): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const result = await getMedia(type, search)
      items.value = result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      items.value = []
    } finally {
      loading.value = false
    }
  }

  const fetchAll = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const [movieItems, seriesItems, animeItems] = await Promise.all([
        getMedia('movie'),
        getMedia('series'),
        getMedia('anime'),
      ])

      movies.value = movieItems
      series.value = seriesItems
      anime.value = animeItems
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    fetchMedia,
    fetchAll,
    movies,
    series,
    anime,
  }
}