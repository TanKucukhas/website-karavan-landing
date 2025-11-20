/**
 * Newsroom Data Models
 *
 * TypeScript types for News and Stories content in the Karavan Newsroom.
 * These types are used across both the public-facing pages and admin interfaces.
 */

export type NewsCategory = "product" | "company" | "launch" | "update" | "insight";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // ISO 8601 format
  summary: string;
  content?: string; // Markdown or HTML content for detail page
  thumbnailUrl?: string;
  featured?: boolean;
  author?: string;
  tags?: string[];
}

export interface StoryItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  date: string; // ISO 8601 format
  sector: string;
  summary: string;
  content?: string; // Markdown or HTML content for detail page
  heroMetric?: string;
  thumbnailUrl?: string;
  featured?: boolean;
  problem?: string;
  approach?: string;
  outcome?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  tags?: string[];
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
