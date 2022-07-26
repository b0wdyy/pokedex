import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import { router } from '@/routes';
import { createPinia } from 'pinia';
import { GesturePlugin } from '@vueuse/gesture';
import { MotionPlugin } from '@vueuse/motion';
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(GesturePlugin);
app.use(MotionPlugin);
app.use(VueApexCharts);
app.mount('#app');
