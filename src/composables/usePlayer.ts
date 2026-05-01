import { ref, type Ref } from 'vue'

export interface PlayerState {
  playing: Ref<boolean>
  currentTime: Ref<number>
  duration: Ref<number>
  volume: Ref<number>
  muted: Ref<boolean>
  isFullscreen: Ref<boolean>
  isBuffering: Ref<boolean>
  error: Ref<string | null>
  play: () => void
  pause: () => void
  seek: (time: number) => void
  setVolume: (vol: number) => void
  toggleMute: () => void
  toggleFullscreen: () => void
  setupKeyboardShortcuts: (videoElement: HTMLElement) => void
  bindVideo: (el: HTMLVideoElement) => void
}

export function usePlayer(): PlayerState {
  const playing = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(1)
  const muted = ref(false)
  const isFullscreen = ref(false)
  const isBuffering = ref(false)
  const error = ref<string | null>(null)

  // Video element - set via bindVideo()
  let videoEl: HTMLVideoElement | null = null

  const play = () => {
    if (videoEl) {
      videoEl.play()
      playing.value = true
    }
  }

  const pause = () => {
    if (videoEl) {
      videoEl.pause()
      playing.value = false
    }
  }

  const seek = (time: number) => {
    if (videoEl) {
      videoEl.currentTime = time
      currentTime.value = time
    }
  }

  const setVolume = (vol: number) => {
    volume.value = vol
    if (videoEl) {
      videoEl.volume = vol
    }
  }

  const toggleMute = () => {
    muted.value = !muted.value
    if (videoEl) {
      videoEl.muted = muted.value
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }

  const setupKeyboardShortcuts = (el: HTMLElement) => {
    el.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault()
          if (playing.value) {
            pause()
          } else {
            play()
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          seek(Math.min(currentTime.value + 10, duration.value))
          break
        case 'ArrowLeft':
          e.preventDefault()
          seek(Math.max(currentTime.value - 10, 0))
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 'm':
        case 'M':
          toggleMute()
          break
      }
    })
  }

  const bindVideo = (el: HTMLVideoElement) => {
    videoEl = el

    el.addEventListener('loadedmetadata', () => {
      duration.value = el.duration
    })

    el.addEventListener('timeupdate', () => {
      currentTime.value = el.currentTime
    })

    el.addEventListener('play', () => {
      playing.value = true
    })

    el.addEventListener('pause', () => {
      playing.value = false
    })

    el.addEventListener('volumechange', () => {
      volume.value = el.volume
      muted.value = el.muted
    })

    el.addEventListener('waiting', () => {
      isBuffering.value = true
    })

    el.addEventListener('canplay', () => {
      isBuffering.value = false
    })

    el.addEventListener('error', () => {
      error.value = 'Failed to load video. Check your connection and try again.'
    })
  }

  return {
    playing,
    currentTime,
    duration,
    volume,
    muted,
    isFullscreen,
    isBuffering,
    error,
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    toggleFullscreen,
    setupKeyboardShortcuts,
    bindVideo,
  }
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}