<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { usePokemon } from '@/composables/use-pokemon';
import { ChevronLeftIcon } from '@heroicons/vue/solid';
import { HeartIcon } from '@heroicons/vue/outline';
import Container from '@/components/common/container.vue';
import PokemonDetailBox from '@/components/pokemon/detail-box.vue';
import PokemonInfoLine from '@/components/pokemon/info-line.vue';
import PokemonInfoLineStat from '@/components/pokemon/info-line-stat.vue';
import ButtonPrimary from '@/components/common/button/primary.vue';
import Tag from '@/components/common/tag.vue';
import { capitalize, getPokemonLabelColor } from '@/utils/helpers';
import { onBeforeUnmount, onMounted } from 'vue';
import Loader from '@/components/common/loader.vue';

onMounted(() => {
  document.body.style.background = '#7ECD8B';
});

onBeforeUnmount(() => {
  document.body.style.background = '';
});

const { params } = useRoute();
const {
  pokemon,
  loading,
  toggleFavoritePokemon,
  toggleTeamPokemon,
  isPokemonFavorite,
  isPokemonInTeam,
} = usePokemon(Number(params.id));

const onFavoriteClick = () => {
  toggleFavoritePokemon(pokemon.value);
};

const onAddToTeamClick = () => {
  toggleTeamPokemon(pokemon.value);
};

// TODO: https://apexcharts.com/docs/chart-types/radar/
</script>

<template>
  <div v-if="loading" class="p-4">
    <Loader :loading="loading" />
  </div>

  <Container v-else-if="Object.keys(pokemon).length" class="py-4">
    <header class="mb-3 flex items-center justify-between">
      <router-link :to="{ name: 'home' }" class="flex items-center">
        <ChevronLeftIcon class="h-8 w-8 text-white" />
        <p class="text-white">Terug</p>
      </router-link>

      <HeartIcon
        :class="{ 'fill-white': isPokemonFavorite(pokemon) }"
        class="h-8 w-8 text-white"
        @click="onFavoriteClick"
      />
    </header>

    <div>
      <h1 v-if="pokemon.name" class="mb-4 text-3xl font-bold text-white">
        {{ capitalize(pokemon.name) }}
      </h1>

      <section
        class="relative flex w-full snap-x snap-mandatory gap-6 overflow-x-auto"
      >
        <img
          :alt="`front of ${pokemon.name}`"
          :src="pokemon.sprites.front_default"
          class="w-80 shrink-0 snap-center"
        />
        <img
          :alt="`back of ${pokemon.name}`"
          :src="pokemon.sprites.back_default"
          class="w-80 shrink-0 snap-center"
        />
        <img
          :alt="`front shiny of ${pokemon.name}`"
          :src="pokemon.sprites.front_shiny"
          class="w-80 shrink-0 snap-center"
        />
        <img
          :alt="`back shiny of ${pokemon.name}`"
          :src="pokemon.sprites.back_shiny"
          class="w-80 shrink-0 snap-center"
        />
      </section>

      <PokemonDetailBox class="mb-7" title="Info">
        <div class="flex flex-col gap-4">
          <PokemonInfoLine value-key="Type">
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
          </PokemonInfoLine>

          <PokemonInfoLine value-key="Nummer">
            {{ pokemon.id.toString().padStart(3, '0') }}
          </PokemonInfoLine>

          <PokemonInfoLine value-key="Hoogte">
            {{ pokemon.height / 10 }} m
          </PokemonInfoLine>

          <PokemonInfoLine value-key="Gewicht">
            {{ pokemon.weight / 10 }} kg
          </PokemonInfoLine>

          <PokemonInfoLine value-key="Vaardigheden">
            {{ pokemon.abilities.map((a) => a.ability.name).join(', ') }}
          </PokemonInfoLine>
        </div>
      </PokemonDetailBox>

      <PokemonDetailBox title="Statistieken">
        <div class="flex flex-col gap-2">
          <PokemonInfoLineStat
            v-for="stat in pokemon.stats"
            :key="stat.stat.name"
            :stat="stat.base_stat"
            :value-key="stat.stat.name"
          />
        </div>
      </PokemonDetailBox>
    </div>

    <ButtonPrimary
      class="fixed inset-x-4 bottom-8 w-auto"
      @click="onAddToTeamClick"
      >{{ isPokemonInTeam(pokemon) ? 'Verwijderen van' : 'Toevoegen aan' }} mijn
      team</ButtonPrimary
    >
  </Container>
</template>

<style scoped></style>
