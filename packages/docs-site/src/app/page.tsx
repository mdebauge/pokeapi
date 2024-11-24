"use client";

import SectionHeading from "@/components/section-heading";
import Subhead from "@/components/subhead";
import { highlightCode } from "@/lib/code-highlighter";
import { usePokemon } from "pokeapi-sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [sdkLinkCode, setSdkLinkCode] = useState<string>("");
  const [projectLinkCode, setProjectLinkCode] = useState<string>("");
  const [projectPackageJson, setProjectPackageJson] = useState<string>("");
  const [projectPackageJsonPath, setProjectPackageJsonPath] =
    useState<string>("");
  const [pokemonProviderCode, setPokemonProviderCode] = useState<string>("");
  const [pokemonDataCode, setPokemonDataCode] = useState<string>("");

  const {
    pokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemon("pikachu");

  useEffect(() => {
    let isSubscribed = true;

    async function initializeHighlightedCode() {
      try {
        const [
          sdkLinkCodeHighlighted,
          projectLinkCodeHighlighted,
          projectPackageJsonHighlighted,
          projectPackageJsonPathHighlighted,
          pokemonProviderCodeHighlighted,
          pokemonDataCodeHighlighted,
        ] = await Promise.all([
          highlightCode(`npm link`, "bash"),
          highlightCode(`npm link pokeapi-sdk`, "bash"),
          highlightCode(
            `{
    "dependencies": {
      "pokeapi-sdk": "^1.0.0",
    }
}`,
            "json"
          ),
          highlightCode(
            `{
  "dependencies": {
    "pokeapi-sdk": "file:../path/to/pokeapi-sdk",
  }
}`,
            "json"
          ),
          highlightCode(
            `//layout.tsx
import { PokemonProvider } from "pokeapi-sdk";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </body>
      </html>
    );
}`,
            "typescript",
            { highlights: [2, 12, 14] }
          ),
          highlightCode(
            `//page.tsx
import { usePokemon } from "pokeapi-sdk";

export default function Component() {
  const { pokemon, loading, error } = usePokemon("pikachu");
  return <>
  {loading && <p>Loading...</p>}
  {error && <p>Error: {error.message}</p>}
  {pokemon && <p>Pokemon: {pokemon.name}</p>}
  </>;
}`,
            "typescript",
            { highlights: [2, 5, 7, 8, 9] }
          ),
        ]);

        if (isSubscribed) {
          setSdkLinkCode(sdkLinkCodeHighlighted);
          setProjectLinkCode(projectLinkCodeHighlighted);
          setProjectPackageJson(projectPackageJsonHighlighted);
          setProjectPackageJsonPath(projectPackageJsonPathHighlighted);
          setPokemonProviderCode(pokemonProviderCodeHighlighted);
          setPokemonDataCode(pokemonDataCodeHighlighted);
        }
      } catch (error) {
        console.error("Failed to highlight code:", error);
      }
    }

    initializeHighlightedCode();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className="pt-6 pb-40 px-8 max-w-4xl">
      <Subhead>Overview</Subhead>
      <SectionHeading>Introduction</SectionHeading>
      <p className="mt-4">
        This is a simple TypeScript SDK for fetching Pokemon data from the
        PokeAPI. It&apos;s designed to be used in Next.js projects.
      </p>{" "}
      {pokemonLoading && <p>Loading...</p>}
      {pokemonError && <p>Error: {pokemonError.message}</p>}
      {pokemon && <p>Loaded Pokemon: {pokemon.name}</p>}
      <Subhead className="mt-16">Getting Started</Subhead>
      <SectionHeading>Installation</SectionHeading>
      <div className="mt-4">
        <p>
          Since this is not a published package yet, you&apos;ll need to clone
          the repository and install the SDK locally. There are two ways to do
          this.
        </p>
        <div className="mt-4 p-6 border border-zinc-800 rounded-xl">
          <p className="mb-2 text-lg font-bold">Option 1: Use npm link</p>
          <p>In your pokeapi-sdk root directory, run:</p>
          <div
            className="my-4 rounded-md overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sdkLinkCode }}
          />
          <p>Then in your project, run:</p>
          <div
            className="my-4 rounded-md overflow-hidden"
            dangerouslySetInnerHTML={{ __html: projectLinkCode }}
          />
          <p>Make sure your package.json has the SDK as a dependency.</p>
          <div
            className="my-4 rounded-md overflow-hidden"
            dangerouslySetInnerHTML={{ __html: projectPackageJson }}
          />
        </div>
        <div className="mt-4 p-6 border border-zinc-800 rounded-xl">
          <p className="mb-2 text-lg font-bold">Option 2: Use file path</p>
          <p>
            In your package.json, add the SDK as a dependency using the relative
            or absolute file path.
          </p>
          <div
            className="my-4 rounded-md overflow-hidden"
            dangerouslySetInnerHTML={{ __html: projectPackageJsonPath }}
          />
        </div>
      </div>
      <Subhead className="mt-16">Getting Started</Subhead>
      <SectionHeading>Quick Start</SectionHeading>
      <div className="mt-4">
        <p>
          To get started, you&apos;ll need to include the PokemonProvider in
          your app. Go to your Next.js layout file and import and wrap your main
          content in the PokemonProvider component.
        </p>
        <div
          className="my-4 rounded-md overflow-hidden"
          dangerouslySetInnerHTML={{ __html: pokemonProviderCode }}
        />
        <p className="mt-4">
          Now you can use one of the hooks in your app to fetch Pokemon data.
          For example:
        </p>
        <div
          className="my-4 rounded-md overflow-hidden"
          dangerouslySetInnerHTML={{ __html: pokemonDataCode }}
        />
      </div>
    </div>
  );
}
