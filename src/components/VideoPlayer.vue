<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { usePlayer, formatTime } from '../composables/usePlayer'

const props = defineProps<{
  src: string
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

const {
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
} = usePlayer()

onMounted(() => {
  if (videoRef.value) {
    setupKeyboardShortcuts(videoRef.value)
  }
})

const onPlayPause = () => {
  if (playing.value) {
    pause()
  } else {
    play()
  }
}

const onSeek = (event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value)
  seek(value)
}

const onVolumeChange = (event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value)
  setVolume(value)
}

const retry = () => {
  error.value = null
  if (videoRef.value) {
    videoRef.value.load()
  }
}
</script>

<template>
  <div
    class="video-player"
    :class="{ 'video-player--fullscreen': isFullscreen }"
    tabindex="0"
  >
    <video
      ref="videoRef"
      class="video-player__video"
      :src="src"
      @click="onPlayPause"
    />

    <!-- Buffering indicator -->
    <div v-if="isBuffering" class="video-player__buffering">
      <span>Buffering...</span>
    </div>

    <!-- Error state -->
    <div v-if="error" class="video-player__error">
      <p>{{ error }}</p>
      <button class="video-player__retry-btn" @click="retry">Retry</button>
    </div>

    <!-- Controls overlay -->
    <div v-if="!error" class="video-player__controls">
      <!-- Seek bar -->
      <div class="video-player__seek-container">
        <input
          type="range"
          class="video-player__seek"
          min="0"
          :max="duration"
          :value="currentTime"
          @input="onSeek"
        />
        <span class="video-player__time">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>
      </div>

      <!-- Buttons row -->
      <div class="video-player__buttons">
        <!-- Play/Pause -->
        <button class="video-player__play-btn" @click="onPlayPause">
          {{ playing ? '⏸' : '▶' }}
        </button>

        <!-- Volume -->
        <div class="video-player__volume">
          <span>{{ muted ? '🔇' : '🔊' }}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            :value="volume"
            @input="onVolumeChange"
          />
        </div>

        <!-- Spacer -->
        <div class="video-player__spacer"></div>

        <!-- Fullscreen -->
        <button class="video-player__fullscreen-btn" @click="toggleFullscreen">
          {{ isFullscreen ? '⛶' : '⛶' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
}

.video-player--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.video-player__video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-player__buffering {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 20px 40px;
  border-radius: 8px;
  font-size: 16px;
}

.video-player__error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
}

.video-player__error p {
  margin: 0 0 20px 0;
  font-size: 18px;
}

.video-player__retry-btn {
  background: #3a3a5c;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.video-player__retry-btn:hover {
  background: #4a4a6e;
}

.video-player__controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  padding: 20px;
}

.video-player__seek-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.video-player__seek {
  flex: 1;
  height: 4px;
  cursor: pointer;
}

.video-player__time {
  color: #fff;
  font-size: 12px;
  min-width: 100px;
}

.video-player__buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.video-player__play-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}

.video-player__volume {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 18px;
}

.video-player__volume input {
  width: 80px;
  cursor: pointer;
}

.video-player__spacer {
  flex: 1;
}

.video-player__fullscreen-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}
</style>