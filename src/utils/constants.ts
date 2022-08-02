import { svg } from '@/utils/svg';

export const BASE_URL_LIST =
  'https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon';

export const BASE_URL_DETAIL = 'https://pokeapi.co/api/v2';

export const POKEMON_FAVORITE_LIST_KEY = 'favoritePokemonList';

export const POKEMON_TEAM_LIST_KEY = 'teamPokemonList';

export const POKEMONCOLORS = {
  normal: '#A3ACAE',
  fire: '#FD7D25',
  water: '#4592C3',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#BA7EC8',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#7B62A3',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const STATS_TRANSLATION_KEYS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export const SORT_VALUES = [
  {
    title: 'Alfabetisch oplopend',
    icon: svg.sortAlphabeticalAscending,
    value: 'ALPHA_ASC',
  },
  {
    title: 'Alfabetisch aflopen',
    icon: svg.sortAlphabeticalDescending,
    value: 'ALPHA_DESC',
  },
  {
    title: 'Numeriek oplopend',
    icon: svg.sortNumericalAscending,
    value: 'NUM_ASC',
  },
  {
    title: 'Numeriek aflopend',
    icon: svg.sortNumericalDescending,
    value: 'NUM_DESC',
  },
];
