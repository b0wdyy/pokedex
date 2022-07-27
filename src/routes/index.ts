import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home.vue';
import NotFound from '@/pages/404.vue';
import { pokemonRoutes } from './pokemon';
import { teamRoutes } from '@/routes/team';
import { favoritesRoutes } from '@/routes/favorites';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    ...teamRoutes,
    ...favoritesRoutes,
    ...pokemonRoutes,
    { path: '/:pathMatch(.*)', component: NotFound },
  ],
});
