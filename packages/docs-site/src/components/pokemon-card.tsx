"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePokemon } from "pokeapi-sdk";

type PokemonCardProps = {
  pokemonName: string;
  className?: string;
};

export default function PokemonCard({
  pokemonName,
  className,
}: PokemonCardProps) {
  const { pokemon, loading, error } = usePokemon(pokemonName);
  return (
    <div
      className={cn(
        "flex flex-col w-64 h-80 bg-black/5 backdrop-blur-md border border-zinc-600 rounded-xl p-4 transition-all duration-200",
        className
      )}
    >
      {pokemon && (
        <>
          <div className="w-full overflow-hidden bg-gradient-to-br from-zinc-800/20 to-zinc-800 rounded-md px-4">
            <Image
              className="w-full"
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={100}
              height={100}
            />
          </div>
          <p className="text-xl font-bold mt-2">
            {pokemon.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
          <p className="text-xs font-semibold text-zinc-400">
            {pokemon.types
              .map((type) => type.type.name)
              .join(", ")
              .toUpperCase()}
          </p>
        </>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
