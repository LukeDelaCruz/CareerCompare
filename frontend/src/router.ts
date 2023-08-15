import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/compare', component: () => import('./views/Comparison.vue') },
  { path: '/about', component: () => import('./views/About.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
