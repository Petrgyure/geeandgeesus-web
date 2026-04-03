import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Střihy, vousy a život na Žižkově",
  description:
    "Tipy na péči o vousy, pánské střihy, životní styl a novinky z barbershopu Gee & Geesus. Praha 3, Žižkov.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="pt-[72px]">
      <Section>
        <SectionHeader
          label="Blog"
          title="Střihy, vousy a život na Žižkově"
          description="Tipy, příběhy a věci, co nás baví."
        />

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">Brzy tu bude víc.</p>
          </div>
        ) : (
          <>
            <div className="flex gap-3 mb-10 flex-wrap justify-center">
              <span className="px-4 py-1.5 rounded-full bg-anthracite-400 text-white text-xs uppercase tracking-wide">
                Vše
              </span>
              {categories.map((cat) => (
                <span
                  key={cat.slug}
                  className="px-4 py-1.5 rounded-full border border-anthracite-500 text-text-muted text-xs uppercase tracking-wide hover:border-white hover:text-white transition-colors cursor-pointer"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-surface-card border border-anthracite-500 rounded-lg overflow-hidden hover:-translate-y-1 hover:border-white transition-all group"
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    width={600}
                    height={340}
                    className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-wide text-text-muted">
                      {categories.find((c) => c.slug === post.category)?.name || post.category}
                    </span>
                    <h2 className="font-heading text-xl text-white tracking-wide mt-2 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-text-muted text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
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
                </Link>
              ))}
            </div>
          </>
        )}
      </Section>
    </div>
  );
}
