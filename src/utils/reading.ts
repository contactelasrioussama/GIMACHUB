/**
 * Reading metrics derived from article source, so the visible "N min read"
 * label, the JSON-LD wordCount and its timeRequired can never disagree.
 *
 * These used to come from a hand-authored `readTime` frontmatter field, which
 * drifted badly: the values implied a mean reading speed of 82 wpm across the
 * archive, roughly a third of normal adult prose speed.
 */

/** Words per minute for adult prose. Typical range is 200-250. */
export const WORDS_PER_MINUTE = 225;

/**
 * Word count of a markdown body. Markdown syntax is stripped first so bullet
 * markers, emphasis and link URLs are not counted as prose, and fenced code
 * blocks are dropped entirely.
 */
export function countWords(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")          // fenced code blocks
    .replace(/`[^`\n]*`/g, " ")               // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")    // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")  // links keep their visible text
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")       // heading markers
    .replace(/^\s{0,3}>\s?/gm, "")            // blockquote markers
    .replace(/^\s*[-*+]\s+/gm, "")            // bullet markers
    .replace(/^\s*\d+\.\s+/gm, "")            // ordered list markers
    .replace(/^\s*[-*_]{3,}\s*$/gm, " ")      // horizontal rules
    .replace(/\*\*|__|\*|_/g, "");            // emphasis markers
  return text.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}

/** Whole minutes to read a markdown body, never less than 1. */
export function readingMinutes(markdown: string): number {
  return Math.max(1, Math.round(countWords(markdown) / WORDS_PER_MINUTE));
}
