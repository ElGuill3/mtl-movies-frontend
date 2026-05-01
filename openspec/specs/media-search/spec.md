# media-search Specification

## Purpose

Provides search and filtering functionality to find media items by title and filter by genre.

## Requirements

### Requirement: Search Input

The app SHALL display a search input field in the header. The input SHALL accept free text for case-insensitive partial title matching.

### Requirement: Search Execution

When the user types in the search field, the app SHALL send GET /api/media?search={query} to the backend after the user stops typing for 300ms (debounce).

### Requirement: Genre Filter

The app SHALL display a genre filter dropdown. The dropdown SHALL list all available TMDb genres (loaded from /api/media with genres field parsed).

### Requirement: Combined Filtering

The search and genre filter SHALL work together: GET /api/media?search={query}&type={type}.

### Requirement: Search Results Display

Search results SHALL replace the current section's media cards. The app SHALL display a "X results for '{query}'" label above results.

### Requirement: Clear Search

When the search input is cleared, the app SHALL revert to showing all items in the current section.

### Requirement: No Results State

If search returns no items, the app SHALL display: "No results found for '{query}'. Try a different search term."

---

## Scenarios

#### Scenario: Search by title

- GIVEN user is on Home view
- WHEN user types "breaking" in search
- THEN after 300ms, GET /api/media?search=breaking is called
- AND results containing "breaking" appear in the section

#### Scenario: Filter by genre

- GIVEN genres are loaded from API
- WHEN user selects "Action" from genre dropdown
- THEN GET /api/media?type=movie is called with Action genre filter
- AND only Action movies are displayed

#### Scenario: Combined search and genre filter

- GIVEN user has typed "bat" in search
- AND selected "Action" genre
- WHEN user stops typing
- THEN GET /api/media?search=bat&type=movie is called
- AND results show Action movies containing "bat"

#### Scenario: Clear search restores all items

- GIVEN user searched "inception" and results are shown
- WHEN user clears the search input
- THEN all movies in the section are restored
- AND genre filter selection is retained

#### Scenario: No results message

- GIVEN no media items match "xyznonexistent"
- WHEN search executes
- THEN "No results found for 'xyznonexistent'. Try a different search term." is displayed