import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

// Lazy load pages with Suspense
const Home = defineAsyncComponent(() => import('../pages/Home.vue'))
const Detail = defineAsyncComponent(() => import('../pages/Detail.vue'))
const NotFound = defineAsyncComponent(() => import('../pages/NotFound.vue'))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/post/:id',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
