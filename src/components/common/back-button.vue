<script lang="ts" setup>
import { ChevronLeftIcon } from '@heroicons/vue/solid';

defineProps<{
  to: string;
}>();
</script>

<template>
  <router-link :to="to" class="flex items-center">
    <ChevronLeftIcon class="h-8 w-8 text-white" />
    <p class="text-white">Terug</p>
  </router-link>
</template>
