<script lang="ts" setup>
import { IPokemon } from '@/utils/interfaces/IPokemon';
import Tag from '../common/tag.vue';
import { svg } from '@/utils/svg';
import { capitalize, getPokemonLabelColor } from '@/utils/helpers';

defineProps<{
  pokemon: IPokemon;
}>();
</script>

<template>
  <router-link
    :to="`/pokemon/${pokemon.id}`"
    class="card flex items-center bg-white"
  >
    <img
      :alt="`picture of ${pokemon.name}`"
      :src="pokemon.sprites.front_default"
      class="mr-4 h-14 w-14 object-cover"
      loading="lazy"
    />

    <div class="flex w-full items-start">
      <div class="flex-1">
        <h3 class="font-bold">
          {{ pokemon.name }}
        </h3>
        <p class="text-gray-400">Nr. {{ pokemon.id }}</p>
      </div>

      <div class="flex gap-2">
        <Tag
          v-for="type in pokemon.types"
          :key="type.slot"
          :style="{
            backgroundColor: getPokemonLabelColor(type.type.name),
          }"
        >
          {{ capitalize(type.type.name) }}
        </Tag>
      </div>
    </div>

    <div v-html="svg.chevronRight" />
  </router-link>
</template>

<style>
.card {
  @apply rounded-lg px-4 py-2;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.05);
}
</style>
