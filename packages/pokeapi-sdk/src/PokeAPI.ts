import axios from "axios";

export type Pokemon = {
  abilities: [];
  baseExperience: number;
  cries: {};
  forms: [];
  gameIndices: [];
  height: number;
  heldItems: [];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: [];
  name: string;
  order: number;
  species: {};
  sprites: {};
  stats: [];
  types: [];
  weight: number;
};

export type PokemonList = {
  count: number;
  results: { name: string; url: string }[];
};

export type Generation = {
  abilities: [];
  id: number;
  mainRegion: {};
  moves: [];
  name: string;
  names: [];
  pokemonSpecies: [];
  types: [];
  versionGroups: [];
};

/**
 * Configuration options for the Pokemon API client
 * @type PokeAPIConfig
 */
export type PokeAPIConfig = {
  /** Base URL for the API */
  baseUrl?: string;
  /** Timeout in milliseconds */
  timeout?: number;
};

/**
 * Client for interacting with the Pokemon API
 * @class PokeAPI
 *
 * @example
 * ```typescript
 * const api = new PokeAPI();
 * const pikachu = await api.getPokemon('pikachu');
 * ```
 */
export class PokeAPI {
  private baseURL: string;
  private cache: Map<string, any>;

  /**
   * Creates a new PokeAPI instance
   * @param config - Optional configuration options
   */
  constructor(config?: PokeAPIConfig) {
    this.baseURL = config?.baseUrl || "https://pokeapi.co/api/v2/";
    this.cache = new Map();
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    if (this.cache.has(endpoint)) {
      return this.cache.get(endpoint);
    }

    try {
      const response = await axios.get<T>(`${this.baseURL}${endpoint}`);
      this.cache.set(endpoint, response.data);
      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  }

  /**
   * Fetches a Pokemon by name or ID
   *
   * @param nameOrId - The name or ID of the Pokemon
   * @returns Promise containing the Pokemon data
   * @throws Will throw an error if the Pokemon is not found
   *
   * @example
   * ```typescript
   * const api = new PokeAPI();
   * const pikachu = await api.getPokemon('pikachu');
   * console.log(pikachu.name); // 'pikachu'
   * ```
   */
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    return await this.fetch<Pokemon>(`pokemon/${nameOrId}`);
  }

  /**
   * Lists Pokemon with pagination
   *
   * @param options - Pagination options
   * @param options.limit - Number of Pokemon to return (default: 20)
   * @param options.offset - Number of Pokemon to skip (default: 0)
   * @returns Promise containing the paginated Pokemon list
   *
   * @example
   * ```typescript
   * const api = new PokeAPI();
   * const list = await api.listPokemon({ limit: 10 });
   * console.log(list.results.length); // 10
   * ```
   */
  async listPokemon(options?: {
    limit?: number;
    offset?: number;
  }): Promise<PokemonList> {
    return await this.fetch<PokemonList>(
      `pokemon?limit=${options?.limit || 20}&offset=${options?.offset || 0}`
    );
  }

  // Get generation by name or ID
  async getGeneration(generation: string | number): Promise<Generation> {
    return await this.fetch<Generation>(`generation/${generation}`);
  }
}

export default PokeAPI;
