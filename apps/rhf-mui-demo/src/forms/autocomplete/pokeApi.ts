import axios from 'axios';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_IMAGE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export interface PokemonInfo {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface BasePokemonResponse {
  next: string | null;
  previous: string | null;
  count: number;
}

export interface PokemonAPIResponse extends BasePokemonResponse {
  results: PokemonInfo[];
}

export interface PokemonResponse extends BasePokemonResponse {
  results: Pokemon[];
}

export const fetchPokemons = async (
  limit: number = 50,
  offset: number = 0
): Promise<PokemonResponse> => {
  const response = await axios.get<PokemonAPIResponse>(POKE_API_BASE, {
    params: { limit, offset }
  });
  const { results, ...otherData } = response.data ?? {};
  const pokemonsList = (results ?? []).map((pokemon) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return {
      id: Number(id),
      name: pokemon.name,
      image: `${POKEMON_IMAGE_BASE}/${id}.png`
    };
  });
  return {
    results: pokemonsList,
    ...otherData
  };
};
