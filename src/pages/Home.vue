<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchPosts } from '../api/posts'
import type { BlogPost } from '../types'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const posts = ref<BlogPost[]>([])
const error = ref<string | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    isLoading.value = true
    error.value = null
    const data = await fetchPosts()
    posts.value = data.slice(0, 10) // Limit to 10 posts for demo
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load posts'
    throw new Error(error.value)
  } finally {
    isLoading.value = false
  }
})

const goToPost = (id: number) => {
  router.push({ name: 'Detail', params: { id } })
}
</script>

<template>
  <div class="home-container">
    <header class="header">
      <h1>📝 My Blog</h1>
      <p class="subtitle">Welcome to my collection of articles</p>
    </header>

    <LoadingSpinner v-if="isLoading" />

    <div v-else-if="error" class="error-alert">
      <p>{{ error }}</p>
    </div>

    <div v-else class="posts-grid">
      <article
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        @click="goToPost(post.id)"
      >
        <div class="post-content">
          <h2>{{ post.title }}</h2>
          <p class="excerpt">{{ post.excerpt }}</p>
          <button class="read-more-btn">Read More →</button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  animation: slideDown 0.6s ease;
}

.subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.post-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

.post-content {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
  line-height: 1.4;
  flex-grow: 0;
}

.excerpt {
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
  font-size: 0.95rem;
}

.read-more-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s ease;
  align-self: flex-start;
}

.read-more-btn:hover {
  opacity: 0.9;
}

.error-alert {
  background: #ffebee;
  color: #c62828;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}
</style>
