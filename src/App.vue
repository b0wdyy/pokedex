<script lang="ts" setup>
import { useWindowSize } from '@/composables/use-window-size';
import { usePokemon } from '@/composables/use-pokemon';
import Loader from '@/components/common/loader.vue';
import Pokedex from '@/components/pokemon/pokedex.vue';

const { width } = useWindowSize();
const { loading } = usePokemon();
</script>

<template>
  <Loader :loading="loading" />

  <div class="grid md:grid-cols-12">
    <aside
      v-if="width > 768"
      class="max-h-screen overflow-y-auto rounded-r-lg bg-white p-4 md:col-span-5"
    >
      <Pokedex />
    </aside>

    <main class="relative max-h-screen overflow-y-auto md:col-span-7">
      <router-view></router-view>
    </main>
  </div>
</template>
