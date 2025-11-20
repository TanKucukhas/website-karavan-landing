/**
 * Story Detail Page
 * Displays individual case study
 */

import { dummyStories } from "@/lib/newsroom/dummyData";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = dummyStories.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/newsroom/stories"
          className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold mb-8 hover:underline underline-offset-4"
        >
          ← Back to Stories
        </Link>

        {/* Story Header */}
        <article className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <span className="font-semibold text-brand-600">{story.clientName}</span>
              <span>•</span>
              <span>{story.sector}</span>
              <span>•</span>
              <time dateTime={story.date}>
                {new Date(story.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-ink mb-6">
              {story.title}
            </h1>
            {story.heroMetric && (
              <div className="inline-block px-6 py-3 bg-coral-50 border-2 border-coral-200 rounded-xl mb-6">
                <p className="text-3xl font-bold text-coral-600">{story.heroMetric}</p>
              </div>
            )}
            <p className="text-xl text-gray-700 leading-relaxed">{story.summary}</p>
          </div>

          {/* Metrics Grid */}
          {story.metrics && story.metrics.length > 0 && (
            <div className="grid md:grid-cols-4 gap-4 mb-12 p-8 bg-ui-light rounded-2xl">
              {story.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-brand-600 mb-2">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Sections */}
          <div className="space-y-12">
            {/* Problem */}
            {story.problem && (
              <section>
                <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-600 font-bold text-sm">
                    1
                  </span>
                  The Challenge
                </h2>
                <div className="pl-13">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {story.problem}
                  </p>
                </div>
              </section>
            )}

            {/* Approach */}
            {story.approach && (
              <section>
                <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-600 font-bold text-sm">
                    2
                  </span>
                  Our Approach
                </h2>
                <div className="pl-13">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {story.approach}
                  </p>
                </div>
              </section>
            )}

            {/* Outcome */}
            {story.outcome && (
              <section>
                <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-600 font-bold text-sm">
                    3
                  </span>
                  The Results
                </h2>
                <div className="pl-13">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {story.outcome}
                  </p>
                </div>
              </section>
            )}

            {/* Full Content */}
            {story.content && (
              <section className="border-t border-gray-200 pt-12">
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {story.content}
                </div>
              </section>
            )}
          </div>

          {/* Tags */}
          {story.tags && story.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-500 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Stories */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-ink mb-6">More Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {dummyStories
                .filter((item) => item.slug !== slug)
                .slice(0, 2)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/newsroom/stories/${item.slug}`}
                    className="p-6 rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">
                      {item.clientName}
                    </p>
                    <h3 className="font-bold text-ink group-hover:text-brand-600 transition-colors mb-2">
                      {item.title}
                    </h3>
                    {item.heroMetric && (
                      <p className="text-coral-600 font-semibold text-sm mb-2">
                        {item.heroMetric}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2">{item.summary}</p>
                  </Link>
                ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-brand-50 to-white rounded-2xl border border-brand-100 text-center">
            <h3 className="text-2xl font-bold text-ink mb-4">
              Want results like these?
            </h3>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              Let&apos;s talk about how we can help you achieve your goals with a strategic,
              outcome-focused approach.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

// Generate static params for all stories
export async function generateStaticParams() {
  return dummyStories.map((item) => ({
    slug: item.slug,
  }));
}
