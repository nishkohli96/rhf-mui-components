import axios from 'axios';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  results: Pokemon[];
  next: string | null;
  previous: string | null;
  count: number;
}

export const fetchPokemons = async (
  limit: number = 50,
  offset: number = 0
): Promise<PokemonResponse> => {
  const response = await axios.get<PokemonResponse>(POKE_API_BASE, {
    params: { limit, offset }
  });

  return response.data;
};
