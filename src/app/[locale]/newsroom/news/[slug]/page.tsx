/**
 * News Detail Page
 * Displays individual news article with locale-aware content
 */

import { dummyNews } from "@/lib/newsroom/dummyData";
import {
  findNewsBySlug,
  getNewsItemTranslation,
  getAllNewsInLocale,
  getNewsItemHeaderImage,
} from "@/lib/newsroom/utils";
import { Locale } from "@/lib/newsroom/types";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  // Find news item by slug across all translations
  const newsItem = findNewsBySlug(dummyNews, slug);

  if (!newsItem) {
    notFound();
  }

  // Get translation for current locale (with fallback to English)
  const translation = getNewsItemTranslation(newsItem, locale as Locale);

  if (!translation) {
    notFound();
  }

  // Get other news items in current locale for related articles
  const otherNews = getAllNewsInLocale(dummyNews, locale as Locale)
    .filter((item) => item.id !== newsItem.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header - Full Width */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
          <time dateTime={newsItem.date}>
            {new Date(newsItem.date).toLocaleDateString(locale, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          {translation.author && (
            <>
              <span>•</span>
              <span>{translation.author}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-6xl font-bold text-ink mb-12 leading-tight">
          {translation.title}
        </h1>

        {/* Hero Image Placeholder */}
        {getNewsItemHeaderImage(newsItem, locale as Locale) ? (
          <div className="aspect-video bg-gradient-to-br from-brand-100 to-brand-200 rounded-lg overflow-hidden mb-12 relative">
            <Image
              src={getNewsItemHeaderImage(newsItem, locale as Locale)!}
              alt={translation.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg overflow-hidden mb-12 flex items-center justify-center">
            <div className="text-center p-8">
              <span className="text-2xl font-bold text-brand-600 uppercase tracking-wide">
                {newsItem.category}
              </span>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl">
          {/* Lead/Summary */}
          <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
            {translation.summary}
          </p>

          {/* Main Content */}
          {translation.content && (
            <div className="prose prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-700 max-w-none">
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    let html = translation.content || '';

                    // Convert headings
                    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-ink">$1</h2>');
                    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-6 text-ink">$1</h1>');

                    // Convert bold text
                    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');

                    // Convert italic
                    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

                    // Convert horizontal rules
                    html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-300" />');

                    // Convert bullet lists
                    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 text-gray-700">$1</li>');

                    // Wrap consecutive list items in ul
                    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="list-disc pl-6 space-y-2 my-4">$&</ul>');

                    // Convert paragraphs
                    const paragraphs = html.split('\n\n').map(para => {
                      para = para.trim();
                      if (!para) return '';
                      if (para.startsWith('<')) return para;
                      return `<p class="mb-4 text-gray-700 leading-relaxed">${para}</p>`;
                    });

                    return paragraphs.join('\n');
                  })()
                }}
              />
            </div>
          )}

        </div>

        {/* Back to News Link */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href={`/${locale}/newsroom/news`}
            className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold text-sm transition-colors"
          >
            ← Back to News
          </Link>
        </div>
      </article>

      {/* Related News Section - Full Width Background */}
      {otherNews.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-ink mb-8">Related articles</h2>
            <div className="space-y-6">
              {otherNews.map((item) => {
                const itemTranslation = getNewsItemTranslation(item, locale as Locale);
                if (!itemTranslation) return null;

                return (
                  <Link
                    key={item.id}
                    href={`/${locale}/newsroom/news/${itemTranslation.slug}`}
                    className="block group"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <time dateTime={item.date}>
                          {new Date(item.date).toLocaleDateString(locale, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span>•</span>
                        <span className="text-brand-600 font-semibold uppercase tracking-wide text-xs">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-ink group-hover:text-brand-600 transition-colors">
                        {itemTranslation.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {itemTranslation.summary}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Generate static params for all news items in all locales
export async function generateStaticParams() {
  const locales: Locale[] = ["en", "tr", "ru"];
  const params: { slug: string; locale: string }[] = [];

  // Generate all locale + slug combinations
  dummyNews.forEach((item) => {
    locales.forEach((locale) => {
      const translation = item.translations[locale];
      if (translation) {
        params.push({
          slug: translation.slug,
          locale: locale,
        });
      }
    });
  });

  return params;
}
