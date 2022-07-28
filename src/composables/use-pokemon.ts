import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores/PokemonStore';
import { storeToRefs } from 'pinia';

export function usePokemon(id: null | number = null) {
  const {
    loading,
    pokemon,
    pokemonList,
    favoritePokemonList,
    teamPokemonList,
    favoritesLength,
    teamLength,
    isPokemonFavorite,
    isPokemonInTeam,
    filteredPokemonList,
  } = storeToRefs(usePokemonStore());
  const {
    fetchPokemonList,
    fetchPokemonDetail,
    toggleFavoritePokemon,
    toggleTeamPokemon,
  } = usePokemonStore();

  onMounted(async () => {
    if (id) {
      if (pokemon.value?.id !== id) {
        await fetchPokemonDetail(id);
      }
    } else {
      if (!filteredPokemonList.value.length) {
        await fetchPokemonList();
      }
    }
  });

  return {
    pokemon,
    loading,
    favoritePokemonList,
    teamPokemonList,
    pokemonList,
    favoritesLength,
    teamLength,
    filteredPokemonList,
    isPokemonFavorite,
    isPokemonInTeam,
    toggleFavoritePokemon,
    toggleTeamPokemon,
  };
}
