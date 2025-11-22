"use client";

/**
 * News Index Page
 * Lists all news items with category filtering
 * Design inspired by Stripe's clean, minimal newsroom
 */

import { dummyNews } from "@/lib/newsroom/dummyData";
import { getAllNewsInLocale, getNewsItemTranslation, getNewsItemHeaderImage } from "@/lib/newsroom/utils";
import { NewsCategory, Locale } from "@/lib/newsroom/types";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const categories: { value: NewsCategory | "all"; label: string }[] = [
  { value: "all", label: "All news" },
  { value: "company", label: "Company" },
  { value: "product", label: "Product" },
  { value: "launch", label: "Launch" },
  { value: "partnership", label: "Partnership" },
  { value: "insight", label: "Insights" },
];

export default function NewsIndex() {
  const params = useParams();
  const locale = params.locale as Locale;
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "all">("all");

  // Get news items available in current locale (with fallback to English)
  const localeNews = getAllNewsInLocale(dummyNews, locale);

  // Filter by category
  const filteredNews =
    activeCategory === "all"
      ? localeNews
      : localeNews.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-ink mb-6">News</h1>

          {/* Category Filter */}
          <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`
                  px-1 py-4 text-sm font-semibold transition-colors relative whitespace-nowrap
                  ${
                    activeCategory === category.value
                      ? "text-brand-600"
                      : "text-gray-600 hover:text-ink"
                  }
                `}
              >
                {category.label}
                {activeCategory === category.value && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* News List */}
        <div className="max-w-4xl">
          <div className="space-y-12">
            {filteredNews.map((item) => {
              const translation = getNewsItemTranslation(item, locale);
              if (!translation) return null;

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/newsroom/news/${translation.slug}`}
                  className="block group"
                >
                  <div className="flex gap-8">
                    {/* Date Column */}
                    <div className="flex-shrink-0 w-32">
                      <time className="text-sm text-gray-500" dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString(locale, {
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
                            {item.category}
                          </span>
                          <h2 className="text-xl font-semibold text-ink group-hover:text-brand-600 transition-colors mb-3 leading-snug">
                            {translation.title}
                          </h2>
                          <p className="text-gray-600 leading-relaxed">
                            {translation.summary}
                          </p>
                        </div>

                        {/* Thumbnail (if exists) */}
                        {getNewsItemHeaderImage(item, locale) && (
                          <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded overflow-hidden">
                            <Image
                              src={getNewsItemHeaderImage(item, locale)!}
                              alt=""
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No news items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
