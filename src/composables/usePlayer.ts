import { ref } from 'vue'

export interface PlayerState {
  playing: ReturnType<typeof ref<boolean>>
  currentTime: ReturnType<typeof ref<number>>
  duration: ReturnType<typeof ref<number>>
  volume: ReturnType<typeof ref<number>>
  muted: ReturnType<typeof ref<boolean>>
  isFullscreen: ReturnType<typeof ref<boolean>>
  isBuffering: ReturnType<typeof ref<boolean>>
  error: ReturnType<typeof ref<string | null>>
  play: () => void
  pause: () => void
  seek: (time: number) => void
  setVolume: (vol: number) => void
  toggleMute: () => void
  toggleFullscreen: () => void
  setupKeyboardShortcuts: (videoElement: HTMLElement) => void
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

  // Internal video element reference
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