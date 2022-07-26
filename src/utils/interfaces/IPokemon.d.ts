import { PokemonTypes } from '../types/PokemonTypes';

export interface PokemonType {
  name: PokemonTypes;
}

export interface Sprites {
  front_default: string;
}

export interface Type {
  slot: number;
  type: PokemonType;
}

export interface IPokemon {
  id: number;
  name: string;
  sprites: Sprites;
  types: Type[];
}
