<script setup lang="ts">
import { onMounted } from 'vue'
import { useMediaApi } from '../composables/useMediaApi'
import MediaRow from '../components/MediaRow.vue'
import type { MediaItem } from '../types/media'

const { movies, series, anime, loading, error, fetchAll } = useMediaApi()

onMounted(() => {
  fetchAll()
})

// Helper to get value or empty array
const getItems = (items: MediaItem[] | undefined): MediaItem[] => items ?? []
</script>

<template>
  <div class="home-view">
    <h1 class="home-view__title">MTL Movies</h1>

    <div v-if="error" class="home-view__error">
      {{ error }}
    </div>

    <div v-else class="home-view__sections">
      <MediaRow
        title="Movies"
        type="movie"
        :items="getItems(movies)"
        :loading="loading"
      />
      <MediaRow
        title="Series"
        type="series"
        :items="getItems(series)"
        :loading="loading"
      />
      <MediaRow
        title="Anime"
        type="anime"
        :items="getItems(anime)"
        :loading="loading"
      />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding: 24px;
  min-height: 100vh;
  background: #0f0f1a;
}

.home-view__title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 32px 0;
}

.home-view__error {
  background: #2a1a1a;
  color: #ff6b6b;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.home-view__sections {
  display: flex;
  flex-direction: column;
}
</style>