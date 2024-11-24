# PokeAPI SDK for Next.js Projects

This is a simple TypeScript SDK for fetching Pokemon data from the PokeAPI. It's designed to be used in Next.js projects.

## Installation

Since this is not a published package yet, you'll need to clone the repository and install the SDK locally. There are two ways to do this.

### Option 1: Use npm link

In your pokeapi-sdk root directory, run:

```bash
npm link
```

Then in your project, run:

```bash
npm link pokeapi-sdk
```

Make sure your package.json has the SDK as a dependency.

```json
"dependencies": {
  "pokeapi-sdk": "^1.0.0"
}
```

### Option 2: Use file path

In your package.json, add the SDK as a dependency using the relative or absolute file path.

```json
"dependencies": {
  "pokeapi-sdk": "file:../path/to/pokeapi-sdk"
}
```

## Quick Start

To get started, you'll need to include the PokemonProvider in your app. Go to your Next.js layout file and import and wrap your main content in the PokemonProvider component.

```tsx
//layout.tsx
import { PokemonProvider } from "pokeapi-sdk";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PokemonProvider>{children}</PokemonProvider>
      </body>
    </html>
  );
}
```

Now you can use one of the hooks in your app to fetch Pokemon data. For example:

```tsx
//page.tsx
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
}
```

##API Documentation

<!-- API_DOCS_START -->

**pokeapi-sdk** • **Docs**

---

# pokeapi-sdk

## Classes

- [PokeAPI](docs/classes/PokeAPI.md)

## Interfaces

- [PokeAPIConfig](docs/interfaces/PokeAPIConfig.md)

## Type Aliases

- [Generation](docs/type-aliases/Generation.md)
- [Pokemon](docs/type-aliases/Pokemon.md)
- [PokemonList](docs/type-aliases/PokemonList.md)

## Functions

- [PokemonProvider](docs/functions/PokemonProvider.md)
- [useGeneration](docs/functions/useGeneration.md)
- [usePokemon](docs/functions/usePokemon.md)
- [usePokemonList](docs/functions/usePokemonList.md)

<!-- API_DOCS_END -->
