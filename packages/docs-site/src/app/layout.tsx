import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { PokemonProvider } from "pokeapi-sdk";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PokeAPI SDK",
  description: "A TypeScript SDK for fetching Pokemon data from the PokeAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 text-white`}
      >
        <PokemonProvider>
          <Header />
          <Sidebar />
          <main className="ml-64 mt-[65px]">{children}</main>
        </PokemonProvider>
      </body>
    </html>
  );
}
