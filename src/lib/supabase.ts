import { createClient } from '@supabase/supabase-js';
import type { Book, SiteSettings, Character, Location, Concept, TimelineEvent, Review } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mnohwgtlvpxjgqrwgjte.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ub2h3Z3RsdnB4amdxcndnanRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4Mjg0NzUsImV4cCI6MjA4ODQwNDQ3NX0.vVgGEgSeXmmSHqbNDChV70D-PfOyHJI2lDO_9Boc-xM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================
// BOOKS API
// ============================================
export const booksApi = {
  async getAll(): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getPublished(): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getFeatured(): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getBySlug(slug: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return null;
    return data;
  },

  async getById(id: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(book: Partial<Book>): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .insert(book)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, book: Partial<Book>): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .update({ ...book, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (error) throw error;
  },

  async incrementView(slug: string): Promise<void> {
    await supabase.rpc('increment_book_view', { book_slug: slug });
  },
};

// ============================================
// CHARACTERS API
// ============================================
export const charactersApi = {
  async getAll(): Promise<Character[]> {
    const { data, error } = await supabase
      .from('characters')
      .select('*, books(title, slug)')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getByBook(bookId: string): Promise<Character[]> {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Character | null> {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(character: Partial<Character>): Promise<Character> {
    const { data, error } = await supabase
      .from('characters')
      .insert(character)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, character: Partial<Character>): Promise<Character> {
    const { data, error } = await supabase
      .from('characters')
      .update({ ...character, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('characters').delete().eq('id', id);
    if (error) throw error;
  },

  async toggleActive(id: string, isActive: boolean): Promise<void> {
    const { error } = await supabase
      .from('characters')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  },
};

// ============================================
// LOCATIONS API
// ============================================
export const locationsApi = {
  async getAll(): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*, books(title, slug)')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getByBook(bookId: string): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Location | null> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(location: Partial<Location>): Promise<Location> {
    const { data, error } = await supabase
      .from('locations')
      .insert(location)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, location: Partial<Location>): Promise<Location> {
    const { data, error } = await supabase
      .from('locations')
      .update({ ...location, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('locations').delete().eq('id', id);
    if (error) throw error;
  },

  async toggleActive(id: string, isActive: boolean): Promise<void> {
    const { error } = await supabase
      .from('locations')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  },
};

// ============================================
// CONCEPTS API
// ============================================
export const conceptsApi = {
  async getAll(): Promise<Concept[]> {
    const { data, error } = await supabase
      .from('concepts')
      .select('*, books(title, slug)')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getByBook(bookId: string): Promise<Concept[]> {
    const { data, error } = await supabase
      .from('concepts')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Concept | null> {
    const { data, error } = await supabase
      .from('concepts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(concept: Partial<Concept>): Promise<Concept> {
    const { data, error } = await supabase
      .from('concepts')
      .insert(concept)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, concept: Partial<Concept>): Promise<Concept> {
    const { data, error } = await supabase
      .from('concepts')
      .update({ ...concept, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('concepts').delete().eq('id', id);
    if (error) throw error;
  },

  async toggleActive(id: string, isActive: boolean): Promise<void> {
    const { error } = await supabase
      .from('concepts')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  },
};

// ============================================
// TIMELINE EVENTS API
// ============================================
export const timelineApi = {
  async getAll(): Promise<TimelineEvent[]> {
    const { data, error } = await supabase
      .from('timeline_events')
      .select('*, books(title, slug)')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getByBook(bookId: string): Promise<TimelineEvent[]> {
    const { data, error } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<TimelineEvent | null> {
    const { data, error } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(event: Partial<TimelineEvent>): Promise<TimelineEvent> {
    const { data, error } = await supabase
      .from('timeline_events')
      .insert(event)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, event: Partial<TimelineEvent>): Promise<TimelineEvent> {
    const { data, error } = await supabase
      .from('timeline_events')
      .update({ ...event, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('timeline_events').delete().eq('id', id);
    if (error) throw error;
  },

  async toggleActive(id: string, isActive: boolean): Promise<void> {
    const { error } = await supabase
      .from('timeline_events')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  },
};

// ============================================
// REVIEWS API
// ============================================
export const reviewsApi = {
  async getAll(): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, books(title, slug)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getByBook(bookId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getFeatured(bookId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_approved', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async create(review: Partial<Review>): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async approve(id: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id);
    if (error) throw error;
  },

  async toggleFeatured(id: string, isFeatured: boolean): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .update({ is_featured: isFeatured })
      .eq('id', id);
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) throw error;
  },
};

// ============================================
// SETTINGS API
// ============================================
export const settingsApi = {
  async get(): Promise<SiteSettings | null> {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();
    if (error) return null;
    return data;
  },

  async update(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const { data, error } = await supabase
      .from('settings')
      .update({ ...settings, updated_at: new Date().toISOString() })
      .eq('id', '1')
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async create(settings: SiteSettings): Promise<SiteSettings> {
    const { data, error } = await supabase
      .from('settings')
      .insert({ ...settings, id: '1' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ============================================
// STATS API
// ============================================
export const statsApi = {
  async incrementVisitor(): Promise<void> {
    await supabase.rpc('increment_daily_visitor');
  },

  async getTodayStats(): Promise<{ visitor_count: number; date: string } | null> {
    const { data, error } = await supabase
      .from('daily_stats')
      .select('visitor_count, date')
      .eq('date', new Date().toISOString().split('T')[0])
      .single();
    if (error) return null;
    return data;
  },

  async getStatsByDateRange(startDate: string, endDate: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('daily_stats')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });
    if (error) throw error;
    return data || [];
  },
};

// ============================================
// AUTH API
// ============================================
export const authApi = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
  },
};

// ============================================
// STORAGE API
// ============================================
export const storageApi = {
  async uploadImage(file: File, path: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Yükleme hatası: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  },

  async deleteImage(url: string): Promise<void> {
    const path = url.split('/').pop();
    if (!path) return;
    await supabase.storage.from('images').remove([path]);
  },

  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};
