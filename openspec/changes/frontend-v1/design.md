# Design: frontend-v1

## Technical Approach

Build a Tauri desktop app with Vue 3 + TypeScript as SPA. Use Vue Router for navigation between Home/Section/Player views. Axios calls to backend (:8080) via Vite proxy in dev. Video.js wraps the `<video>` element for streaming playback with Range request support.

## Architecture Decisions

### Decision: Vue Router over manual state-based navigation

**Choice**: Vue Router with `createWebHashHistory()` (hash routing for Tauri file:// compatibility)
**Alternatives considered**: Manual show/hide with reactive state, Pinia store for navigation
**Rationale**: Cleaner URL-driven state, easier to extend with deep links later, standard Vue pattern

### Decision: Composables for API and player state

**Choice**: `useMediaApi()` and `usePlayer()` composables instead of Pinia store
**Alternatives considered**: Pinia store, Vuex
**Rationale**: Simpler for this scope — no cross-component shared state beyond current section. Composable can be tested in isolation with Vitest.

### Decision: Video.js over native `<video>`

**Choice**: Video.js 8.x with `vjs-big-play-centered` skin
**Alternatives considered**: Native `<video>` with custom controls overlay
**Rationale**: Built-in Range request support, consistent cross-browser controls, keyboard accessibility, quality selector support ready for future.

### Decision: Vite proxy for dev, direct HTTP for production

**Choice**: Vite devServer proxy `/api` → `http://localhost:8080`; production uses Tauri HTTP plugin
**Alternatives considered**: Tauri IPC for all calls (overkill for REST API)
**Rationale**: Simpler dev workflow — same axios calls work in both envs with just base URL change.

## Data Flow

```
User Action
    │
    ▼
┌─────────────────────────────────────┐
│  Vue Component                      │
│  (MediaCard, SectionView, Player)   │
└──────────────┬──────────────────────┘
               │ calls
               ▼
┌─────────────────────────────────────┐
│  useMediaApi composable             │
│  → axios.get('/api/media')          │
└──────────────┬──────────────────────┘
               │ HTTP (dev: proxy, prod: Tauri HTTP)
               ▼
┌─────────────────────────────────────┐
│  mtl-movies-backend (:8080)         │
│  → /api/media, /api/media/{id}      │
│  → /media/{path} (streaming)        │
└─────────────────────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/router/index.ts` | Create | Vue Router config with routes `/`, `/section/:type`, `/player/:id` |
| `src/types/media.ts` | Create | TypeScript interfaces: `MediaItem`, `Genre` |
| `src/api/mediaApi.ts` | Create | Axios instance + helper functions |
| `src/composables/useMediaApi.ts` | Create | Reactive media fetching with loading/error state |
| `src/composables/usePlayer.ts` | Create | Player state (playing, currentTime, duration, volume) |
| `src/composables/useDebounce.ts` | Create | Generic debounce utility for search |
| `src/views/HomeView.vue` | Create | 3-section layout (Movies/Series/Anime) |
| `src/views/SectionView.vue` | Create | Full grid filtered by type |
| `src/views/PlayerView.vue` | Create | Video.js player full-screen |
| `src/components/MediaCard.vue` | Create | Poster + info card with hover state |
| `src/components/MediaRow.vue` | Create | Horizontal scrollable row with section header |
| `src/components/SearchBar.vue` | Create | Search input with debounce |
| `src/components/GenreFilter.vue` | Create | Genre dropdown select |
| `src/components/SkeletonCard.vue` | Create | Loading placeholder |
| `src/components/VideoPlayer.vue` | Create | Video.js wrapper component |
| `src/App.vue` | Modify | RouterView + SearchBar header layout |
| `src/main.ts` | Modify | Add `createRouter`, `createWebHashHistory`, `createPinia` |
| `vite.config.ts` | Modify | Add proxy for `/api` → `http://localhost:8080` |
| `src-tauri/tauri.conf.json` | Modify | Window: min 1024x768, decorations, fullscreen toggle |

## TypeScript Interfaces

```typescript
// src/types/media.ts
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
  genres: string | null  // comma-separated from backend
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
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `useDebounce` logic | Vitest with fake timers |
| Unit | `useMediaApi` fetch/receive logic | Vitest with mock axios |
| Unit | `usePlayer` state transitions | Vitest with video element mock |
| Unit | `MediaCard` rendering | `@vue/test-utils` shallow mount |
| Integration | Router navigation flow | Vue Test Utils with `router-link` |

## Migration / Rollout

No migration required — this is a greenfield frontend. Existing backend is unchanged.

## Open Questions

None — all decisions made in proposal/spec phases.