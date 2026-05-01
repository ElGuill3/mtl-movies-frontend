<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounce } from '../composables/useDebounce'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = newVal
  }
)

const debouncedEmit = useDebounce((value: string) => {
  emit('search', value)
}, 300)

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  localValue.value = value
  emit('update:modelValue', value)
  debouncedEmit(value)
}

const clearInput = () => {
  localValue.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="search-bar">
    <span class="search-bar__icon">🔍</span>
    <input
      type="text"
      class="search-bar__input"
      :value="localValue"
      placeholder="Search movies, series, anime..."
      @input="onInput"
    />
    <button
      v-if="localValue"
      class="search-bar__clear"
      @click="clearInput"
      type="button"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background: #1a1a2e;
  border-radius: 8px;
  padding: 8px 16px;
  gap: 8px;
  width: 100%;
  max-width: 400px;
}

.search-bar__icon {
  font-size: 16px;
  color: #a0a0a0;
}

.search-bar__input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 14px;
  outline: none;
}

.search-bar__input::placeholder {
  color: #a0a0a0;
}

.search-bar__clear {
  background: #3a3a5c;
  border: none;
  color: #a0a0a0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background 0.2s;
}

.search-bar__clear:hover {
  background: #4a4a6e;
  color: #fff;
}
</style>