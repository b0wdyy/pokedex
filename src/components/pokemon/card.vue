<script lang="ts" setup>
import { IPokemon } from '@/utils/interfaces/IPokemon';
import Tag from '../form/tag.vue';
import { svg } from '@/utils/svg';
import { capitalize, getPokemonLabelColor } from '@/utils/helpers';

const props = defineProps<{
  pokemon: IPokemon;
}>();

const to = `/pokemon/${props.pokemon.id}`;
</script>

<template>
  <router-link :to="to" class="card flex items-center">
    <img
      class="h-14 w-14 object-cover"
      :src="pokemon.sprites.front_default"
      :alt="`picture of ${pokemon.name}`"
    />

    <div class="flex w-full items-start">
      <div class="flex-1">
        <h3 class="font-bold">
          {{ pokemon.name }}
        </h3>
        <p class="text-gray-400">Nr. {{ pokemon.id }}</p>
      </div>

      <div class="flex gap-2">
        <tag
          v-for="type in pokemon.types"
          :key="type.slot"
          :style="{
            backgroundColor: getPokemonLabelColor(type.type.name),
          }"
        >
          {{ capitalize(type.type.name) }}
        </tag>
      </div>
    </div>

    <div v-html="svg.chevronRight" />
  </router-link>
</template>

<style>
.card {
  @apply rounded-lg px-4 py-2;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.04);
}
</style>
