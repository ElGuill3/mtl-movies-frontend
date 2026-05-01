# Proposal: frontend-v1

## Intent

Build a Tauri desktop app (Vue 3 + TypeScript) for browsing and playing the media catalog served by mtl-movies-backend. Users can view movies/series/anime in separate sections, play videos via streaming, and search/filter by genre.

## Scope

### In Scope
- Home view with 3 sections: Movies, Series, Anime
- Media card grid with poster, title, year, rating
- Full-screen video player with streaming playback (HTTP Range support)
- Search bar (case-insensitive partial title matching)
- Genre filter dropdown (filters by TMDb genre IDs)
- Tauri window management (resizable, native title bar)

### Out of Scope
- Authentication / user accounts
- Favorites, watch history, playlists
- Admin panel (backend scan management)
- Mobile / responsive layout
- Settings screen

## Capabilities

### New Capabilities
- `media-catalog-view`: Display media items in grid/list with poster, title, year, rating, genre tags
- `media-player`: Full-screen video playback via streaming URL with basic controls (play/pause, seek, volume)
- `media-search`: Search by title with genre filter
- `app-navigation`: Section-based navigation (Home → Movies/Series/Anime → Player)

### Modified Capabilities
- None (frontend only, backend specs unchanged)

## Approach

```
src/
├── views/
│   ├── HomeView.vue         # 3-section home (Movies/Series/Anime)
│   ├── SectionView.vue      # Reusable section grid
│   └── PlayerView.vue       # Full-screen video player
├── components/
│   ├── MediaCard.vue        # Poster + info card
│   ├── SearchBar.vue        # Search input
│   ├── GenreFilter.vue      # Genre dropdown
│   └── VideoPlayer.vue      # Video.js wrapper
├── composables/
│   ├── useMediaApi.ts       # Axios calls to :8080/api/media
│   └── usePlayer.ts         # Player state management
└── router/
    └── index.ts             # Vue Router (Home, Section, Player)
```

- Vue Router for navigation between sections and player
- Axios for backend calls (GET /api/media, GET /api/media?type=X)
- Video.js for playback with range request support
- Tauri handles window chrome and native controls

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/views/` | New | Home, Section, Player views |
| `src/components/` | New | MediaCard, SearchBar, GenreFilter, VideoPlayer |
| `src/composables/` | New | API calls and player state |
| `src/router/` | New | Vue Router configuration |
| `src-tauri/` | Modified | Window config (fullscreen toggle, min size) |
| `vite.config.ts` | Modified | Dev proxy to backend :8080 |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| CORS / dev proxy config | Medium | Use Vite proxy in dev, Tauri IPC in prod |
| Video.js range request compatibility | Medium | Test with backend streaming endpoints early |
| Tauri window state management | Low | Use @tauri-apps/api window module |

## Rollback Plan

1. Delete `src/views/`, `src/components/`, `src/composables/`, `src/router/`
2. Reset `vite.config.ts` proxy
3. Restore `src-tauri/tauri.conf.json` window defaults
4. Revert to `App.vue` with static placeholder content

## Dependencies

- mtl-movies-backend running on `:8080` (for dev)
- Backend API: GET /api/media, GET /api/media/{id}, GET /media/{path}

## Success Criteria

- [ ] Home view displays Movies, Series, Anime sections with media cards
- [ ] Clicking a media card opens Player view with working video stream
- [ ] Search filters media by title (case-insensitive)
- [ ] Genre filter works (TMDb genre IDs from backend)
- [ ] App builds to .exe and runs standalone on Windows
- [ ] `npm run check` passes with 0 errors
- [ ] `npm run test:run` passes with unit tests for composables