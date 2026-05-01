# media-player Specification

## Purpose

Provides full-screen video playback for selected media items. The player streams video directly from the backend using HTTP Range requests for seek support.

## Requirements

### Requirement: Full-Screen Video Display

When navigating to the Player view, the app SHALL display a full-screen video player. The video element SHALL fill the entire viewport.

### Requirement: Streaming Playback

The player SHALL request the video via the backend streaming endpoint (GET /media/{path}) with appropriate Range headers for seek support.

### Requirement: Playback Controls

The player SHALL provide the following controls:
- Play/Pause toggle button
- Seek bar (scrubber) showing current position and duration
- Time display: "current / total" in HH:MM:SS format
- Volume slider (0-100%)
- Fullscreen toggle button

### Requirement: Keyboard Shortcuts

The player SHALL support:
- Space: Play/Pause
- Left Arrow: Seek back 10 seconds
- Right Arrow: Seek forward 10 seconds
- F: Toggle fullscreen
- M: Mute/Unmute

### Requirement: Buffering Indicator

While the video is buffering, the player SHALL display a spinner overlay with "Buffering..." text.

### Requirement: Error State

If the video fails to load, the player SHALL display an error message: "Failed to load video. Check your connection and try again." with a "Retry" button.

### Requirement: Navigation Away

When the user navigates away from the player (back button or escape key), the video SHALL stop playing and release resources.

---

## Scenarios

#### Scenario: Play a movie successfully

- GIVEN user selected a media item
- WHEN Player view loads
- THEN video begins streaming from /media/{path}
- AND playback controls are visible
- AND current time / duration is displayed

#### Scenario: Pause and resume playback

- GIVEN video is playing
- WHEN user presses Space or clicks pause button
- THEN video pauses at current position
- AND pause button changes to play icon
- WHEN user presses Space or clicks play button again
- THEN video resumes from paused position

#### Scenario: Seek to specific position

- GIVEN video is at position 00:05:00
- WHEN user drags the seek bar to 00:15:00
- THEN video jumps to 00:15:00
- AND playback continues from new position

#### Scenario: Keyboard shortcuts work

- GIVEN video is playing
- WHEN user presses Right Arrow
- THEN video seeks forward 10 seconds
- WHEN user presses M
- THEN video mutes (or unmutes if already muted)

#### Scenario: Video load failure shows error

- GIVEN video source is unavailable
- WHEN player attempts to load
- THEN error overlay appears with "Failed to load video..."
- AND a "Retry" button is displayed

#### Scenario: Back navigation stops video

- GIVEN video is playing in Player view
- WHEN user presses Escape or back button
- THEN video stops
- AND resources are released
- AND app navigates back to previous view