<script lang="ts" setup>
import Container from '@/components/common/container.vue';
import Pokedex from '@/components/pokemon/pokedex.vue';
import { useWindowSize } from '@/composables/use-window-size';

const { width } = useWindowSize();
</script>

<template>
  <Container v-if="width < 768">
    <pokedex />
  </Container>

  <div v-else class="grid h-screen place-items-center">
    <p>Kies een pokemon om te starten! Of navigeer door de app.</p>
  </div>
</template>
