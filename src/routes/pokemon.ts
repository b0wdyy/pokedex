import { RouteRecordRaw } from 'vue-router';
import PokemonDetail from '../pages/pokemon/detail.vue';
import Pokedex from '@/components/pokemon/pokedex.vue';

export const pokemonRoutes: RouteRecordRaw[] = [
  {
    path: '/pokemon/:id',
    beforeEnter(to, from) {
      console.log({ to });
      console.log({ from });
    },
    components: {
      default: PokemonDetail,
      Pokedex,
    },
  },
];
