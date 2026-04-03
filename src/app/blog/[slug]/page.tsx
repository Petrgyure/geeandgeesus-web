import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getCategories } from "@/lib/blog";
import { Section } from "@/components/section";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const categories = getCategories();
  const categoryName = categories.find((c) => c.slug === post.category)?.name || post.category;

  // Simple MDX → HTML (headings, paragraphs, lists, bold, italic)
  const html = post.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("### ")) return `<h3 class="font-heading text-xl text-white tracking-wide mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith("## ")) return `<h2 class="font-heading text-2xl text-white tracking-wide mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("- ")) return `<li class="text-text-body ml-4 mb-1">${line.slice(2)}</li>`;
      if (line.trim() === "") return "";
      return `<p class="text-text-body mb-4 leading-relaxed">${line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')}</p>`;
    })
    .join("\n");

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="pt-[72px]">
      {/* Article header */}
      <Section>
        <div className="max-w-[680px] mx-auto text-center">
          <nav className="text-xs text-text-muted mb-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span>{categoryName}</span>
          </nav>
          <span className="inline-block px-3 py-1 rounded-full bg-anthracite-400 text-white text-xs uppercase tracking-wide mb-4">
            {categoryName}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl text-white tracking-wide leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm text-text-muted">
            <span>{post.author}</span>
            <span>&middot;</span>
            <time>
              {new Date(post.publishedAt).toLocaleDateString("cs-CZ", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readingTime} čtení</span>
          </div>
        </div>
      </Section>

      {/* Featured image */}
      <div className="max-w-[900px] mx-auto px-6 -mt-8 mb-12">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          width={900}
          height={500}
          className="w-full rounded-lg aspect-[16/9] object-cover"
          priority
        />
      </div>

      {/* Article body */}
      <article className="max-w-[680px] mx-auto px-6 pb-16">
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {/* In-article CTA */}
        <div className="bg-surface-raised border border-anthracite-500 rounded-lg p-8 my-12 text-center">
          <p className="text-white text-lg mb-4">
            Chcete to zažít na vlastní kůži?
          </p>
          <Link
            href="/rezervace"
            className="inline-block bg-white text-anthracite-900 px-8 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:bg-anthracite-50 transition-all"
          >
            Zarezervovat křeslo
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <Section raised>
          <h2 className="font-heading text-2xl text-white tracking-wide text-center mb-10">
            Další články
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="bg-surface-card border border-anthracite-500 rounded-lg overflow-hidden hover:-translate-y-1 hover:border-white transition-all"
              >
                <Image
                  src={r.featuredImage}
                  alt={r.featuredImageAlt}
                  width={400}
                  height={225}
                  className="w-full aspect-[16/9] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-heading text-lg text-white tracking-wide">
                    {r.title}
                  </h3>
                  <p className="text-text-muted text-xs mt-2">{r.readingTime} čtení</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
