const fs = require("fs");
const path = require("path");

// Helper function to read a specific doc file and adjust its links
function readDocFile(relativePath) {
  const fullPath = path.join(__dirname, "../docs/", relativePath);
  try {
    return fs
      .readFileSync(fullPath, "utf8")
      .replace(/\[([^\]]+)\]\((?!http)([^)]+)\)/g, (match, text, link) => {
        if (link.startsWith("../")) {
          return `[${text}](${link})`;
        }
        return `[${text}](docs/${link})`;
      });
  } catch (error) {
    console.warn(
      `Warning: Could not read file ${relativePath}:`,
      error.message
    );
    return ""; // Return empty string if file not found
  }
}

// Read the generated API documentation
const apiDocs = readDocFile("README.md");

// Read the current README
const readmePath = path.join(__dirname, "../README.md");
let readme = fs.readFileSync(readmePath, "utf8");

// Replace the main API docs section
readme = readme.replace(
  /<!-- API_DOCS_START -->[\s\S]*<!-- API_DOCS_END -->/,
  `<!-- API_DOCS_START -->\n${apiDocs}\n<!-- API_DOCS_END -->`
);

// Replace any custom doc snippets
// Format: <!-- DOC_SNIPPET:path/to/doc.md -->
readme = readme.replace(/<!-- DOC_SNIPPET:([\w/.]+) -->/g, (match, docPath) => {
  const content = readDocFile(docPath);
  return content ? content : `<!-- Failed to load ${docPath} -->`;
});

// Write the new README
fs.writeFileSync(readmePath, readme);

console.log("✅ README.md updated");
