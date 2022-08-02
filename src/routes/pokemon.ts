import { RouteRecordRaw } from 'vue-router';
import PokemonDetail from '../pages/pokemon/detail.vue';

export const pokemonRoutes: RouteRecordRaw[] = [
  {
    path: '/pokemon/:id',
    name: 'pokemon-detail',
    component: PokemonDetail,
  },
];
