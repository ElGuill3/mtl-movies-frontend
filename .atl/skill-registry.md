# Skill Registry — mtl-movies-frontend

**Project**: mtl-movies-frontend
**Updated**: 2026-04-30
**Stack**: Vue 3 + TypeScript + Vite + Tauri 2.x (Rust)

## Available Skills

| Skill | Description | Trigger |
|-------|-------------|---------|
| `sdd-propose` | Create change proposals with intent, scope, approach | When creating new features/changes |
| `sdd-spec` | Write detailed specifications with requirements/scenarios | When specs need to be written |
| `sdd-design` | Create technical design documents | When technical approach needs to be defined |
| `sdd-tasks` | Break down specs into implementation tasks | When tasks need to be created |
| `sdd-apply` | Implement code from task definitions | When implementing tasks |
| `sdd-verify` | Validate implementation against specs | When verifying completed work |
| `sdd-archive` | Sync specs and archive completed changes | When archiving a completed change |
| `sdd-explore` | Explore codebase and investigate ideas | When investigating or clarifying requirements |
| `sdd-onboard` | Guided SDD workflow walkthrough | When onboarding to SDD |
| `go-testing` | Go testing patterns | When writing Go tests (backend) |

## Project Stack

- **Frontend**: Vue 3 + TypeScript + Vite + Video.js
- **Desktop**: Tauri 2.x (Rust backend)
- **Backend**: Go + SQLite + Chi router (existing in mtl-movies-backend)

## Architecture Notes

- SPA desktop app communicating with Go backend via HTTP (:8080)
- Vue Router for page navigation
- Pinia for state management (future)
- Axios for API calls to backend
- Video.js for media playback

## Conventions

- **Linting**: ESLint with vue-eslint-parser + @typescript-eslint
- **Formatting**: Prettier with vueIndentScriptAndStyle: false
- **Type checking**: vue-tsc
- **Testing**: Vitest + @vue/test-utils + jsdom
- Components: PascalCase, composables: camelCase prefixed with `use`