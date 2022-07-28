import { RouteRecordRaw } from 'vue-router';
import MyTeam from '@/pages/my-team.vue';
import Pokedex from '@/components/pokemon/pokedex.vue';

export const teamRoutes: RouteRecordRaw[] = [
  {
    path: '/team',
    components: {
      default: MyTeam,
      Pokedex,
    },
  },
];
