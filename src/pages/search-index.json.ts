import { getCollection } from "astro:content";

export async function GET() {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map((p) => ({
      slug: p.id,
      title: p.data.title,
      description: p.data.description,
      tags: p.data.tags,
      pubDate: p.data.pubDate.toISOString().slice(0, 10),
    }));

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
