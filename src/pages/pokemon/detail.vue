<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePokemon } from '@/composables/use-pokemon';
import { ChevronLeftIcon } from '@heroicons/vue/solid';
import { HeartIcon } from '@heroicons/vue/outline';
import Container from '@/components/common/container.vue';
import { IPokemonDetail } from '@/utils/interfaces/IPokemonDetail';
import { capitalize } from '@/utils/helpers';
import PokemonDetailBox from '@/components/pokemon/detail-box.vue';

const { params } = useRoute();
const { pokemon, loading } = usePokemon<IPokemonDetail>(Number(params.id));
</script>

<template>
  <Container v-if="!loading && pokemon !== undefined" class="bg-[#7ECD8B] py-4">
    <header class="mb-3 flex items-center justify-between">
      <div class="flex items-center">
        <ChevronLeftIcon class="h-8 w-8 text-white" />
        <p class="text-white">Terug</p>
      </div>

      <HeartIcon class="h-8 w-8 text-white" />
    </header>

    <div>
      <h1 class="mb-4 text-3xl font-bold text-white">
        {{ capitalize(pokemon.name) }}
      </h1>

      <PokemonDetailBox title="About">
        <p>hoi</p>
      </PokemonDetailBox>
    </div>
  </Container>
</template>
