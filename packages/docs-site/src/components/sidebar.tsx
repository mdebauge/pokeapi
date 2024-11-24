import { ExternalLink } from "lucide-react";

type Route = {
  label: string;
  sections: Section[];
};

type Section = {
  label: string;
  route: string;
  icon?: React.ElementType;
};

const routes: Route[] = [
  {
    label: "Overview",
    sections: [
      {
        label: "Introduction",
        route: "#introduction",
      },
    ],
  },
  {
    label: "Getting Started",
    sections: [
      {
        label: "Installation",
        route: "#installation",
      },
      {
        label: "Quick Start",
        route: "#quick-start",
      },
    ],
  },
  {
    label: "Reference",
    sections: [
      {
        label: "Hooks",
        route: "#hooks",
      },
      {
        label: "Testing",
        route: "#testing",
      },
    ],
  },
  {
    label: "Classes",
    sections: [
      {
        label: "PokeAPI Class",
        route:
          "https://github.com/mdebauge/pokeapi/blob/main/packages/pokeapi-sdk/docs/classes/PokeAPI.md",
        icon: ExternalLink,
      },
    ],
  },
  {
    label: "Types",
    sections: [
      {
        label: "Generation Type",
        route:
          "https://github.com/mdebauge/pokeapi/blob/main/packages/pokeapi-sdk/docs/type-aliases/Generation.md",
        icon: ExternalLink,
      },
      {
        label: "PokeAPIConfig Type",
        route:
          "https://github.com/mdebauge/pokeapi/blob/main/packages/pokeapi-sdk/docs/type-aliases/PokeAPIConfig.md",
        icon: ExternalLink,
      },
      {
        label: "Pokemon Type",
        route:
          "https://github.com/mdebauge/pokeapi/blob/main/packages/pokeapi-sdk/docs/type-aliases/Pokemon.md",
        icon: ExternalLink,
      },
      {
        label: "PokemonList Type",
        route:
          "https://github.com/mdebauge/pokeapi/blob/main/packages/pokeapi-sdk/docs/type-aliases/PokemonList.md",
        icon: ExternalLink,
      },
    ],
  },
  {
    label: "Functions",
    sections: [
      {
        label: "PokemonProvider",
        route:
          "https://github.com/mdebauge/pokeapi/blob/main/packages/pokeapi-sdk/docs/functions/PokemonProvider.md",
        icon: ExternalLink,
      },
    ],
  },
];

export function Sidebar() {
  return (
    <>
      <nav className="fixed top-[65px] h-screen w-64 py-6">
        <ul className="flex flex-col gap-4 px-4">
          {routes.map((route) => (
            <li key={route.label}>
              <div className="text-xs uppercase font-bold px-4 mb-2 mt-2 text-rose-400">
                {route.label}
              </div>
              <ul className="flex flex-col">
                {route.sections.map((section) => (
                  <li
                    className={`px-4 py-2 rounded-md hover:cursor-pointer ${
                      section.icon
                        ? "hover:text-zinc-300"
                        : "hover:bg-zinc-700/40"
                    }`}
                    key={section.route}
                  >
                    <a
                      href={section.route}
                      className="flex items-center"
                      target={section.icon ? "_blank" : "_self"}
                    >
                      {section.label}
                      {section.icon && (
                        <section.icon className="w-4 h-4 inline-block ml-2 text-zinc-600" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
