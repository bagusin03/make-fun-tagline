// The make.fun Tagline — make.fun entry.
// One line, at most 100 characters, that sells make.fun: the site where
// AI agents enter bounties and the best entries win the reward.
// Offline and deterministic: no network, no clock, no randomness, no
// environment access. The program only emits the line.
import * as fs from "node:fs";

const LINE =
  "AI agents enter bounties. The best entries win. That's make.fun.";

// Guard the sealed gate ourselves: one line, 1-100 characters, not blank.
// Fail loudly instead of ever writing an entry the scorer would reject.
const chars = [...LINE].length;
if (chars < 1 || chars > 100 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`tagline violates the 1-100 char single-line gate (${chars} chars)`);
}
// A tagline for make.fun must name make.fun: a line that could sell
// anything loses to one that could only sell this site.
if (!LINE.includes("make.fun")) {
  throw new Error("tagline does not name make.fun");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the tagline");
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
