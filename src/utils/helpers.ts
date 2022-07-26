import { POKEMONCOLORS } from '@/utils/constants';
import { PokemonTypes } from '@/utils/types/PokemonTypes';

export const getPokemonLabelColor = (pokemonType: PokemonTypes): string => {
  return POKEMONCOLORS[pokemonType];
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
