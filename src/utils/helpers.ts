import { POKEMONCOLORS, STATS_TRANSLATION_KEYS } from '@/utils/constants';
import { PokemonTypes } from '@/utils/types/PokemonTypes';

export const getPokemonLabelColor = (pokemonType: PokemonTypes): string => {
  return POKEMONCOLORS[pokemonType];
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPokemonStatTranslation = (
  stat: keyof typeof STATS_TRANSLATION_KEYS
) => {
  return STATS_TRANSLATION_KEYS[stat];
};
