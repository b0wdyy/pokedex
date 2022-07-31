<script lang="ts" setup>
import { useWindowSize } from '@/composables/use-window-size';

const { width } = useWindowSize();
</script>

<template>
  <div class="grid md:grid-cols-12">
    <aside
      v-if="width > 768"
      class="col-span-4 max-h-screen overflow-y-auto rounded-r-lg bg-white p-4"
    >
      <router-view name="Pokedex" />
    </aside>

    <main class="relative max-h-screen overflow-y-auto md:col-span-8">
      <router-view></router-view>
    </main>
  </div>
</template>
