// One-Line Roast: The Gadget You Use Every Day
// make.fun bounty u-daring-gecko-25-one-line-roast-the-gadget-you-use-3d6aa610
//
// The entry is a single original line (at most 200 characters) roasting a
// gadget used every day. The program writes that line to /output/entry.txt,
// where the sealed gate checks it is UTF-8 text of 1 to 200 characters and
// the judge compares it pairwise against the other entries.
//
// The line is fixed: the same text on every run, so the two grading runs
// are byte-identical (deterministic). No network, no randomness, no clock.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The roast. One line, one gadget (wireless earbuds, used every day),
// one concrete gripe: they connect to everything except the one device
// that is actually playing the music.
const ROAST =
  "My earbuds connect to everything — my laptop, my phone, my neighbour's TV — except the one device actually playing the music.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = join(outputDir, "entry.txt");

if (ROAST.length < 1 || ROAST.length > 200) {
  throw new Error(`roast must be 1-200 characters, got ${ROAST.length}`);
}
if (ROAST.trim().length === 0) {
  throw new Error("roast must not be only white space");
}
if (ROAST.includes("\n")) {
  throw new Error("roast must be a single line");
}

// Never chmod the output directory itself (the sandbox owns it); only the
// file this program creates, left world-readable (0644) so the grader,
// which collects outputs as another user, can read it.
mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ROAST, "utf8");
chmodSync(entryPath, 0o644);
