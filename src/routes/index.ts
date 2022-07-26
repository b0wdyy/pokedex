import {createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/home.vue';
import {pokemonRoutes} from './pokemon';

export const router = createRouter({
	history: createWebHistory(),
	routes: [{path: '/', component: Home}, ...pokemonRoutes],
});
