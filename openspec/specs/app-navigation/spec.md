# app-navigation Specification

## Purpose

Provides client-side routing for the Tauri desktop app. Defines the navigation structure between Home, Section, and Player views.

## Requirements

### Requirement: Route Structure

The app SHALL use Vue Router with the following routes:
- `/` → HomeView (3-section layout)
- `/section/:type` → SectionView (filtered grid for type=movie|series|anime)
- `/player/:id` → PlayerView (video playback)

### Requirement: Home View

The Home view SHALL display all three section rows (Movies, Series, Anime) on a single page.

### Requirement: Section View

The Section view SHALL display a full grid of media cards filtered by the type URL parameter. It SHALL include a back button to return to Home.

### Requirement: Player View

The Player view SHALL display the video player for the media item specified by the ID URL parameter.

### Requirement: Back Navigation

The Player view SHALL have a back button that returns to the previous Section or Home view. Pressing Escape SHALL also navigate back.

### Requirement: URL State

The app SHALL preserve the current route in the URL so users can potentially bookmark or share links (future consideration).

---

## Scenarios

#### Scenario: Navigate to section from Home

- GIVEN user is on Home view
- WHEN user clicks "View All" on Movies section
- THEN URL changes to /section/movie
- AND Section view displays all movies

#### Scenario: Navigate to player from section

- GIVEN user is on /section/movie
- WHEN user clicks a media card
- THEN URL changes to /player/123
- AND Player view loads with video for media item 123

#### Scenario: Back button from player

- GIVEN user is on /player/123
- WHEN user clicks the back button
- THEN URL changes back to previous page (Home or section)
- AND video stops playing

#### Scenario: Escape key from player

- GIVEN user is on /player/123
- WHEN user presses Escape
- THEN video stops
- AND app navigates back to previous view