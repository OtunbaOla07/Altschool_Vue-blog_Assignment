import type { BlogPost } from '../types'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const posts = await response.json()
    
    // Add excerpt field (first 100 characters of body)
    return posts.map((post: any) => ({
      ...post,
      excerpt: post.body.substring(0, 100) + '...',
    }))
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw error
  }
}

export async function fetchPost(id: string | string[]): Promise<BlogPost> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const post = await response.json()
    
    // Add excerpt field
    return {
      ...post,
      excerpt: post.body.substring(0, 100) + '...',
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
    throw error
  }
}
