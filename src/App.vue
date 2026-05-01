<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from './components/SearchBar.vue'
import GenreFilter from './components/GenreFilter.vue'
import type { Genre } from './types/media'

const router = useRouter()

// Mock genres - would come from API in real app
const genres = ref<Genre[]>([
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
  { id: 3, name: 'Sci-Fi' },
  { id: 4, name: 'Thriller' },
])

const onSearch = (query: string) => {
  // Navigate to home with search query - views handle the filtering
  console.log('Search:', query)
}

const onGenreChange = (genreName: string | null) => {
  console.log('Genre:', genreName)
}
</script>

<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-header__logo" @click="router.push('/')">MTL Movies</h1>
      <div class="app-header__search">
        <SearchBar
          model-value=""
          @search="onSearch"
          @update:model-value="onSearch"
        />
      </div>
      <div class="app-header__filter">
        <GenreFilter
          :genres="genres"
          model-value=""
          @genre-id="onGenreChange"
          @update:model-value="onGenreChange"
        />
      </div>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background: #0f0f1a;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#app {
  min-height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  background: #1a1a2e;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.app-header__logo {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: color 0.2s;
}

.app-header__logo:hover {
  color: #8b5cf6;
}

.app-header__search {
  flex: 1;
  display: flex;
  justify-content: center;
}

.app-header__filter {
  display: flex;
  align-items: center;
}

.app-main {
  min-height: calc(100vh - 72px);
}
</style>