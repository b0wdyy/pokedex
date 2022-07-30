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
import DraggableModal from '@/components/modal/draggable-modal.vue';
import { ref } from 'vue';
import { SORT_VALUES } from '@/utils/constants';
import { SortTypes } from '@/utils/types/SortTypes';

// TODO: render cards in chunks

const { query } = useRoute();
const { replace } = useRouter();
const { filteredPokemonList, loading, favoritesLength, teamLength } =
  usePokemon();
const sortModalOpen = ref(false);

const onChange = debounce(async (value: string) => {
  await replace({
    query: {
      ...query,
      q: value || undefined,
    },
  });
}, 500);

const onSortClick = () => {
  sortModalOpen.value = true;
};

const changeSort = () => {
  console.log('sortChange');
};

const onSortChangeClick = (value: SortTypes) => {
  replace({
    query: {
      ...query,
      sort: value,
    },
  });
};
</script>

<template>
  <div class="my-4 flex items-center justify-end gap-2">
    <button v-html="svg.filter"></button>
    <button @click="onSortClick" v-html="svg.sort"></button>
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
      :subtitle="`${teamLength} pokemon`"
      class="card__team"
      title="Mijn team"
      to="/team"
    />
    <pokemon-group-link
      :subtitle="`${favoritesLength} pokemon`"
      class="card__favorites"
      title="Favorieten"
      to="/favorites"
    />
  </div>

  <Loader :loading="loading" />

  <div
    v-if="!loading && filteredPokemonList.length"
    class="mb-4 flex flex-col gap-4"
  >
    <pokemon-card
      v-for="pokemon in filteredPokemonList"
      :key="pokemon.id"
      :pokemon="pokemon"
    />

    <transition name="fade">
      <draggable-modal
        v-if="sortModalOpen"
        title="Sorteren op"
        @onClose="sortModalOpen = false"
        @onSubmitClick="changeSort"
      >
        <div class="flex flex-col gap-2">
          <button
            v-for="sortValue in SORT_VALUES"
            :key="sortValue.value"
            class="flex w-full items-center rounded-lg border border-emerald-200 bg-gray-100 p-2 px-4"
            @click="onSortChangeClick(sortValue.value)"
          >
            <span class="mr-2 inline-block" v-html="sortValue.icon"></span>

            <span>
              {{ sortValue.title }}
            </span>

            <span></span>
          </button>
        </div>
      </draggable-modal>
    </transition>
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
