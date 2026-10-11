import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { m3ShikiLight, m3ShikiDark } from "./scripts/m3-shiki-theme.mjs";

export default defineConfig({
  site: "https://themagitian.github.io",
  integrations: [mdx(), sitemap()],
  markdown: {
    // Math via the markdown pipeline (mdx() plugin options are ignored in
    // @astrojs/mdx v8; the processor is inherited instead).
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    // Shiki on, with light/dark themes generated from the site's own color
    // engine (see scripts/m3-shiki-theme.mjs). global.css flips the
    // --shiki-dark* variables when the dark scheme is active.
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: { light: m3ShikiLight, dark: m3ShikiDark },
      defaultColor: "light",
    },
  },
});
