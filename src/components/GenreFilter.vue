<script setup lang="ts">
import type { Genre } from '../types/media'

defineProps<{
  genres: Genre[]
  modelValue: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'genre-id': [value: string]
}>()

const onChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  const resolved = value === '' ? null : value
  emit('update:modelValue', resolved)
  if (value) {
    emit('genre-id', value)
  }
}
</script>

<template>
  <div class="genre-filter">
    <select
      class="genre-filter__select"
      :value="modelValue ?? ''"
      @change="onChange"
    >
      <option value="">All Genres</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.name">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.genre-filter {
  display: inline-block;
}

.genre-filter__select {
  background: #1a1a2e;
  border: 1px solid #3a3a5c;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  min-width: 150px;
}

.genre-filter__select:focus {
  border-color: #5a5a8c;
}

.genre-filter__select option {
  background: #1a1a2e;
  color: #fff;
}
</style>