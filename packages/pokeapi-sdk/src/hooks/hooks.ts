import React from "react";
import { PokemonContext } from "../contexts/PokemonProvider";
import { Generation, Pokemon, PokemonList } from "../PokeAPI";

export function usePokemon(nameOrId: string | number) {
  const context = React.useContext(PokemonContext);
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }

  React.useEffect(() => {
    context
      .getPokemon(nameOrId)
      .then(setPokemon)
      .catch(() => setPokemon(null));
  }, [nameOrId, context.getPokemon]);

  return {
    pokemon,
    loading: context.loading,
    error: context.error,
  };
}

export function usePokemonList(limit?: number, offset?: number) {
  const context = React.useContext(PokemonContext);
  const [pokemonList, setPokemonList] = React.useState<PokemonList | null>(
    null
  );

  if (!context) {
    throw new Error("usePokemonList must be used within a PokemonProvider");
  }

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await context.listPokemon(limit, offset);
        if (isMounted) {
          setPokemonList(data);
        }
      } catch (err) {
        if (isMounted) {
          setPokemonList(null);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [limit, offset, context.listPokemon]);

  return {
    pokemonList,
    loading: context.loading,
    error: context.error,
  };
}

export function useGeneration(nameOrId: string | number) {
  const context = React.useContext(PokemonContext);
  const [generation, setGeneration] = React.useState<Generation | null>(null);

  if (!context) {
    throw new Error("useGeneration must be used within a PokemonProvider");
  }

  React.useEffect(() => {
    context
      .getGeneration(nameOrId)
      .then(setGeneration)
      .catch(() => setGeneration(null));
  }, [nameOrId, context.getGeneration]);

  return {
    generation,
    loading: context.loading,
    error: context.error,
  };
}
