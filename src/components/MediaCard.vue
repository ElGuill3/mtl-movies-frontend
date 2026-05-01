<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { MediaItem } from '../types/media'

const props = defineProps<{
  media: MediaItem
}>()

const router = useRouter()

const handleClick = () => {
  router.push(`/player/${props.media.id}`)
}

const getGenreList = (genres: string | null): string[] => {
  if (!genres) return []
  return genres.split(',').map((g) => g.trim()).slice(0, 2)
}

const formatRating = (rating: number | null): string => {
  return rating ? rating.toFixed(1) : '—'
}
</script>

<template>
  <div class="media-card" @click="handleClick">
    <div class="media-card__poster">
      <img
        v-if="media.poster_url"
        :src="media.poster_url"
        :alt="media.title"
        class="media-card__poster-img"
      />
      <div v-else class="media-card__poster--placeholder">
        <span class="media-card__placeholder-icon">🎬</span>
      </div>
    </div>
    <div class="media-card__info">
      <h3 class="media-card__title">{{ media.title }}</h3>
      <div class="media-card__meta">
        <span v-if="media.year" class="media-card__year">{{ media.year }}</span>
        <span v-if="media.vote_average" class="media-card__rating">
          ⭐ {{ formatRating(media.vote_average) }}
        </span>
      </div>
      <div v-if="getGenreList(media.genres).length > 0" class="media-card__genres">
        <span
          v-for="genre in getGenreList(media.genres)"
          :key="genre"
          class="media-card__genre-pill"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-card {
  width: 180px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a2e;
  transition: transform 0.2s ease;
}

.media-card:hover {
  transform: scale(1.05);
}

.media-card__poster {
  width: 180px;
  height: 270px;
  background: #16213e;
  position: relative;
}

.media-card__poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-card__poster--placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #16213e;
}

.media-card__placeholder-icon {
  font-size: 48px;
}

.media-card__info {
  padding: 8px;
}

.media-card__title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.media-card__meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: #a0a0a0;
  margin-bottom: 4px;
}

.media-card__year {
  color: #a0a0a0;
}

.media-card__rating {
  color: #fbbf24;
}

.media-card__genres {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.media-card__genre-pill {
  font-size: 10px;
  padding: 2px 6px;
  background: #3a3a5c;
  color: #c0c0c0;
  border-radius: 4px;
}
</style>