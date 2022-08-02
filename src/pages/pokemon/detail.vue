<script lang="ts" setup>
import { usePokemon } from '@/composables/use-pokemon';
import { HeartIcon } from '@heroicons/vue/outline';
import Container from '@/components/common/container.vue';
import PokemonCard from '@/components/pokemon/card.vue';
import PokemonDetailBox from '@/components/pokemon/detail-box.vue';
import PokemonInfoLine from '@/components/pokemon/info-line.vue';
import ButtonPrimary from '@/components/common/button/primary.vue';
import Tag from '@/components/common/tag.vue';
import {
  capitalize,
  getPokemonLabelColor,
  getPokemonStatTranslation,
} from '@/utils/helpers';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { POKEMON_PAGE_COLORS } from '@/utils/constants';
import 'swiper/css';
import BackButton from '@/components/common/back-button.vue';

const CHART_OPTIONS = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};

const {
  pokemon,
  evolutions,
  toggleFavoritePokemon,
  toggleTeamPokemon,
  isPokemonFavorite,
  isPokemonInTeam,
} = usePokemon();

const onFavoriteClick = () => {
  toggleFavoritePokemon(pokemon.value);
};

const onAddToTeamClick = () => {
  toggleTeamPokemon(pokemon.value);
};

// TODO: https://apexcharts.com/docs/chart-types/radar/
</script>

<template>
  <Container
    v-if="Object.keys(pokemon).length"
    :class="POKEMON_PAGE_COLORS[pokemon.color]"
    class="min-h-screen py-4 pb-24 md:pb-0"
  >
    <header class="mb-3 flex items-center justify-between">
      <BackButton to="/" />

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

      <section class="relative">
        <Swiper :edge-swipe-threshold="80" :grab-cursor="true">
          <SwiperSlide
            v-for="img in [
              pokemon.sprites.front_default,
              pokemon.sprites.back_default,
              pokemon.sprites.front_shiny,
              pokemon.sprites.back_shiny,
            ]"
            :key="img"
          >
            <img :src="img" alt="alt" class="w-full" />
          </SwiperSlide>
        </Swiper>
      </section>

      <section class="space-y-7">
        <PokemonDetailBox title="Info">
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
          <div class="flex items-center justify-center">
            <apexchart
              :options="{
                ...CHART_OPTIONS,
                xaxis: {
                  categories: pokemon.stats.map((stat) =>
                    getPokemonStatTranslation(stat.stat.name)
                  ),
                },
              }"
              :series="[
                {
                  name: 'Stats',
                  data: pokemon.stats.map((stat) => stat.base_stat),
                },
              ]"
              type="radar"
              width="500"
            ></apexchart>
          </div>
        </PokemonDetailBox>

        <div v-if="evolutions.length">
          <h4 class="mb-2 text-sm font-bold uppercase text-white">Evolutie</h4>

          <div class="flex flex-col gap-2.5">
            <PokemonCard
              v-for="evolution in evolutions"
              :key="evolution.id"
              :class="{ 'bg-opacity-50': evolution.id !== pokemon.id }"
              :pokemon="evolution"
            />
          </div>
        </div>
      </section>
    </div>

    <ButtonPrimary
      class="fixed inset-x-4 bottom-8 w-auto md:static md:my-8 md:w-full"
      @click="onAddToTeamClick"
      >{{ isPokemonInTeam(pokemon) ? 'Verwijderen van' : 'Toevoegen aan' }} mijn
      team</ButtonPrimary
    >
  </Container>
</template>

<style scoped></style>
