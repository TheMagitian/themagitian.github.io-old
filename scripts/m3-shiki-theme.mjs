/**
 * Shiki syntax-highlighting themes derived from the site's own dynamic
 * color engine, so code blocks use the same tonal palettes as everything
 * else (seed hue 260, tonal-spot - the site default).
 *
 * Both a light and a dark theme are emitted; Shiki inlines the light theme
 * plus `--shiki-dark*` CSS variables, and global.css flips them when
 * `[data-m3-dark="1"]` is set. Token colors are fixed at build time while
 * the container background stays a live theme variable.
 */
import { schemeColors } from "../src/scripts/theme/m3-engine.js";

const seed = { hue: 260, chroma: 48, variant: "tonalSpot" };
const light = schemeColors({ ...seed, isDark: false });
const dark = schemeColors({ ...seed, isDark: true });

/** [lightRole, darkRole] pairs for each token class. */
const TOKENS = {
  comment: ["outline", "outline"],
  keyword: ["primary", "primary"],
  storage: ["primary", "primary"],
  string: ["tertiary", "tertiary"],
  number: ["secondary", "secondary"],
  function: ["primary", "primary"],
  type: ["tertiary", "tertiary"],
  variable: ["onSurface", "onSurface"],
  punctuation: ["onSurfaceVariant", "onSurfaceVariant"],
  markupHeading: ["primary", "primary"],
};

function tokenColors(hex) {
  return [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: hex.comment, fontStyle: "italic" } },
    { scope: ["keyword", "keyword.control", "keyword.operator", "storage.type", "storage.modifier"], settings: { foreground: hex.keyword } },
    { scope: ["string", "string.unquoted", "punctuation.definition.string", "string.regexp"], settings: { foreground: hex.string } },
    { scope: ["constant.numeric", "constant.language", "constant.character", "constant.other"], settings: { foreground: hex.number } },
    { scope: ["entity.name.function", "entity.name.method", "support.function", "support.method"], settings: { foreground: hex.function } },
    { scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"], settings: { foreground: hex.type } },
    { scope: ["variable", "variable.other", "entity.name", "support.variable", "meta.definition.variable"], settings: { foreground: hex.variable } },
    { scope: ["punctuation", "punctuation.definition.block", "punctuation.separator", "meta.brace"], settings: { foreground: hex.punctuation } },
    { scope: ["markup.heading"], settings: { foreground: hex.markupHeading, fontStyle: "bold" } },
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
    { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
    { scope: ["invalid"], settings: { foreground: hex.error } },
    { scope: ["invalid.deprecated"], settings: { foreground: hex.error, fontStyle: "underline" } },
  ];
}

/** Resolve each token class to a hex from the role map. */
const hexFor = (roles) =>
  Object.fromEntries(Object.entries(TOKENS).map(([name, [role]]) => [name, roles[role]]));

function buildTheme(roles, type) {
  return {
    name: `site-${type}`,
    type,
    colors: {
      "editor.background": roles.surfaceContainerHigh,
      "editor.foreground": roles.onSurface,
    },
    tokenColors: tokenColors({ ...hexFor(roles), error: roles.error }),
  };
}

export const m3ShikiLight = buildTheme(light, "light");
export const m3ShikiDark = buildTheme(dark, "dark");
