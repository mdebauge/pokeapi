import Link from "next/dist/client/link";

const routes = [
  {
    label: "Overview",
    sections: [
      {
        label: "Introduction",
        route: "/introduction",
      },
    ],
  },
  {
    label: "Getting Started",
    sections: [
      {
        label: "Installation",
        route: "/installation",
      },
      {
        label: "Quick Start",
        route: "/quick-start",
      },
    ],
  },
  {
    label: "API Reference",
    sections: [
      {
        label: "Classes",
        route: "/classes",
      },
      {
        label: "Functions",
        route: "/functions",
      },
      {
        label: "Types",
        route: "/types",
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
                    className="px-4 py-2 rounded-md hover:cursor-pointer hover:bg-zinc-700/40"
                    key={section.route}
                  >
                    <Link href={section.route}>{section.label}</Link>
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
