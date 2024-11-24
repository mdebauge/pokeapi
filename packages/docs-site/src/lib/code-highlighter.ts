import { getHighlighter, type Highlighter } from "shiki";

let highlighterInstance: Highlighter | null = null;

export async function getHighlighterInstance() {
  if (!highlighterInstance) {
    highlighterInstance = await getHighlighter({
      themes: ["github-dark-default"],
      langs: ["bash", "json", "typescript"],
    });
  }
  return highlighterInstance;
}

interface HighlightOptions {
  highlights?: number[];
}

export async function highlightCode(
  code: string,
  lang: "bash" | "json" | "typescript",
  options: HighlightOptions = {}
) {
  const highlighter = await getHighlighterInstance();

  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark-default",
    transformers: [
      {
        pre(node: any) {
          node.properties.style =
            "background-color: #0d1117; border-radius: 0.5rem; padding: 1rem; font-size: 0.875rem;";
          return node;
        },
        line(node: any, line: number) {
          if (options.highlights?.includes(line)) {
            node.properties.style = `
        background-color: rgba(200, 200, 255, 0.08);
        margin: 0 -1rem;
        padding: 0 1rem;
        display: inline-block;
        width: calc(100% + 2rem);
          `;
          }
          return node;
        },
      },
    ],
    highlights: options.highlights, // Make sure this is being passed
  });
}
