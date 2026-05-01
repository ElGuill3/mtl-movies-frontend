# MTL Movies — Frontend

Desktop application to browse and play media catalogs (Movies, Series, Anime) from `mtl-movies-backend`.

Built with **Tauri 2.x** + **Vue 3** + **TypeScript** + **Video.js**.

## Features

- Catalog browsing by section: Movies, Series, Anime
- Video playback with Video.js
- Search by title and filter by genre
- Responsive layout with skeleton loading states

## Prerequisites

### For Development

- **Node.js** 20+
- **Rust** 1.70+
- **Visual Studio Build Tools** (Windows only)
- **Tauri CLI**: `cargo install tauri-cli` or `npm install -g @tauri-apps/cli`

### Tauri System Dependencies

#### Windows

Install via PowerShell (Admin):
```powershell
# Visual Studio Build Tools 2022 (mandatory for Rust compilation)
# Download from: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
# Select: "Desktop development with C++" workload

# WebView2 Runtime (usually pre-installed on Windows 10/11)
# Download from: https://developer.microsoft.com/en-us/microsoft-edge/webview2/
```

#### macOS

```bash
brew install rust yarn
# Then follow: https://tauri.app/start/
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt install libssl-dev pkg-config libdbus-1-dev libwebkit2gtk-4.1-dev libgtk-3-dev
```

#### Linux (Fedora)

```bash
sudo dnf install openssl-devel pkgconf-pkg-config dbus-devel glib2-devel cairo-devel gtk3-devel webkit2gtk4.1-devel
```

## Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run tauri:dev

# Run tests
npm run test:run

# Type check
npm run check

# Production build
npm run tauri:build
```

The built executable will be at `src-tauri/target/release/app` (or `.exe` on Windows).

## Configuration

The app connects to `mtl-movies-backend` at `http://localhost:8080`. Update `vite.config.ts` proxy if your backend runs elsewhere.

## Architecture

```
src/
├── components/      # UI components (MediaCard, VideoPlayer, SearchBar...)
├── composables/     # Vue composables (useMediaApi, usePlayer, useDebounce)
├── views/           # Page-level components (HomeView, SectionView, PlayerView)
├── router/          # Vue Router config
└── types/           # TypeScript types

src-tauri/           # Tauri/Rust backend
```

## Tech Stack

- **Tauri 2.x** — Desktop framework
- **Vue 3** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool
- **Vue Router** — Routing
- **Video.js** — Video playback
- **Vitest** — Unit testing