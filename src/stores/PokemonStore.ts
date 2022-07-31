import { defineStore } from 'pinia';
import { IPokemon } from '@/utils/interfaces/IPokemon';
import { IPokemonDetail } from '@/utils/interfaces/IPokemonDetail';
import { BASE_URL_DETAIL, BASE_URL_LIST } from '@/utils/constants';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { SortTypes } from '@/utils/types/SortTypes';
import { IChain } from '@/utils/interfaces/IEvolutionChain';

const togglePokemonInList = (
  arrayElement: IPokemonDetail[],
  pokemon: IPokemonDetail
) => {
  const index = arrayElement.findIndex((p) => p.id === pokemon.id);

  if (index === -1) {
    arrayElement.push(pokemon);
  } else {
    arrayElement.splice(index, 1);
  }
};

const checkIfPokemonIsInList = (
  arrayElement: IPokemonDetail[],
  pokemon: IPokemonDetail
) => {
  return arrayElement.some((p) => p.id === pokemon.id);
};

const sortPokemonList = (a: IPokemon, b: IPokemon, sort: SortTypes) => {
  switch (sort) {
    case 'ALPHA_ASC':
      return a.name.localeCompare(b.name);
    case 'ALPHA_DESC':
      return b.name.localeCompare(a.name);
    case 'NUM_ASC':
      return a.id - b.id;
    case 'NUM_DESC':
      return b.id - a.id;
    default:
      return a.id - b.id;
  }
};

const getEvolutionList = async (evolutionChain: IChain) => {
  const evolutionList: any[] = [];

  const addEvolution = async (evolution: IChain) => {
    const { data } = await axios.get(evolution.species.url);
    const { data: pokemon } = await axios.get(
      `${BASE_URL_DETAIL}/pokemon/${data.id}`
    );
    evolutionList.push({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      sprites: { front_default: pokemon.sprites.front_default },
    });

    if (evolution.evolves_to) {
      for (let i = 0; i < evolution.evolves_to.length; i++) {
        await addEvolution(evolution.evolves_to[i]);
      }
    }
  };

  await addEvolution(evolutionChain);

  return evolutionList;
};

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemon: {} as IPokemonDetail,
    evolutions: [] as IPokemon[],
    pokemonList: [] as IPokemon[],
    favoritePokemonList: [] as IPokemonDetail[],
    teamPokemonList: [] as IPokemonDetail[],
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
        const { data: pokemon } = await axios.get(
          `${BASE_URL_DETAIL}/pokemon/${id}`
        );
        const { data: species } = await axios.get(pokemon.species.url);
        const { data: evolutions } = await axios.get(
          species.evolution_chain.url
        );

        this.evolutions = await getEvolutionList(evolutions.chain);
        this.pokemon = pokemon;
      } catch (e) {
        console.error({ error: e });
      } finally {
        this.loading = false;
      }
    },

    toggleFavoritePokemon(pokemon: IPokemonDetail) {
      togglePokemonInList(this.favoritePokemonList, pokemon);
    },

    toggleTeamPokemon(pokemon: IPokemonDetail) {
      if (this.teamLength < 6) {
        togglePokemonInList(this.teamPokemonList, pokemon);
      } else {
        alert('You can only have 6 pokemon in your team');
      }
    },
  },

  getters: {
    filteredPokemonList(state) {
      const route = useRoute();
      const filter = (route?.query?.q as string) ?? '';
      const sort = (route?.query?.sort as SortTypes) ?? 'NUM_ASC';

      return state.pokemonList
        .filter((pokemon) => {
          return (
            pokemon.name.toLowerCase().includes(filter.toLowerCase()) ||
            pokemon.id.toString() === filter ||
            pokemon.types.some((type) =>
              type.type.name.toLowerCase().includes(filter.toLowerCase())
            )
          );
        })
        .sort((a, b) => sortPokemonList(a, b, sort));
    },
    isPokemonFavorite(state) {
      return (pokemon: IPokemonDetail) => {
        return checkIfPokemonIsInList(state.favoritePokemonList, pokemon);
      };
    },
    isPokemonInTeam(state) {
      return (pokemon: IPokemonDetail) => {
        return checkIfPokemonIsInList(state.teamPokemonList, pokemon);
      };
    },
    teamLength(state) {
      return state.teamPokemonList.length;
    },
    favoritesLength(state) {
      return state.favoritePokemonList.length;
    },
  },
});
