<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { usePokemon } from '@/composables/use-pokemon';
import { ChevronLeftIcon } from '@heroicons/vue/solid';
import { HeartIcon } from '@heroicons/vue/outline';
import Container from '@/components/common/container.vue';
import PokemonDetailBox from '@/components/pokemon/detail-box.vue';
import { capitalize } from '@/utils/helpers';
import { onBeforeUnmount, onMounted } from 'vue';

onMounted(() => {
  document.body.style.background = '#7ECD8B';
});

onBeforeUnmount(() => {
  document.body.style.background = '';
});

const { params } = useRoute();
const { pokemon, loading } = usePokemon(Number(params.id));
</script>

<template>
  <Container v-if="!loading && pokemon" class="py-4">
    <header class="mb-3 flex items-center justify-between">
      <router-link :to="{ name: 'home' }" class="flex items-center">
        <ChevronLeftIcon class="h-8 w-8 text-white" />
        <p class="text-white">Terug</p>
      </router-link>

      <HeartIcon class="h-8 w-8 text-white" />
    </header>

    <div>
      <h1 v-if="pokemon.name" class="mb-4 text-3xl font-bold text-white">
        {{ capitalize(pokemon.name) }}
      </h1>

      <PokemonDetailBox title="About">
        <p>hoi</p>
      </PokemonDetailBox>
    </div>
  </Container>
</template>

<style scoped></style>
