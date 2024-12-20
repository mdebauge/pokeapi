import Image from "next/image";
import pokeball from "../../public/pokeball.svg";
import { GitHubIcon } from "../app/icons/github";

export function Header() {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center py-5 px-8 bg-zinc-900/70 border-b border-zinc-800 backdrop-blur-md z-50">
      <a className="text-xl font-bold flex items-center gap-2" href="/">
        <Image src={pokeball} alt="Pokeball" width={24} height={24} />
        PokeAPI SDK
      </a>
      <a
        className="text-zinc-500 hover:text-zinc-400 transition-colors"
        href="https://github.com/mdebauge/pokeapi-sdk"
      >
        <GitHubIcon className="w-5 h-5" />
      </a>
    </header>
  );
}
