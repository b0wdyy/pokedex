import { RouteRecordRaw } from 'vue-router';
import PokemonDetail from '../pages/pokemon/detail.vue';
import Pokedex from '@/components/pokemon/pokedex.vue';

export const pokemonRoutes: RouteRecordRaw[] = [
  {
    path: '/pokemon/:id',
    components: {
      default: PokemonDetail,
      Pokedex,
    },
  },
];
