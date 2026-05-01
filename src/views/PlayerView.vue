<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getMediaById } from '../api/mediaApi'
import VideoPlayer from '../components/VideoPlayer.vue'
import type { MediaItem } from '../types/media'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const mediaItem = ref<MediaItem | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const rawUrl = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:8080'
const BASE_URL = rawUrl.startsWith('http') ? rawUrl : `http://${rawUrl}`

const streamUrl = computed(() => {
  if (!mediaItem.value) return ''
  // Build streaming URL - backend serves media at /media/{path}
  const normalizedPath = mediaItem.value.path.replace(/^\/+/, '')
  return `${BASE_URL}/media/${normalizedPath}`
})

onMounted(async () => {
  try {
    mediaItem.value = await getMediaById(parseInt(props.id, 10))
    loading.value = false
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load media'
    loading.value = false
  }
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="player-view">
    <button class="player-view__back" @click="goBack">
      ← Back
    </button>

    <div v-if="loading" class="player-view__loading">
      Loading...
    </div>

    <div v-else-if="error" class="player-view__error">
      {{ error }}
    </div>

    <template v-else-if="mediaItem">
      <h1 class="player-view__title">{{ mediaItem.title }}</h1>

      <div class="player-view__player">
        <VideoPlayer :src="streamUrl" />
      </div>

      <div class="player-view__info">
        <p v-if="mediaItem.overview">{{ mediaItem.overview }}</p>
        <div class="player-view__meta">
          <span v-if="mediaItem.year">{{ mediaItem.year }}</span>
          <span v-if="mediaItem.genres">{{ mediaItem.genres }}</span>
          <span v-if="mediaItem.vote_average">⭐ {{ mediaItem.vote_average }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.player-view {
  padding: 24px;
  min-height: 100vh;
  background: #000;
  color: #fff;
}

.player-view__back {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 16px;
}

.player-view__back:hover {
  background: rgba(255, 255, 255, 0.2);
}

.player-view__loading,
.player-view__error {
  padding: 40px;
  text-align: center;
  color: #a0a0a0;
}

.player-view__error {
  color: #ff6b6b;
}

.player-view__title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.player-view__player {
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 16 / 9;
  margin: 0 auto 24px;
}

.player-view__info {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.player-view__info p {
  color: #a0a0a0;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.player-view__meta {
  display: flex;
  gap: 16px;
  color: #a0a0a0;
  font-size: 14px;
}
</style>