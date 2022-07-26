<script lang="ts" setup>
import Container from '@/components/common/container.vue';
import Title from '@/components/common/text/title.vue';
import { svg } from '@/utils/svg';
import { usePokemon } from '@/composables/use-pokemon';
import Loader from '@/components/common/loader.vue';
import PokemonCard from '@/components/pokemon/card.vue';
import PokemonGroupButton from '@/components/pokemon/group-button.vue';
import Input from '@/components/form/input.vue';
import debounce from 'lodash.debounce';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { pokemon, loading, error } = usePokemon();
const { query } = useRoute();
const { replace } = useRouter();

const filter = ref((query.q as string) || '');
const filteredPokemon = computed(() => {
  return pokemon.value.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(filter.value.toLowerCase()) ||
      pokemon.id.toString() === filter.value
  );
});

const onChange = debounce((value: string) => {
  filter.value = value;
  replace({
    query: {
      q: value || undefined,
    },
  });
}, 500);
</script>

<template>
  <Container>
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
      <pokemon-group-button
        class="card__team"
        title="Mijn team"
        subtitle="4 pokemon"
      />
      <pokemon-group-button
        class="card__favorites"
        title="Favorieten"
        subtitle="12 pokemon"
      />
    </div>

    <Loader :loading="loading" />

    <div v-if="!loading && !error" class="flex flex-col gap-4">
      <pokemon-card
        v-for="mon in filteredPokemon"
        :key="mon.id"
        :pokemon="mon"
      />
    </div>
  </Container>
</template>

<style>
.card__team {
  background: linear-gradient(109.73deg, #46469c 0%, #7e32e0 100%);
}
.card__favorites {
  background: linear-gradient(109.73deg, #65cb9a 0%, #15d0dc 100%);
}
</style>
