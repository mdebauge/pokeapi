"use client";

import SectionHeading from "@/components/section-heading";
import Subhead from "@/components/subhead";
import { Badge } from "@/components/ui/badge";
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
  const [pokemonListCode, setPokemonListCode] = useState<string>("");
  const [generationCode, setGenerationCode] = useState<string>("");
  const [testCommand, setTestCommand] = useState<string>("");
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
          pokemonListCodeHighlighted,
          generationCodeHighlighted,
          testCommandHighlighted,
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
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {pokemon && <p>Pokemon: {pokemon.name}</p>}
    </>
  );
}`,
            "typescript",
            { highlights: [2, 5, 8, 9, 10] }
          ),
          highlightCode(
            `//page.tsx
import { usePokemonList } from "pokeapi-sdk";

export default function Component() {
  const { pokemonList, loading, error } = usePokemonList(0);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {pokemonList && <p>Pokemon List: {pokemonList.length}</p>}
    </>
  );
}`,
            "typescript",
            { highlights: [2, 5, 8, 9, 10] }
          ),
          highlightCode(
            `//page.tsx
import { useGeneration } from "pokeapi-sdk";

export default function Component() {
  const { generation, loading, error } = useGeneration("generation-i");
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {generation && <p>Generation: {generation.name}</p>}
    </>
  );
}`,
            "typescript",
            { highlights: [2, 5, 8, 9, 10] }
          ),
          highlightCode(`npm test`, "bash"),
        ]);

        if (isSubscribed) {
          setSdkLinkCode(sdkLinkCodeHighlighted);
          setProjectLinkCode(projectLinkCodeHighlighted);
          setProjectPackageJson(projectPackageJsonHighlighted);
          setProjectPackageJsonPath(projectPackageJsonPathHighlighted);
          setPokemonProviderCode(pokemonProviderCodeHighlighted);
          setPokemonDataCode(pokemonDataCodeHighlighted);
          setPokemonListCode(pokemonListCodeHighlighted);
          setGenerationCode(generationCodeHighlighted);
          setTestCommand(testCommandHighlighted);
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
      <h1 className="text-4xl font-bold">PokeAPI SDK</h1>
      <Subhead>Overview</Subhead>
      <SectionHeading id="introduction">Introduction</SectionHeading>
      <p className="mt-4">
        This is a simple TypeScript SDK for fetching Pokemon data from the
        PokeAPI. It&apos;s designed to be used in Next.js projects.
      </p>{" "}
      {pokemonLoading && <p>Loading...</p>}
      {pokemonError && <p>Error: {pokemonError.message}</p>}
      {pokemon && <p>Loaded Pokemon: {pokemon.name}</p>}
      <Subhead className="mt-16">Getting Started</Subhead>
      <SectionHeading id="installation">Installation</SectionHeading>
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
      <SectionHeading id="quick-start">Quick Start</SectionHeading>
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
      <Subhead className="mt-16">Reference</Subhead>
      <SectionHeading id="hooks">Hooks</SectionHeading>
      <h4 className="my-4 text-xl font-bold">usePokemon</h4>
      <div>
        The <Badge variant="outline">usePokemon</Badge> hook fetches a Pokemon
        by name or ID. It returns the Pokemon data, a boolean indicating if the
        data is loading, and an error if there was an issue fetching the data.
      </div>
      <h5 className="my-4 text-base font-semibold">Parameters</h5>
      <div>
        <Badge variant="outline">nameOrId</Badge> - The name{" "}
        <Badge variant="outline">string</Badge> or ID{" "}
        <Badge variant="outline">number</Badge> of the Pokemon to fetch.
      </div>
      <h5 className="my-4 text-base font-semibold">Returns</h5>
      <div>
        An object with the following properties:
        <ul className="mt-2 space-y-1">
          <li>
            <Badge variant="outline">pokemon</Badge> - The Pokemon data.
          </li>
          <li>
            <Badge variant="outline">loading</Badge> - A boolean indicating if
            the data is loading.
          </li>
          <li>
            <Badge variant="outline">error</Badge> - An error if there was an
            issue fetching the data.
          </li>
        </ul>
      </div>
      <h5 className="my-4 text-base font-semibold">Example</h5>
      <div
        className="my-4 rounded-md overflow-hidden"
        dangerouslySetInnerHTML={{ __html: pokemonDataCode }}
      />
      <h4 className="my-4 text-xl font-bold">usePokemonList</h4>
      <div>
        The <Badge variant="outline">usePokemonList</Badge> hook fetches a list
        of Pokemon.
      </div>
      <h5 className="my-4 text-base font-semibold">Parameters</h5>
      <div>
        <ul className="mt-2 space-y-1">
          <li>
            <Badge variant="outline">offset</Badge> - The offset{" "}
            <Badge variant="outline">number</Badge> to start the list from.
          </li>
          <li>
            <Badge variant="outline">limit</Badge> - The maximum{" "}
            <Badge variant="outline">number</Badge> of Pokemon to return.
          </li>
        </ul>
      </div>
      <h5 className="my-4 text-base font-semibold">Returns</h5>
      <div>
        An object with the following properties:
        <ul className="mt-2 space-y-1">
          <li>
            <Badge variant="outline">pokemonList</Badge> - The list of Pokemon.
          </li>
          <li>
            <Badge variant="outline">loading</Badge> - A boolean indicating if
            the data is loading.
          </li>
          <li>
            <Badge variant="outline">error</Badge> - An error if there was an
            issue fetching the data.
          </li>
        </ul>
      </div>
      <h5 className="my-4 text-base font-semibold">Example</h5>
      <div
        className="my-4 rounded-md overflow-hidden"
        dangerouslySetInnerHTML={{ __html: pokemonListCode }}
      />
      <h4 className="my-4 text-xl font-bold">useGeneration</h4>
      <div>
        The <Badge variant="outline">useGeneration</Badge> hook fetches a
        generation by name or ID.
      </div>
      <h5 className="my-4 text-base font-semibold">Parameters</h5>
      <div>
        <Badge variant="outline">nameOrId</Badge> - The name{" "}
        <Badge variant="outline">string</Badge> or ID{" "}
        <Badge variant="outline">number</Badge> of the generation to fetch.
      </div>
      <h5 className="my-4 text-base font-semibold">Returns</h5>
      <div>
        An object with the following properties:
        <ul className="mt-2 space-y-1">
          <li>
            <Badge variant="outline">generation</Badge> - The generation data.
          </li>
          <li>
            <Badge variant="outline">loading</Badge> - A boolean indicating if
            the data is loading.
          </li>
          <li>
            <Badge variant="outline">error</Badge> - An error if there was an
            issue fetching the data.
          </li>
        </ul>
      </div>
      <h5 className="my-4 text-base font-semibold">Example</h5>
      <div
        className="my-4 rounded-md overflow-hidden"
        dangerouslySetInnerHTML={{ __html: generationCode }}
      />
      <Subhead className="mt-16">Reference</Subhead>
      <SectionHeading id="testing">Testing</SectionHeading>
      <div className="mt-4">
        <p>
          To run the SDK tests, navigate to the pokeapi-sdk root directory and
          run:
        </p>
        <div
          className="my-4 rounded-md overflow-hidden"
          dangerouslySetInnerHTML={{ __html: testCommand }}
        />
      </div>
    </div>
  );
}
