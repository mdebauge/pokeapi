"use client";

import React from "react";
import PokeAPI, { Generation, Pokemon, PokemonList } from "../PokeAPI";

type PokemonContextType = {
  getPokemon: (nameOrId: string | number) => Promise<Pokemon>;
  listPokemon: (limit?: number, offset?: number) => Promise<PokemonList>;
  getGeneration: (nameOrId: string | number) => Promise<Generation>;
  loading: boolean;
  error: Error | null;
};

export const PokemonContext = React.createContext<
  PokemonContextType | undefined
>(undefined);

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  // Move API instance to useRef to maintain reference across renders
  const apiRef = React.useRef(new PokeAPI());

  const getPokemon = React.useCallback(async (nameOrId: string | number) => {
    try {
      setLoading(true);
      setError(null);
      return await apiRef.current.getPokemon(nameOrId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listPokemon = React.useCallback(
    async (limit?: number, offset?: number) => {
      try {
        setLoading(true);
        setError(null);
        return await apiRef.current.listPokemon({ limit, offset });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getGeneration = React.useCallback(
    async (generation: string | number) => {
      try {
        setLoading(true);
        setError(null);
        return await apiRef.current.getGeneration(generation);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = React.useMemo(
    () => ({
      getPokemon,
      listPokemon,
      getGeneration,
      loading,
      error,
    }),
    [getPokemon, listPokemon, getGeneration, loading, error]
  );

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}
