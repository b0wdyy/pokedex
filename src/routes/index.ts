import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home.vue';
import NotFound from '@/pages/404.vue';
import { pokemonRoutes } from './pokemon';
import { teamRoutes } from '@/routes/team';
import { favoritesRoutes } from '@/routes/favorites';
import { usePokemonStore } from '@/stores/PokemonStore';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, name: 'home' },
    ...teamRoutes,
    ...favoritesRoutes,
    ...pokemonRoutes,
    { path: '/:pathMatch(.*)', component: NotFound },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name === 'pokemon-detail' && to.params.id !== from.params.id) {
    const store = usePokemonStore();
    const { id } = to.params;
    await store.fetchPokemonDetail(+id);
  }

  next();
});
