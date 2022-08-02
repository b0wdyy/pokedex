<script lang="ts" setup>
import PokemonCard from '@/components/pokemon/card.vue';
import { usePokemon } from '@/composables/use-pokemon';
import BackButton from '@/components/common/back-button.vue';
import Title from '@/components/common/text/title.vue';

const { teamPokemonList } = usePokemon();
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-r from-purple-800 to-purple-600 px-4 md:px-8"
  >
    <BackButton class="pt-4" to="/" />

    <Title class="mb-6 mt-4" color="text-white" type="h1">Mijn team</Title>

    <template v-if="teamPokemonList.length">
      <section class="flex flex-col gap-2.5">
        <PokemonCard
          v-for="pokemon in teamPokemonList"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </section>
    </template>

    <template v-else>
      <h1 class="pt-4 text-center text-xl font-bold text-white">
        Geen Pokemon in jouw team. Voeg er snel 1 toe!
      </h1>
    </template>
  </div>
</template>
