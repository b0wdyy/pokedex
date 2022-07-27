<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePokemon } from '@/composables/use-pokemon';
import { svg } from '@/utils/svg';
import Container from '@/components/common/container.vue';
import { IPokemonDetail } from '@/utils/interfaces/IPokemonDetail';
import { capitalize } from '@/utils/helpers';

const { params } = useRoute();
const { pokemon, loading } = usePokemon<IPokemonDetail>(Number(params.id));
</script>

<template>
  <Container v-if="!loading && pokemon !== undefined">
    <header class="my-4">
      <div class="flex items-center gap-2">
        <div class="inline-block fill-black" v-html="svg.chevronLeft"></div>
        <p>Terug</p>
      </div>
    </header>

    <div>
      <h1 class="text-3xl font-bold">{{ capitalize(pokemon.name) }}</h1>
    </div>
  </Container>
</template>
