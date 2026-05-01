<script setup lang="ts">
// Skeleton card for loading state - matches MediaCard dimensions
</script>

<template>
  <div class="skeleton-card">
    <div class="skeleton-card__poster skeleton-pulse"></div>
    <div class="skeleton-card__info">
      <div class="skeleton-card__title skeleton-pulse"></div>
      <div class="skeleton-card__meta skeleton-pulse"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  width: 180px;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a2e;
}

.skeleton-card__poster {
  width: 180px;
  height: 270px;
  background: #16213e;
}

.skeleton-card__info {
  padding: 8px;
}

.skeleton-card__title {
  height: 16px;
  width: 80%;
  background: #2a2a4e;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-card__meta {
  height: 12px;
  width: 50%;
  background: #2a2a4e;
  border-radius: 4px;
}

.skeleton-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
</style>