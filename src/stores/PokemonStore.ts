import { defineStore } from 'pinia';
import { IPokemon } from '@/utils/interfaces/IPokemon';
import { IPokemonDetail } from '@/utils/interfaces/IPokemonDetail';
import { BASE_URL_DETAIL, BASE_URL_LIST } from '@/utils/constants';
import axios from 'axios';
import { useRoute } from 'vue-router';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemon: {} as IPokemonDetail,
    pokemonList: [] as IPokemon[],
    loading: false,
  }),

  actions: {
    async fetchPokemonList() {
      this.loading = true;

      try {
        const { data } = await axios.get(`${BASE_URL_LIST}`);
        this.pokemonList = data;
      } catch (e) {
        console.error({ error: e });
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonDetail(id: number) {
      this.loading = true;

      try {
        const { data } = await axios.get(`${BASE_URL_DETAIL}/${id}`);
        this.pokemon = data;
      } catch (e) {
        console.error({ error: e });
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    filteredPokemonList(state) {
      const {
        query: { q },
      } = useRoute();
      const filter = (q as string) || '';

      return state.pokemonList.filter((pokemon) => {
        return (
          pokemon.name.toLowerCase().includes(filter.toLowerCase()) ||
          pokemon.id.toString() === filter ||
          pokemon.types.some((type) =>
            type.type.name.toLowerCase().includes(filter.toLowerCase())
          )
        );
      });
    },
  },
});
