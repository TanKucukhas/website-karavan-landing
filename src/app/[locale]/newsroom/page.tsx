/**
 * Newsroom Overview Page
 * Aggregates featured content from News and Stories
 * Design inspired by Stripe's clean, editorial newsroom
 */

import { dummyNews } from "@/lib/newsroom/dummyData";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function NewsroomOverview({ params }: Props) {
  const { locale } = await params;

  // Get featured items
  const featuredNews = dummyNews.find((n) => n.featured);
  const latestNews = dummyNews.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Feature */}
      {featuredNews && (
        <section className="border-b border-gray-200">
          <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
            <div className="max-w-6xl">
              {/* Hero Content */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-brand-100 text-brand-700 mb-4">
                    {featuredNews.category}
                  </span>
                  <h1 className="text-4xl lg:text-5xl font-bold text-ink mb-6 leading-tight">
                    {featuredNews.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {featuredNews.summary}
                  </p>
                  <Link
                    href={`/${locale}/newsroom/news/${featuredNews.slug}`}
                    className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold text-lg group"
                  >
                    Read more
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Hero Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg overflow-hidden">
                  {featuredNews.thumbnailUrl ? (
                    <Image
                      src={featuredNews.thumbnailUrl}
                      alt={featuredNews.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-12">
                      <div className="text-center">
                        <svg className="w-24 h-24 text-brand-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="text-xl font-bold text-brand-700">
                          {featuredNews.category}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Links Section */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
            {/* Product Updates */}
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Product updates</h3>
                <p className="text-gray-600 mb-4">
                  The latest product and company news from Karavan.
                </p>
                <Link
                  href={`/${locale}/newsroom/news`}
                  className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold text-sm"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Industry Insights */}
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-coral-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-coral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Industry insights</h3>
                <p className="text-gray-600 mb-4">
                  Analysis and perspectives on trade, logistics, and market trends.
                </p>
                <Link
                  href={`/${locale}/newsroom/news`}
                  className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold text-sm"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">From the newsroom</h3>
                <p className="text-gray-600 mb-4">
                  Press releases and media resources for journalists and partners.
                </p>
                <Link
                  href={`/${locale}/newsroom/about`}
                  className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold text-sm"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-ink">News</h2>
            <Link
              href={`/${locale}/newsroom/news`}
              className="text-brand-600 hover:text-brand-700 font-semibold text-sm"
            >
              All news →
            </Link>
          </div>

          {/* Horizontal Scrolling News */}
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {latestNews.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/newsroom/news/${item.slug}`}
                  className="flex-shrink-0 w-[400px] snap-start group"
                >
                  <div className="flex flex-col h-full">
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200 rounded-lg overflow-hidden mb-4">
                      {item.thumbnailUrl ? (
                        <Image
                          src={item.thumbnailUrl}
                          alt=""
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <time className="text-xs text-gray-500" dateTime={item.date}>
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-ink group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section - Hidden for now, will implement later */}
      {/* <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-ink">Stories</h2>
            <Link
              href="/newsroom/stories"
              className="text-brand-600 hover:text-brand-700 font-semibold text-sm"
            >
              View all stories →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story) => (
              <Link
                key={story.id}
                href={`/newsroom/stories/${story.slug}`}
                className="group"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-semibold opacity-90">
                        KARAVAN STORY
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{story.clientName}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-ink group-hover:text-brand-600 transition-colors mb-2">
                  {story.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
