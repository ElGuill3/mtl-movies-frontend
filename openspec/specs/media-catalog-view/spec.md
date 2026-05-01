# media-catalog-view Specification

## Purpose

Displays the media library catalog in a grid layout, organized by type sections (Movies, Series, Anime). Each media item shows a poster image, title, year, rating, and genre tags.

## Requirements

### Requirement: Section Grid Layout

The app SHALL display three sections on the Home view: Movies, Series, and Anime. Each section SHALL show a horizontally scrollable row of media cards.

### Requirement: Media Card Display

Each media card SHALL display:
- Poster image (from TMDb poster_url or fallback placeholder)
- Title text (truncated if exceeds 2 lines)
- Year (from media item)
- Rating (vote_average from TMDb, displayed as "X.X" or "—" if unavailable)
- Genre tags (first 2 genres as pills, or "—" if none)

### Requirement: Section Header

Each section SHALL have a header with the section name (e.g., "Movies") and an optional "View All" link that navigates to the full section view.

### Requirement: Loading State

While media items are being fetched, the app SHALL display skeleton placeholder cards (minimum 4 per section).

### Requirement: Empty State

If a section has no media items, the app SHALL display a message: "No [type] found. Run a scan from the backend."

### Requirement: Responsive Grid

Media cards SHALL reflow based on window width. Minimum card width is 180px, maximum is 240px.

---

## Scenarios

#### Scenario: Home view loads with populated sections

- GIVEN backend has movies, series, and anime
- WHEN user opens the app
- THEN Home view displays Movies, Series, Anime sections
- AND each section shows up to 10 media cards
- AND each card shows poster, title, year, rating, genre tags

#### Scenario: Section with no items shows empty state

- GIVEN backend has zero anime items
- WHEN user opens the app
- THEN the Anime section displays "No anime found. Run a scan from the backend."

#### Scenario: Media card shows fallback when poster unavailable

- GIVEN a media item has empty poster_url
- WHEN card is rendered
- THEN a placeholder image is shown (generic film icon)
- AND no broken image icon appears

#### Scenario: Loading state displays skeleton cards

- WHEN media data is being fetched
- THEN skeleton cards are displayed in each section
- AND skeleton cards have the same dimensions as real media cards

#### Scenario: Clicking a media card navigates to player

- GIVEN user sees a media card
- WHEN user clicks the card
- THEN the app navigates to the Player view for that media item