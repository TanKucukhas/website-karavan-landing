/**
 * Stories Index Page
 * Lists all case studies with featured story hero
 * Design inspired by Stripe's stories section
 */

import { dummyStories } from "@/lib/newsroom/dummyData";
import Link from "next/link";

export default function StoriesIndex() {
  const featuredStory = dummyStories.find((s) => s.featured);
  const secondaryFeatured = dummyStories.filter((s) => s.featured).slice(1, 3);
  const allStories = dummyStories;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-ink mb-4">Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            See how companies around the world are using Karavan.
          </p>
        </div>

        {/* Featured Story Hero */}
        {featuredStory && (
          <section className="mb-16">
            <Link
              href={`/newsroom/stories/${featuredStory.slug}`}
              className="block group"
            >
              {/* Large Hero Image Card */}
              <div className="aspect-[2/1] lg:aspect-[21/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-6 relative">
                <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12 text-white">
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-semibold opacity-90">
                      KARAVAN STORY
                    </span>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="max-w-2xl">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                      {featuredStory.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Story Metadata */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink">
                    KARAVAN STORY
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">
                      {featuredStory.clientName[0]}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {featuredStory.clientName}
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Secondary Featured Stories */}
        {secondaryFeatured.length > 0 && (
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {secondaryFeatured.map((story) => (
                <Link
                  key={story.id}
                  href={`/newsroom/stories/${story.slug}`}
                  className="group"
                >
                  {/* Image Card */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4 relative">
                    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-semibold opacity-90">
                          KARAVAN STORY
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-brand-600">
                      KARAVAN STORY
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm font-medium text-gray-700">
                      {story.clientName}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Stories List */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-8">All stories</h2>

          <div className="space-y-8 max-w-4xl">
            {allStories.map((story) => (
              <Link
                key={story.id}
                href={`/newsroom/stories/${story.slug}`}
                className="block group"
              >
                <div className="flex gap-8">
                  {/* Date Column */}
                  <div className="flex-shrink-0 w-32">
                    <time className="text-sm text-gray-500" dateTime={story.date}>
                      {new Date(story.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-6">
                      <div className="flex-1">
                        <span className="inline-block text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">
                          User story
                        </span>
                        <h3 className="text-xl font-semibold text-ink group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                          {story.title}
                        </h3>
                      </div>

                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <span className="text-sm font-semibold opacity-90">
                            KARAVAN STORY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
