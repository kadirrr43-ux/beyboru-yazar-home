import { createClient } from '@supabase/supabase-js';
import type { Book, SiteSettings } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mnohwgtlvpxjgqrwgjte.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ub2h3Z3RsdnB4amdxcndnanRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4Mjg0NzUsImV4cCI6MjA4ODQwNDQ3NX0.vVgGEgSeXmmSHqbNDChV70D-PfOyHJI2lDO_9Boc-xM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Books API
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
      .update(book)
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

// Settings API
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
      .update(settings)
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

// Auth API
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

// Storage API
export const storageApi = {
  async uploadImage(file: File, path: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  },

  async deleteImage(url: string): Promise<void> {
    const path = url.split('/').pop();
    if (!path) return;
    await supabase.storage.from('images').remove([path]);
  },
};
