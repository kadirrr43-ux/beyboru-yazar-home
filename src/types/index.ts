// Beyboru Yazar Evi - TypeScript Types

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  full_description?: string;
  cover_image: string;
  back_cover_image?: string;
  preview_images?: string[];
  kdy_link?: string;
  kdy_book_id?: string;
  price?: number;
  page_count?: number;
  isbn?: string;
  publish_date?: string;
  category: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  is_new: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id?: string;
  site_title: string;
  site_description: string;
  hero_title: string;
  hero_subtitle: string;
  about_title: string;
  about_content: string;
  contact_email: string;
  contact_phone?: string;
  social_twitter?: string;
  social_instagram?: string;
  social_youtube?: string;
  seo_default_title: string;
  seo_default_description: string;
  theme: 'dark' | 'light' | 'gold' | 'blue';
  primary_color: string;
  accent_color: string;
  logo_url?: string;
  favicon_url?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

export interface Theme {
  id: string;
  name: string;
  label: string;
  colors: {
    background: string;
    surface: string;
    surfaceLight: string;
    accent: string;
    accentLight: string;
    gold: string;
    goldLight: string;
    text: string;
    textMuted: string;
    textSubtle: string;
    border: string;
    glow: string;
  };
}

export const THEMES: Theme[] = [
  {
    id: 'dark',
    name: 'dark',
    label: 'Koyu Tema',
    colors: {
      background: '#0f0f12',
      surface: '#1a1a1f',
      surfaceLight: '#25252c',
      accent: '#8B3A3A',
      accentLight: '#A85A5A',
      gold: '#D4AF37',
      goldLight: '#E5C76B',
      text: '#F5F1E8',
      textMuted: '#9CA3AF',
      textSubtle: '#6B7280',
      border: 'rgba(255, 255, 255, 0.08)',
      glow: 'rgba(212, 175, 55, 0.15)',
    },
  },
  {
    id: 'light',
    name: 'light',
    label: 'Açık Tema',
    colors: {
      background: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceLight: '#F5F5F5',
      accent: '#8B3A3A',
      accentLight: '#A85A5A',
      gold: '#B8860B',
      goldLight: '#D4AF37',
      text: '#1a1a1f',
      textMuted: '#6B7280',
      textSubtle: '#9CA3AF',
      border: 'rgba(0, 0, 0, 0.08)',
      glow: 'rgba(139, 58, 58, 0.1)',
    },
  },
  {
    id: 'gold',
    name: 'gold',
    label: 'Altın Tema',
    colors: {
      background: '#1a1612',
      surface: '#2a2420',
      surfaceLight: '#3a3430',
      accent: '#8B6914',
      accentLight: '#A67C00',
      gold: '#FFD700',
      goldLight: '#FFE55C',
      text: '#FFF8E7',
      textMuted: '#C9B896',
      textSubtle: '#9A8B6F',
      border: 'rgba(255, 215, 0, 0.15)',
      glow: 'rgba(255, 215, 0, 0.2)',
    },
  },
  {
    id: 'blue',
    name: 'blue',
    label: 'Gece Mavisi',
    colors: {
      background: '#0a0f1a',
      surface: '#121929',
      surfaceLight: '#1c2540',
      accent: '#3B5998',
      accentLight: '#4A6FC4',
      gold: '#64B5F6',
      goldLight: '#90CAF9',
      text: '#E3F2FD',
      textMuted: '#90A4AE',
      textSubtle: '#607D8B',
      border: 'rgba(100, 181, 246, 0.15)',
      glow: 'rgba(100, 181, 246, 0.2)',
    },
  },
];
