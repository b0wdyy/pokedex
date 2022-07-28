<script lang="ts" setup>
import { svg } from '@/utils/svg';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { query } = useRoute();

const filter = ref((query.q as string) || '');
</script>

<template>
  <div class="my-4 flex items-center justify-end gap-2">
    <button v-html="svg.filter"></button>
    <button v-html="svg.sort"></button>
  </div>

  <header class="mb-4">
    <Title color="text-black" class="mb-2" type="h1">Pokédex</Title>
    <Input
      :value="filter"
      placeholder="Pokemon zoeken"
      type="text"
      :icon-left="svg.search"
      @onInputChange="onChange"
    />
  </header>

  <div class="mb-5 grid grid-cols-2 gap-2">
    <pokemon-group-link
      to="/team"
      class="card__team"
      title="Mijn team"
      subtitle="4 pokemon"
    />
    <pokemon-group-link
      to="/favorites"
      class="card__favorites"
      title="Favorieten"
      subtitle="12 pokemon"
    />
  </div>

  <Loader :loading="loading" />

  <div v-if="!loading && !error" class="mb-4 flex flex-col gap-4">
    <pokemon-card v-for="mon in filteredPokemon" :key="mon.id" :pokemon="mon" />
  </div>
</template>
