<script setup lang="ts">
import { ref } from 'vue'
import ErrorBoundary from './components/ErrorBoundary.vue'

const errorBoundaryRef = ref<InstanceType<typeof ErrorBoundary>>()
</script>

<template>
  <ErrorBoundary ref="errorBoundaryRef">
    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <div class="suspense-fallback">
          <div class="spinner"></div>
          <p>Loading page...</p>
        </div>
      </template>
    </Suspense>
  </ErrorBoundary>
</template>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

.suspense-fallback {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.suspense-fallback p {
  color: white;
  font-size: 1.1rem;
  margin: 0;
}
</style>
