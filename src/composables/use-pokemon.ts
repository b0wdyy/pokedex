import { onMounted, ref } from 'vue';
import axios from 'axios';
import { BASE_URL_DETAIL, BASE_URL_LIST } from '@/utils/constants';

export function usePokemon<T>(id: null | number = null) {
  const pokemon = ref<T>();
  const loading = ref(false);
  const error = ref<any>();

  onMounted(async () => {
    loading.value = true;
    try {
      const response = id
        ? await axios.get(`${BASE_URL_DETAIL}/${id}`)
        : await axios.get(`${BASE_URL_LIST}`);
      pokemon.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  });

  return { pokemon, loading, error };
}
