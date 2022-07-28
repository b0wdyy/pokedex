import { RouteRecordRaw } from 'vue-router';
import Favorites from '@/pages/favorites.vue';
import Pokedex from '@/components/pokemon/pokedex.vue';

export const favoritesRoutes: RouteRecordRaw[] = [
  {
    path: '/favorites',
    components: {
      default: Favorites,
      Pokedex,
    },
  },
];
