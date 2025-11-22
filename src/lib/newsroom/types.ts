/**
 * Newsroom Data Models
 *
 * TypeScript types for News and Stories content in the Karavan Newsroom.
 * These types are used across both the public-facing pages and admin interfaces.
 */

export type NewsCategory = "product" | "company" | "launch" | "update" | "insight" | "partnership";

export type Locale = "en" | "tr" | "ru";

export interface NewsTranslation {
  slug: string;
  title: string;
  summary: string;
  content?: string; // Markdown or HTML content for detail page
  author?: string;
  tags?: string[];
}

export interface NewsImages {
  header: string; // Header image path (shared across all locales)
  content?: string[]; // Array of content image paths (for images within article body)
}

export interface NewsItem {
  id: string;
  category: NewsCategory;
  date: string; // ISO 8601 format
  thumbnailUrl?: string; // @deprecated Use images.header instead
  images?: NewsImages; // New: structured image management
  featured?: boolean;
  translations: {
    [K in Locale]?: NewsTranslation;
  };
}

export interface StoryTranslation {
  slug: string;
  title: string;
  summary: string;
  content?: string; // Markdown or HTML content for detail page
  heroMetric?: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  tags?: string[];
}

export interface StoryItem {
  id: string;
  clientName: string;
  date: string; // ISO 8601 format
  sector: string;
  thumbnailUrl?: string;
  featured?: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
  translations: {
    [K in Locale]?: StoryTranslation;
  };
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  mission: string;
  description: string;
  founded: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface TeamMember {
  slug: string;
  firstName: string;
  lastName: string;
  displayName: string;
  title: string;
  department?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    x?: string;
  };
}
