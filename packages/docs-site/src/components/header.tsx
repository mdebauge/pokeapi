import Image from "next/image";
import pokeball from "../../public/pokeball.svg";

export function Header() {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center py-5 px-8 bg-inherit border-b border-zinc-800">
      <a className="text-xl font-bold flex items-center gap-2" href="/">
        <Image src={pokeball} alt="Pokeball" width={24} height={24} />
        PokeAPI SDK
      </a>
      <a href="https://github.com/mdebauge/pokeapi-sdk">Github</a>
    </header>
  );
}
