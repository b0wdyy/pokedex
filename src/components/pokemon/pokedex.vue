<script lang="ts" setup>
import { svg } from '@/utils/svg';
import PokemonGroupLink from '@/components/pokemon/group-link.vue';
import PokemonCard from '@/components/pokemon/card.vue';
import Title from '@/components/common/text/title.vue';
import Input from '@/components/form/input.vue';
import { useRoute, useRouter } from 'vue-router';
import debounce from 'lodash.debounce';
import { usePokemon } from '@/composables/use-pokemon';
import DraggableModal from '@/components/modal/draggable-modal.vue';
import { ref, watch } from 'vue';
import { SORT_VALUES } from '@/utils/constants';
import { SortTypes } from '@/utils/types/SortTypes';
import { CheckIcon } from '@heroicons/vue/solid';

const route = useRoute();
const { replace } = useRouter();
const { filteredPokemonList, favoritesLength, teamLength } = usePokemon();

const sortModalOpen = ref(false);
const sort = ref(route.query.sort ?? '');

watch(
  () => route.query,
  (newValue) => {
    sort.value = newValue.sort as string;
  },
  {
    deep: true,
  }
);

const onChange = debounce(async (value: string) => {
  await replace({
    query: {
      ...route.query,
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
  sort.value = value;

  replace({
    query: {
      ...route.query,
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
      :value="route.query.q || ''"
      placeholder="Pokemon zoeken"
      type="text"
      @onInputChange="onChange"
    />
  </header>

  <div class="mb-5 grid grid-cols-2 gap-2">
    <PokemonGroupLink
      :subtitle="`${teamLength} pokemon`"
      class="card__team"
      title="Mijn team"
      to="/team"
    />
    <PokemonGroupLink
      :subtitle="`${favoritesLength} pokemon`"
      class="card__favorites"
      title="Favorieten"
      to="/favorites"
    />
  </div>

  <div v-if="filteredPokemonList.length" class="mb-4">
    <div class="flex flex-col gap-2.5">
      <PokemonCard
        v-for="pokemon in filteredPokemonList"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>

    <transition name="fade">
      <DraggableModal
        v-if="sortModalOpen"
        title="Sorteren op"
        @onClose="sortModalOpen = false"
        @onSubmitClick="changeSort"
      >
        <div class="flex flex-col gap-2">
          <button
            v-for="sortValue in SORT_VALUES"
            :key="sortValue.value"
            :class="{
              'border-2 border-emerald-400': sortValue.value === sort,
            }"
            class="flex w-full items-center justify-between rounded-lg bg-gray-100 p-2 px-4 transition-all"
            @click="onSortChangeClick(sortValue.value)"
          >
            <span>
              <span class="mr-2 inline-block" v-html="sortValue.icon"></span>

              <span>
                {{ sortValue.title }}
              </span>
            </span>

            <transition name="fade">
              <CheckIcon
                v-if="sortValue.value === sort"
                class="h-6 w-6 text-emerald-400"
              />
            </transition>
          </button>
        </div>
      </DraggableModal>
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
