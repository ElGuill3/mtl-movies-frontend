<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaApi } from '../composables/useMediaApi'
import MediaCard from '../components/MediaCard.vue'
import SearchBar from '../components/SearchBar.vue'
import GenreFilter from '../components/GenreFilter.vue'
import type { Genre } from '../types/media'

const props = defineProps<{
  type: 'movie' | 'series' | 'anime'
}>()

const router = useRouter()

const { items, loading, error, fetchMedia } = useMediaApi()

const searchQuery = ref('')
const selectedGenre = ref<string | null>(null)

// Map type prop to display name
const typeDisplayName = computed(() => {
  switch (props.type) {
    case 'movie': return 'Movies'
    case 'series': return 'Series'
    case 'anime': return 'Anime'
    default: return props.type
  }
})

// Mock genres for now (would come from API in real app)
const genres = ref<Genre[]>([
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
  { id: 3, name: 'Sci-Fi' },
  { id: 4, name: 'Thriller' },
])

const loadMedia = () => {
  fetchMedia(props.type, searchQuery.value || undefined)
}

onMounted(() => {
  loadMedia()
})

const onSearch = (query: string) => {
  searchQuery.value = query
  loadMedia()
}

const onGenreChange = (genreName: string | null) => {
  selectedGenre.value = genreName
  loadMedia()
}

const goBack = () => {
  router.push('/')
}

// Filter items by selected genre if needed
const filteredItems = computed(() => {
  const allItems = items.value ?? []
  if (!selectedGenre.value) return allItems

  return allItems.filter((item) => {
    if (!item.genres) return false
    return item.genres.toLowerCase().includes(selectedGenre.value!.toLowerCase())
  })
})
</script>

<template>
  <div class="section-view">
    <div class="section-view__header">
      <button class="section-view__back" @click="goBack">
        ← Back
      </button>
      <h1 class="section-view__title">{{ typeDisplayName }}</h1>
    </div>

    <div class="section-view__filters">
      <SearchBar
        :model-value="searchQuery"
        @search="onSearch"
        @update:model-value="searchQuery = $event as string"
      />
      <GenreFilter
        :genres="genres"
        :model-value="selectedGenre"
        @genre-id="onGenreChange"
        @update:model-value="selectedGenre = $event"
      />
    </div>

    <div v-if="loading" class="section-view__loading">
      Loading...
    </div>

    <div v-else-if="error" class="section-view__error">
      {{ error }}
    </div>

    <div v-else-if="filteredItems.length === 0" class="section-view__empty">
      No results found for "{{ searchQuery }}".
    </div>

    <div v-else class="section-view__grid">
      <MediaCard
        v-for="item in filteredItems"
        :key="item.id"
        :media="item"
      />
    </div>
  </div>
</template>

<style scoped>
.section-view {
  padding: 24px;
  min-height: 100vh;
  background: #0f0f1a;
}

.section-view__header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.section-view__back {
  background: #1a1a2e;
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.section-view__back:hover {
  background: #2a2a4e;
}

.section-view__title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.section-view__filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.section-view__loading,
.section-view__error,
.section-view__empty {
  padding: 40px;
  text-align: center;
  color: #a0a0a0;
  font-size: 16px;
}

.section-view__error {
  background: #2a1a1a;
  color: #ff6b6b;
  border-radius: 8px;
}

.section-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}
</style>