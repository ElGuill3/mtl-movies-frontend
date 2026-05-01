<script setup lang="ts">
import { useRouter } from 'vue-router'
import MediaCard from './MediaCard.vue'
import SkeletonCard from './SkeletonCard.vue'
import type { MediaItem } from '../types/media'

defineProps<{
  title: string
  type: 'movie' | 'series' | 'anime'
  items: MediaItem[]
  loading?: boolean
}>()

const router = useRouter()

const viewAll = (type: string) => {
  router.push(`/section/${type}`)
}
</script>

<template>
  <div class="media-row">
    <div class="media-row__header">
      <h2 class="media-row__title">{{ title }}</h2>
      <button class="media-row__view-all" @click="viewAll(type)">
        View All →
      </button>
    </div>
    <div class="media-row__scroll">
      <template v-if="loading">
        <SkeletonCard v-for="i in 4" :key="i" />
      </template>
      <template v-else-if="items.length === 0">
        <div class="media-row__empty">
          No {{ type }} found. Run a scan from the backend.
        </div>
      </template>
      <template v-else>
        <MediaCard
          v-for="item in items"
          :key="item.id"
          :media="item"
          class="media-row__card"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.media-row {
  margin-bottom: 32px;
}

.media-row__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.media-row__title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.media-row__view-all {
  background: none;
  border: none;
  color: #a0a0a0;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.2s;
}

.media-row__view-all:hover {
  background: #2a2a4e;
  color: #fff;
}

.media-row__scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: #3a3a5c #1a1a2e;
}

.media-row__scroll::-webkit-scrollbar {
  height: 8px;
}

.media-row__scroll::-webkit-scrollbar-track {
  background: #1a1a2e;
}

.media-row__scroll::-webkit-scrollbar-thumb {
  background: #3a3a5c;
  border-radius: 4px;
}

.media-row__card {
  flex-shrink: 0;
}

.media-row__empty {
  width: 100%;
  padding: 40px;
  text-align: center;
  color: #a0a0a0;
  font-size: 16px;
  background: #1a1a2e;
  border-radius: 8px;
}
</style>