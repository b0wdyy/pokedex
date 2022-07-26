import {RouteRecordRaw} from 'vue-router';
import PokemonDetail from '../pages/pokemon/detail.vue';

export const pokemonRoutes: RouteRecordRaw[] = [
	{
		path: '/pokemon/:id',
		component: PokemonDetail,
	},
];
