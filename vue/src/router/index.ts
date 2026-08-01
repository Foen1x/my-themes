import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
    { path: '/components', name: 'components', component: () => import('@/views/CatalogView.vue') },
    {
      path: '/components/:slug',
      name: 'component',
      component: () => import('@/views/ComponentView.vue'),
    },
    { path: '/themes', name: 'themes', component: () => import('@/views/ThemesView.vue') },
    { path: '/compare', name: 'compare', component: () => import('@/views/CompareView.vue') },
    { path: '/patterns', name: 'patterns', component: () => import('@/views/PatternsView.vue') },
    { path: '/example', name: 'example', component: () => import('@/views/ExampleView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
