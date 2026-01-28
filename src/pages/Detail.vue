<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchPost } from '../api/posts'
import type { BlogPost } from '../types'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const route = useRoute()
const post = ref<BlogPost | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    isLoading.value = true
    error.value = null
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    if (!id) {
      throw new Error('Post ID is required')
    }
    const data = await fetchPost(id)
    post.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load post'
    throw new Error(error.value)
  } finally {
    isLoading.value = false
  }
})

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="detail-container">
    <nav class="breadcrumb">
      <button @click="goHome" class="nav-btn">Home</button>
      <span> / </span>
      <button @click="goBack" class="nav-btn">← Back</button>
    </nav>

    <LoadingSpinner v-if="isLoading" />

    <div v-else-if="error" class="error-alert">
      <p>{{ error }}</p>
      <button @click="goHome" class="error-btn">Return Home</button>
    </div>

    <article v-else-if="post" class="post-detail">
      <header class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-id">Post ID: {{ post.id }}</span>
          <span class="user-id">User ID: {{ post.userId }}</span>
        </div>
      </header>

      <div class="post-body">
        <p>{{ post.body }}</p>
      </div>

      <footer class="post-footer">
        <button @click="goHome" class="btn btn-primary">Back to Home</button>
        <button @click="goBack" class="btn btn-secondary">← Previous Page</button>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.breadcrumb {
  max-width: 800px;
  margin: 0 auto 2rem auto;
  color: white;
  font-size: 0.95rem;
}

.nav-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: underline;
  padding: 0;
  transition: opacity 0.3s ease;
}

.nav-btn:hover {
  opacity: 0.8;
}

.post-detail {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.post-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1.5rem;
}

.post-header h1 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 2rem;
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 2rem;
  font-size: 0.85rem;
  color: #999;
}

.post-meta span {
  display: inline-block;
}

.post-body {
  margin-bottom: 2rem;
  line-height: 1.8;
  color: #555;
  font-size: 1rem;
}

.post-body p {
  margin: 0 0 1rem 0;
}

.post-footer {
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.error-alert {
  background: #ffebee;
  color: #c62828;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}

.error-btn {
  background: #c62828;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;
}

.error-btn:hover {
  background: #ad1457;
}
</style>
