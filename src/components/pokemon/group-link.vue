<script lang="ts" setup>
import { svg } from '@/utils/svg';

defineProps<{
  title: string;
  subtitle: string;
  to: string;
}>();
</script>

<template>
  <router-link
    :to="to"
    class="relative flex h-24 flex-col justify-end rounded-lg p-4"
  >
    <p class="text-lg font-bold text-white">{{ title }}</p>
    <p class="text-sm text-white text-opacity-50">{{ subtitle }}</p>

    <div
      class="absolute right-0 top-1/2 -translate-y-1/2"
      v-html="svg.pokeball"
    ></div>
  </router-link>
</template>
