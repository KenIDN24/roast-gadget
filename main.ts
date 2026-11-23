// One-Line Roast: The Gadget You Use Every Day
// Entry: one original line (<=200 chars) roasting a gadget used every day.
// Writes the line to /output/entry.txt, the file the sealed gate reads.
//
// The roast: my robot vacuum ate its own charging cable, then beeped for
// help like I'd left it stranded in the desert. The gadget sabotaged
// itself and then blamed me for it — the most on-brand robot behaviour
// in this house.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My robot vacuum ate its own charging cable, then beeped for help like I'd left it stranded in the desert.";

// The gate requires UTF-8 text of 1-200 characters, not only whitespace,
// exactly one line. Count code points (not UTF-16 units) so the guard
// matches the gate, and fail hard instead of shipping a refused line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars.length} characters to ${join(outDir, "entry.txt")}`);
