import { RouteRecordRaw } from 'vue-router';
import Favorites from '@/pages/favorites.vue';

export const favoritesRoutes: RouteRecordRaw[] = [
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
  },
];
