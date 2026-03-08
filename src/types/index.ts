// ============================================
// BOOK TYPES
// ============================================
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
  category?: string[];
  tags?: string[];
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  is_new: boolean;
  
  // Kitap sayfası için ek alanlar
  first_chapter?: string;
  first_chapter_title?: string;
  
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  view_count: number;
  created_at: string;
  updated_at: string;
}

// ============================================
// CHARACTER TYPES
// ============================================
export interface Character {
  id: string;
  book_id: string;
  name: string;
  slug: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
  short_description: string;
  full_description?: string;
  traits?: string[];
  appears_in?: string[];
  image_url?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Join ile gelen veriler
  books?: {
    title: string;
    slug: string;
  };
}

// ============================================
// LOCATION TYPES
// ============================================
export interface Location {
  id: string;
  book_id: string;
  name: string;
  slug: string;
  type: 'city' | 'country' | 'landmark' | 'mystery' | 'region' | 'building';
  region?: string;
  short_description: string;
  full_description?: string;
  significance?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image_url?: string;
  related_books?: string[];
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Join ile gelen veriler
  books?: {
    title: string;
    slug: string;
  };
}

// ============================================
// CONCEPT TYPES
// ============================================
export interface Concept {
  id: string;
  book_id: string;
  name: string;
  slug: string;
  category: 'power' | 'organization' | 'artifact' | 'mystery' | 'technology' | 'culture';
  short_description: string;
  full_description?: string;
  related_books?: string[];
  image_url?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Join ile gelen veriler
  books?: {
    title: string;
    slug: string;
  };
}

// ============================================
// TIMELINE EVENT TYPES
// ============================================
export interface TimelineEvent {
  id: string;
  book_id: string;
  year: string;
  title: string;
  description: string;
  era: 'ancient' | 'medieval' | 'modern' | 'future';
  related_books?: string[];
  related_characters?: string[];
  related_locations?: string[];
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Join ile gelen veriler
  books?: {
    title: string;
    slug: string;
  };
}

// ============================================
// REVIEW TYPES
// ============================================
export interface Review {
  id: string;
  book_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  
  // Join ile gelen veriler
  books?: {
    title: string;
    slug: string;
  };
}

// ============================================
// SETTINGS TYPES
// ============================================
export interface SiteSettings {
  id: string;
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
  theme: string;
  primary_color: string;
  accent_color: string;
  logo_url?: string;
  favicon_url?: string;
  
  // İstatistik ayarları
  show_visitor_count: boolean;
  show_book_count: boolean;
  show_hero_count: boolean;
  show_language_count: boolean;
  
  updated_at: string;
}

// ============================================
// STATS TYPES
// ============================================
export interface DailyStats {
  id: string;
  date: string;
  visitor_count: number;
  page_views: number;
  created_at: string;
}

// ============================================
// USER TYPES
// ============================================
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  created_at: string;
}

// ============================================
// FORM TYPES
// ============================================
export interface BookFormData {
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
  category?: string[];
  tags?: string[];
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  is_new: boolean;
  first_chapter?: string;
  first_chapter_title?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export interface CharacterFormData {
  book_id: string;
  name: string;
  slug: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
  short_description: string;
  full_description?: string;
  traits?: string[];
  appears_in?: string[];
  image_url?: string;
  order_index: number;
  is_active: boolean;
}

export interface LocationFormData {
  book_id: string;
  name: string;
  slug: string;
  type: 'city' | 'country' | 'landmark' | 'mystery' | 'region' | 'building';
  region?: string;
  short_description: string;
  full_description?: string;
  significance?: string;
  coordinates?: { lat: number; lng: number };
  image_url?: string;
  related_books?: string[];
  order_index: number;
  is_active: boolean;
}

export interface ConceptFormData {
  book_id: string;
  name: string;
  slug: string;
  category: 'power' | 'organization' | 'artifact' | 'mystery' | 'technology' | 'culture';
  short_description: string;
  full_description?: string;
  related_books?: string[];
  image_url?: string;
  order_index: number;
  is_active: boolean;
}

export interface TimelineEventFormData {
  book_id: string;
  year: string;
  title: string;
  description: string;
  era: 'ancient' | 'medieval' | 'modern' | 'future';
  related_books?: string[];
  related_characters?: string[];
  related_locations?: string[];
  order_index: number;
  is_active: boolean;
}

export interface ReviewFormData {
  book_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  is_featured: boolean;
}
