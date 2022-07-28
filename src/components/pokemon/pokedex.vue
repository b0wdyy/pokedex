<script lang="ts" setup>
import { svg } from '@/utils/svg';
import PokemonCard from '@/components/pokemon/card.vue';
import PokemonGroupLink from '@/components/pokemon/group-link.vue';
import Title from '@/components/common/text/title.vue';
import Input from '@/components/form/input.vue';
import Loader from '@/components/common/loader.vue';
import { useRoute, useRouter } from 'vue-router';
import debounce from 'lodash.debounce';
import { usePokemon } from '@/composables/use-pokemon';

const { query } = useRoute();
const { replace } = useRouter();
const { filteredPokemonList, loading } = usePokemon();

const onChange = debounce(async (value: string) => {
  await replace({
    query: {
      q: value || undefined,
    },
  });
}, 500);
</script>

<template>
  <div class="my-4 flex items-center justify-end gap-2">
    <button v-html="svg.filter"></button>
    <button v-html="svg.sort"></button>
  </div>

  <header class="mb-4">
    <Title class="mb-2" color="text-black" type="h1">Pokédex</Title>
    <Input
      :icon-left="svg.search"
      :value="query.q || ''"
      placeholder="Pokemon zoeken"
      type="text"
      @onInputChange="onChange"
    />
  </header>

  <div class="mb-5 grid grid-cols-2 gap-2">
    <pokemon-group-link
      class="card__team"
      subtitle="4 pokemon"
      title="Mijn team"
      to="/team"
    />
    <pokemon-group-link
      class="card__favorites"
      subtitle="12 pokemon"
      title="Favorieten"
      to="/favorites"
    />
  </div>

  <Loader :loading="loading" />

  <div v-if="!loading" class="mb-4 flex flex-col gap-4">
    <pokemon-card
      v-for="pokemon in filteredPokemonList"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
  </div>
</template>

<style>
.card__team {
  background: linear-gradient(109.73deg, #46469c 0%, #7e32e0 100%);
}
.card__favorites {
  background: linear-gradient(109.73deg, #65cb9a 0%, #15d0dc 100%);
}
</style>
