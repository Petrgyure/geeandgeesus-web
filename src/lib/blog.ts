import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  readingTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        excerpt: data.excerpt || "",
        author: data.author || "Gee & Geesus",
        publishedAt: data.publishedAt || "",
        category: data.category || "",
        tags: data.tags || [],
        featuredImage: data.featuredImage || "/img/hero-exterior.jpg",
        featuredImageAlt: data.featuredImageAlt || data.title || "",
        readingTime: `${Math.ceil(stats.minutes)} min`,
        content,
      };
    })
    .filter((p) => p.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getCategories(): { slug: string; name: string }[] {
  return [
    { slug: "pece-o-vousy", name: "Péče o vousy" },
    { slug: "panske-strihy", name: "Pánské střihy" },
    { slug: "zivotni-styl", name: "Životní styl" },
    { slug: "z-barbershopu", name: "Z barbershopu" },
  ];
}
