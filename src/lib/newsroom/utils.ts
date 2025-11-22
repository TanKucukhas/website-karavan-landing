/**
 * Newsroom Utility Functions
 *
 * Helper functions for managing multilingual news and story content.
 */

import type {
  NewsItem,
  StoryItem,
  NewsTranslation,
  StoryTranslation,
  Locale,
} from "./types";

const DEFAULT_LOCALE: Locale = "en";

/**
 * Get header image URL for a news item
 * Supports both old thumbnailUrl and new images structure
 * Note: locale parameter kept for API compatibility but not used (all locales share same image)
 */
export function getNewsItemHeaderImage(
  item: NewsItem,
  _locale?: Locale
): string | undefined {
  // New images structure (preferred)
  if (item.images) {
    return item.images.header;
  }

  // Legacy thumbnailUrl (backward compatibility)
  return item.thumbnailUrl;
}

/**
 * Get translation for a news item in specified locale, with fallback to English
 */
export function getNewsItemTranslation(
  item: NewsItem,
  locale: Locale
): NewsTranslation | null {
  // Try to get translation in requested locale
  const translation = item.translations[locale];
  if (translation) {
    return translation;
  }

  // Fallback to English if requested locale not available
  if (locale !== DEFAULT_LOCALE) {
    const fallback = item.translations[DEFAULT_LOCALE];
    if (fallback) {
      return fallback;
    }
  }

  // Return first available translation if no English fallback
  const availableLocales = Object.keys(item.translations) as Locale[];
  if (availableLocales.length > 0) {
    return item.translations[availableLocales[0]]!;
  }

  return null;
}

/**
 * Get translation for a story item in specified locale, with fallback to English
 */
export function getStoryItemTranslation(
  item: StoryItem,
  locale: Locale
): StoryTranslation | null {
  // Try to get translation in requested locale
  const translation = item.translations[locale];
  if (translation) {
    return translation;
  }

  // Fallback to English if requested locale not available
  if (locale !== DEFAULT_LOCALE) {
    const fallback = item.translations[DEFAULT_LOCALE];
    if (fallback) {
      return fallback;
    }
  }

  // Return first available translation if no English fallback
  const availableLocales = Object.keys(item.translations) as Locale[];
  if (availableLocales.length > 0) {
    return item.translations[availableLocales[0]]!;
  }

  return null;
}

/**
 * Filter news items that have translations in the specified locale (or fallback to English)
 */
export function getAllNewsInLocale(
  allNews: NewsItem[],
  locale: Locale
): NewsItem[] {
  return allNews.filter((item) => {
    const translation = getNewsItemTranslation(item, locale);
    return translation !== null;
  });
}

/**
 * Filter story items that have translations in the specified locale (or fallback to English)
 */
export function getAllStoriesInLocale(
  allStories: StoryItem[],
  locale: Locale
): StoryItem[] {
  return allStories.filter((item) => {
    const translation = getStoryItemTranslation(item, locale);
    return translation !== null;
  });
}

/**
 * Find a news item by slug across all locales
 */
export function findNewsBySlug(
  allNews: NewsItem[],
  slug: string
): NewsItem | undefined {
  return allNews.find((item) => {
    // Check if any translation has this slug
    const locales = Object.keys(item.translations) as Locale[];
    return locales.some((locale) => item.translations[locale]?.slug === slug);
  });
}

/**
 * Find a story item by slug across all locales
 */
export function findStoryBySlug(
  allStories: StoryItem[],
  slug: string
): StoryItem | undefined {
  return allStories.find((item) => {
    // Check if any translation has this slug
    const locales = Object.keys(item.translations) as Locale[];
    return locales.some((locale) => item.translations[locale]?.slug === slug);
  });
}

/**
 * Get available locales for a news item
 */
export function getAvailableLocalesForNews(item: NewsItem): Locale[] {
  return Object.keys(item.translations).filter(
    (locale) => item.translations[locale as Locale] !== undefined
  ) as Locale[];
}

/**
 * Get available locales for a story item
 */
export function getAvailableLocalesForStory(item: StoryItem): Locale[] {
  return Object.keys(item.translations).filter(
    (locale) => item.translations[locale as Locale] !== undefined
  ) as Locale[];
}
