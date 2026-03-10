import { useEffect, useState } from 'react';
import { BookOpen, Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import BookCard from './BookCard';
import { booksApi } from '@/lib/supabase';
import { fetchAllKDYBooks } from '@/lib/kdy';
import type { Book } from '@/types';

export default function BooksSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, selectedCategory]);

  const loadBooks = async () => {
    try {
      // Supabase'den kitapları çek
      const supabaseBooks = await booksApi.getPublished();
      
      // KDY'den kitapları çek
      const kdyData = await fetchAllKDYBooks();
      
      // KDY kitaplarını Book formatına dönüştür
      const kdyAsBooks: Book[] = kdyData.map(kdy => ({
        id: kdy.id,
        slug: kdy.id,
        title: kdy.title,
        subtitle: kdy.subtitle,
        description: kdy.description,
        full_description: kdy.fullDescription,
        cover_image: kdy.coverImage,
        kdy_link: kdy.kdyLink,
        kdy_book_id: kdy.kdyBookId,
        price: kdy.price,
        page_count: kdy.pageCount,
        isbn: kdy.isbn,
        publish_date: kdy.publishDate,
        category: ['edebiyat'],
        tags: [],
        status: 'published',
        is_featured: true,
        is_new: true,
        view_count: 0,
        created_at: kdy.publishDate,
        updated_at: kdy.publishDate,
      }));
      
      // Supabase ve KDY kitaplarını birleştir
      const allBooks = [...supabaseBooks, ...kdyAsBooks];
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    } catch (error) {
      console.error('Error loading books:', error);
      // Hata durumunda sadece KDY kitaplarını göster
      const kdyData = await fetchAllKDYBooks();
      const kdyAsBooks: Book[] = kdyData.map(kdy => ({
        id: kdy.id,
        slug: kdy.id,
        title: kdy.title,
        subtitle: kdy.subtitle,
        description: kdy.description,
        full_description: kdy.fullDescription,
        cover_image: kdy.coverImage,
        kdy_link: kdy.kdyLink,
        kdy_book_id: kdy.kdyBookId,
        price: kdy.price,
        page_count: kdy.pageCount,
        isbn: kdy.isbn,
        publish_date: kdy.publishDate,
        category: ['edebiyat'],
        tags: [],
        status: 'published',
        is_featured: true,
        is_new: true,
        view_count: 0,
        created_at: kdy.publishDate,
        updated_at: kdy.publishDate,
      }));
      setBooks(kdyAsBooks);
      setFilteredBooks(kdyAsBooks);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((book) => book.category?.includes(selectedCategory));
    }

    setFilteredBooks(filtered);
  };

  // Get unique categories
  const categories = ['all', ...new Set(books.flatMap((book) => book.category || []))];

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="aspect-[2/3] rounded-2xl animate-pulse"
                style={{ backgroundColor: 'var(--beyboru-surface)' }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--beyboru-gold)',
            }}
          >
            <BookOpen className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
              Kitaplarım
            </span>
          </div>
          <h2 
            className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: 'var(--beyboru-text)' }}
          >
            Son Çıkanlar
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            Tarih, mitoloji ve modern dünyanın kesişiminde yazılmış eserler
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
              style={{ color: 'var(--beyboru-text-muted)' }} 
            />
            <Input
              placeholder="Kitap ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 beyboru-input"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                style={{
                  backgroundColor: selectedCategory === cat 
                    ? 'var(--beyboru-accent)' 
                    : 'var(--beyboru-surface)',
                  color: selectedCategory === cat 
                    ? 'var(--beyboru-text)' 
                    : 'var(--beyboru-text-muted)',
                  border: `1px solid ${selectedCategory === cat 
                    ? 'var(--beyboru-accent)' 
                    : 'var(--beyboru-border)'}`,
                }}
              >
                {cat === 'all' ? 'Tümü' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen 
              className="w-16 h-16 mx-auto mb-4" 
              style={{ color: 'var(--beyboru-text-subtle)' }} 
            />
            <h3 
              className="font-playfair text-xl mb-2"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Kitap bulunamadı
            </h3>
            <p style={{ color: 'var(--beyboru-text-muted)' }}>
              Arama kriterlerinize uygun kitap yok
            </p>
          </div>
        )}

        {/* KDY Link */}
        <div className="mt-12 text-center">
          <a
            href="https://www.kitapyurdu.com/yazar/beyboru/290784.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:scale-105"
            style={{ 
              backgroundColor: 'var(--beyboru-surface)',
              border: '1px solid var(--beyboru-border)',
              color: 'var(--beyboru-text)',
            }}
          >
            <span>Tüm Kitaplarımı Kitapyurdu'nda Gör</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
