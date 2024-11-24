# PokeAPI SDK

This is a simple TypeScript SDK for fetching Pokemon data from the PokeAPI. It's designed to be used in Next.js projects. It provides a context provider and hooks to access the Poke-data, allowing you to just focus on building your awesome app.

### Decision & Benefits

- Centralized state management for Pokemon data and shared API instance across components so you can avoid prop drilling.
- Reusable hooks for fetching Pokemon data, generation data, and list of Pokemon.
- Built-in loading and error states for each hook.
- TypeScript types for Pokemon, PokemonList, and Generation data, letting you access suggestions and information about the Pokemon data.

### Roadmap (Some things that could be expanded on)

- Continue building out the types to cover all data.
- Add more hooks for other PokeAPI endpoints (evolution chains, etc.)
- Add exported utility functions for common tasks needed when working with Pokemon data like: formatting Pokemon names, color variables mapped to Pokemon types, etc.

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

## Testing

To run the SDK tests, navigate to the `pokeapi-sdk` root directory and run:

```bash
npm test
```

## API Documentation

<!-- API_DOCS_START -->

**pokeapi-sdk** • **Docs**

---

# pokeapi-sdk

## Classes

- [PokeAPI](docs/classes/PokeAPI.md)

## Type Aliases

- [Generation](docs/type-aliases/Generation.md)
- [PokeAPIConfig](docs/type-aliases/PokeAPIConfig.md)
- [Pokemon](docs/type-aliases/Pokemon.md)
- [PokemonList](docs/type-aliases/PokemonList.md)

## Functions

- [PokemonProvider](docs/functions/PokemonProvider.md)
- [useGeneration](docs/functions/useGeneration.md)
- [usePokemon](docs/functions/usePokemon.md)
- [usePokemonList](docs/functions/usePokemonList.md)

<!-- API_DOCS_END -->
