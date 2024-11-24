[**pokeapi-sdk**](../README.md) • **Docs**

***

[pokeapi-sdk](../README.md) / PokeAPI

# Class: PokeAPI

Client for interacting with the Pokemon API
 PokeAPI

## Example

```typescript
const api = new PokeAPI();
const pikachu = await api.getPokemon('pikachu');
```

## Constructors

### new PokeAPI()

> **new PokeAPI**(`config`?): [`PokeAPI`](PokeAPI.md)

Creates a new PokeAPI instance

#### Parameters

• **config?**: [`PokeAPIConfig`](../type-aliases/PokeAPIConfig.md)

Optional configuration options

#### Returns

[`PokeAPI`](PokeAPI.md)

#### Defined in

[PokeAPI.ts:70](https://github.com/mdebauge/pokeapi/blob/bda097c5f0bf5f38c8f60e454f9081d34fd75200/packages/pokeapi-sdk/src/PokeAPI.ts#L70)

## Methods

### getGeneration()

> **getGeneration**(`generation`): `Promise`\<[`Generation`](../type-aliases/Generation.md)\>

#### Parameters

• **generation**: `string` \| `number`

#### Returns

`Promise`\<[`Generation`](../type-aliases/Generation.md)\>

#### Defined in

[PokeAPI.ts:132](https://github.com/mdebauge/pokeapi/blob/bda097c5f0bf5f38c8f60e454f9081d34fd75200/packages/pokeapi-sdk/src/PokeAPI.ts#L132)

***

### getPokemon()

> **getPokemon**(`nameOrId`): `Promise`\<[`Pokemon`](../type-aliases/Pokemon.md)\>

Fetches a Pokemon by name or ID

#### Parameters

• **nameOrId**: `string` \| `number`

The name or ID of the Pokemon

#### Returns

`Promise`\<[`Pokemon`](../type-aliases/Pokemon.md)\>

Promise containing the Pokemon data

#### Throws

Will throw an error if the Pokemon is not found

#### Example

```typescript
const api = new PokeAPI();
const pikachu = await api.getPokemon('pikachu');
console.log(pikachu.name); // 'pikachu'
```

#### Defined in

[PokeAPI.ts:103](https://github.com/mdebauge/pokeapi/blob/bda097c5f0bf5f38c8f60e454f9081d34fd75200/packages/pokeapi-sdk/src/PokeAPI.ts#L103)

***

### listPokemon()

> **listPokemon**(`options`?): `Promise`\<[`PokemonList`](../type-aliases/PokemonList.md)\>

Lists Pokemon with pagination

#### Parameters

• **options?**

Pagination options

• **options.limit?**: `number`

Number of Pokemon to return (default: 20)

• **options.offset?**: `number`

Number of Pokemon to skip (default: 0)

#### Returns

`Promise`\<[`PokemonList`](../type-aliases/PokemonList.md)\>

Promise containing the paginated Pokemon list

#### Example

```typescript
const api = new PokeAPI();
const list = await api.listPokemon({ limit: 10 });
console.log(list.results.length); // 10
```

#### Defined in

[PokeAPI.ts:122](https://github.com/mdebauge/pokeapi/blob/bda097c5f0bf5f38c8f60e454f9081d34fd75200/packages/pokeapi-sdk/src/PokeAPI.ts#L122)
