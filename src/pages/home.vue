<script lang="ts" setup>
import Container from '@/components/common/container.vue';
import Title from '@/components/common/text/title.vue';
import { svg } from '@/utils/svg';
import { usePokemon } from '@/composables/use-pokemon';
import Loader from '@/components/common/loader.vue';
import PokemonCard from '@/components/pokemon/card.vue';
import Input from '@/components/form/input.vue';
import debounce from 'lodash.debounce';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { pokemon, loading, error } = usePokemon();
const { query } = useRoute();
const { replace } = useRouter();

const filter = ref((query.q as string) || '');
const filteredPokemon = computed(() => {
  return pokemon.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.value.toLowerCase())
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
