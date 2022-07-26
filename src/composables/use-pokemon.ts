import { onMounted, ref } from 'vue';
import axios from 'axios';
import { BASE_URL_LIST } from '../utils/constants';
import { IPokemon } from '../utils/interfaces/IPokemon';

export function usePokemon() {
  const pokemon = ref<IPokemon[]>([]);
  const loading = ref(false);
  const error = ref<any>();

  onMounted(async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${BASE_URL_LIST}`);
      pokemon.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  });

  return { pokemon, loading, error };
}
