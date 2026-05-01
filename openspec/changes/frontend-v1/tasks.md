# Tasks: frontend-v1

## Phase 1: Foundation

- [ ] 1.1 Create `src/types/media.ts` — TypeScript interfaces MediaItem, Genre, ApiResponse
- [ ] 1.2 Create `src/api/mediaApi.ts` — axios instance + getMedia(type?), getMediaById(id), getGenres()
- [ ] 1.3 Create `src/composables/useDebounce.ts` — generic debounce utility with tests
- [ ] 1.4 Install video.js and @types/video.js if not already present

## Phase 2: Core Components (TDD)

### MediaCard
- [ ] 2.1 RED: Write `MediaCard.test.ts` — renders poster, title, year, rating; click navigates to /player/:id
- [ ] 2.2 GREEN: Create `src/components/MediaCard.vue` — poster image, title, year, rating badge, genre pills
- [ ] 2.3 REFACTOR: Add placeholder logic when poster_url is null

### SkeletonCard
- [ ] 2.4 Create `src/components/SkeletonCard.vue` — animated loading placeholder matching MediaCard dimensions

### MediaRow
- [ ] 2.5 Create `src/components/MediaRow.vue` — section header "View All" link + horizontal scroll of MediaCards

### SearchBar
- [ ] 2.6 RED: Write `SearchBar.test.ts` — emits search on input after 300ms debounce
- [ ] 2.7 GREEN: Create `src/components/SearchBar.vue` — input with debounce using useDebounce
- [ ] 2.8 REFACTOR: Add clear button when input has value

### GenreFilter
- [ ] 2.9 RED: Write `GenreFilter.test.ts` — emits genre-id on selection
- [ ] 2.10 GREEN: Create `src/components/GenreFilter.vue` — dropdown with genre list prop
- [ ] 2.11 REFACTOR: Add "All Genres" option at top

### VideoPlayer
- [ ] 2.12 RED: Write `VideoPlayer.test.ts` — renders Video.js instance; play/pause events
- [ ] 2.13 GREEN: Create `src/components/VideoPlayer.vue` — Video.js wrapper with controls
- [ ] 2.14 REFACTOR: Add keyboard shortcuts (Space, arrows, F, M)

## Phase 3: Composables

- [ ] 3.1 RED: Write `useMediaApi.test.ts` — fetches media, loading state, error handling
- [ ] 3.2 GREEN: Create `src/composables/useMediaApi.ts` — fetches movies/series/anime by type with loading/error state
- [ ] 3.3 GREEN: Create `src/composables/usePlayer.ts` — playing, currentTime, duration, volume, muted state

## Phase 4: Views

- [ ] 4.1 RED: Write `HomeView.test.ts` — renders 3 MediaRows; each loads correct type
- [ ] 4.2 GREEN: Create `src/views/HomeView.vue` — 3 MediaRows (movies, series, anime)
- [ ] 4.3 RED: Write `SectionView.test.ts` — receives type param; renders grid filtered by type
- [ ] 4.4 GREEN: Create `src/views/SectionView.vue` — full grid with back button; SearchBar + GenreFilter wired
- [ ] 4.5 RED: Write `PlayerView.test.ts` — loads media by id; renders VideoPlayer
- [ ] 4.6 GREEN: Create `src/views/PlayerView.vue` — full-screen player with back button; keyboard nav

## Phase 5: Router & Wiring

- [ ] 5.1 Create `src/router/index.ts` — define routes: `/` → HomeView, `/section/:type` → SectionView, `/player/:id` → PlayerView
- [ ] 5.2 Modify `src/main.ts` — register Router, Pinia
- [ ] 5.3 Modify `src/App.vue` — RouterView + SearchBar header + GenreFilter

## Phase 6: Configuration

- [ ] 6.1 Modify `vite.config.ts` — add proxy: `/api` → `http://localhost:8080`, `/media` → `http://localhost:8080`
- [ ] 6.2 Modify `src-tauri/tauri.conf.json` — window min 1024x768, add fullscreen toggle command

## Phase 7: Verification

- [ ] 7.1 Run `npm run check` — ensure 0 errors
- [ ] 7.2 Run `npm run test:run` — all tests pass
- [ ] 7.3 Verify all 20 spec scenarios covered by tests
- [ ] 7.4 Build Tauri app: `npm run tauri build` — .exe runs standalone