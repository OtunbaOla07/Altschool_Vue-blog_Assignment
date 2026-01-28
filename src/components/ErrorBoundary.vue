<script setup lang="ts">
import { ref } from 'vue'

const hasError = ref(false)
const errorMessage = ref('')

defineExpose({
  setError(error: Error) {
    hasError.value = true
    errorMessage.value = error.message
  },
  clearError() {
    hasError.value = false
    errorMessage.value = ''
  },
})

const handleReset = () => {
  hasError.value = false
  errorMessage.value = ''
}
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-container">
      <h2>⚠️ Something Went Wrong</h2>
      <p class="error-message">{{ errorMessage }}</p>
      <button @click="handleReset" class="reset-btn">Try Again</button>
    </div>
  </div>
  <slot v-else />
</template>

<style scoped>
.error-boundary {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.error-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
}

.error-container h2 {
  color: #d32f2f;
  margin-bottom: 1rem;
}

.error-message {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.reset-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.reset-btn:hover {
  background: #5568d3;
}
</style>
