import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores/PokemonStore';
import { storeToRefs } from 'pinia';

export function usePokemon(id: null | number = null) {
  const { loading, pokemon, filteredPokemonList } = storeToRefs(
    usePokemonStore()
  );
  const { fetchPokemonList, fetchPokemonDetail } = usePokemonStore();

  onMounted(async () => {
    if (id) {
      await fetchPokemonDetail(id);
    } else {
      await fetchPokemonList();
    }
  });

  return { pokemon, loading, filteredPokemonList };
}
