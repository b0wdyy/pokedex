import { RouteRecordRaw } from 'vue-router';
import MyTeam from '@/pages/my-team.vue';

export const teamRoutes: RouteRecordRaw[] = [
  {
    path: '/team',
    component: MyTeam,
  },
];
