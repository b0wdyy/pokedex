<script lang="ts" setup>
import { useWindowSize } from '@/composables/use-window-size';

const { width } = useWindowSize();
console.log(width.value);
</script>

<template>
  <div>
    <router-view v-if="width > 768" name="Pokedex" />
    <router-view></router-view>
  </div>
</template>
