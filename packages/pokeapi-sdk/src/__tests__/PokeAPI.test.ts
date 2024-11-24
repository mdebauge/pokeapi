import PokeAPI from "../PokeAPI";

describe("PokeAPI Integration Tests", () => {
  let api: PokeAPI;

  beforeEach(() => {
    api = new PokeAPI();
  });

  describe("getPokemon", () => {
    it("should fetch Pikachu data correctly", async () => {
      const pokemon = await api.getPokemon("pikachu");

      expect(pokemon).toBeDefined();
      expect(pokemon.name).toBe("pikachu");
      expect(pokemon.id).toBeDefined();
      expect(typeof pokemon.id).toBe("number");
      expect(Array.isArray(pokemon.abilities)).toBe(true);
      expect(Array.isArray(pokemon.types)).toBe(true);
    });

    it("should fetch Pokemon by ID correctly", async () => {
      const pokemon = await api.getPokemon(25); // Pikachu's ID

      expect(pokemon).toBeDefined();
      expect(pokemon.name).toBe("pikachu");
      expect(pokemon.id).toBe(25);
    });

    it("should throw error for invalid Pokemon name", async () => {
      await expect(api.getPokemon("not-a-pokemon")).rejects.toThrow();
    });

    it("should throw error for invalid Pokemon ID", async () => {
      await expect(api.getPokemon(99999)).rejects.toThrow();
    });
  });

  describe("listPokemon", () => {
    it("should fetch Pokemon list with correct pagination", async () => {
      const limit = 10;
      const offset = 0;
      const pokemonList = await api.listPokemon({ limit, offset });

      expect(pokemonList).toBeDefined();
      expect(pokemonList.results.length).toBe(limit);
      expect(Array.isArray(pokemonList.results)).toBe(true);
      expect(pokemonList.count).toBeGreaterThan(0);
    });
  });

  describe("getGeneration", () => {
    it("should fetch generation data correctly", async () => {
      const generation = await api.getGeneration(1);

      expect(generation).toBeDefined();
      expect(generation.id).toBe(1);
      expect(generation.name).toBe("generation-i");
    });

    it("should throw error for invalid generation name", async () => {
      await expect(api.getGeneration("not-a-generation")).rejects.toThrow();
    });

    it("should throw error for invalid generation ID", async () => {
      await expect(api.getGeneration(999)).rejects.toThrow();
    });
  });
});
