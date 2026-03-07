import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Share2, BookOpen, Calendar, Hash, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { booksApi } from '@/lib/supabase';
import type { Book } from '@/types';

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) {
      loadBook();
    }
  }, [slug]);

  const loadBook = async () => {
    try {
      const data = await booksApi.getBySlug(slug!);
      if (data) {
        setBook(data);
        // Increment view count
        await booksApi.incrementView(slug!);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error loading book:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title,
          text: book?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--beyboru-text-subtle)' }} />
          <h1 className="font-playfair text-2xl mb-2" style={{ color: 'var(--beyboru-text)' }}>
            Kitap Bulunamadı
          </h1>
          <p className="mb-6" style={{ color: 'var(--beyboru-text-muted)' }}>
            Aradığınız kitap mevcut değil veya kaldırılmış olabilir.
          </p>
          <Link to="/kitaplar">
            <Button className="beyboru-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kitaplara Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      {/* Header */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/kitaplar"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-[var(--beyboru-gold)]"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm Kitaplara Dön
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image */}
            <div className="relative">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
              >
                <img
                  src={book.cover_image || '/placeholder-book.png'}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {book.is_new && (
                    <span 
                      className="px-3 py-1 text-sm font-medium rounded-full"
                      style={{ 
                        backgroundColor: 'var(--beyboru-gold)',
                        color: 'var(--beyboru-bg)',
                      }}
                    >
                      Yeni
                    </span>
                  )}
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: 'var(--beyboru-surface)',
                  border: '1px solid var(--beyboru-border)',
                }}
              >
                <Share2 className="w-5 h-5" style={{ color: 'var(--beyboru-text)' }} />
              </button>
            </div>

            {/* Right: Details */}
            <div className="space-y-8">
              {/* Title */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.category?.map((cat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full capitalize"
                      style={{
                        backgroundColor: 'var(--beyboru-surface)',
                        color: 'var(--beyboru-text-muted)',
                        border: '1px solid var(--beyboru-border)',
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                
                <h1 
                  className="font-playfair text-4xl sm:text-5xl font-bold mb-3"
                  style={{ color: 'var(--beyboru-text)' }}
                >
                  {book.title}
                </h1>
                
                {book.subtitle && (
                  <p 
                    className="text-xl font-playfair italic"
                    style={{ color: 'var(--beyboru-gold)' }}
                  >
                    {book.subtitle}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--beyboru-text-muted)' }}
                >
                  {book.description}
                </p>
              </div>

              {/* Full Description */}
              {book.full_description && (
                <div 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                >
                  <h3 
                    className="font-playfair text-lg font-semibold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    <FileText className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                    Kitap Hakkında
                  </h3>
                  <div 
                    className="prose prose-invert max-w-none whitespace-pre-line"
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {book.full_description}
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {book.page_count && (
                  <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                    <CardContent className="p-4 text-center">
                      <BookOpen className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>Sayfa</p>
                      <p className="font-semibold" style={{ color: 'var(--beyboru-text)' }}>{book.page_count}</p>
                    </CardContent>
                  </Card>
                )}
                
                {book.isbn && (
                  <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                    <CardContent className="p-4 text-center">
                      <Hash className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>ISBN</p>
                      <p className="font-semibold text-xs" style={{ color: 'var(--beyboru-text)' }}>{book.isbn}</p>
                    </CardContent>
                  </Card>
                )}
                
                {book.publish_date && (
                  <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>Yayın Tarihi</p>
                      <p className="font-semibold" style={{ color: 'var(--beyboru-text)' }}>
                        {new Date(book.publish_date).toLocaleDateString('tr-TR')}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div>
                  <p className="text-sm mb-3" style={{ color: 'var(--beyboru-text-muted)' }}>
                    Etiketler
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{
                          backgroundColor: 'var(--beyboru-bg)',
                          color: 'var(--beyboru-text-muted)',
                          border: '1px solid var(--beyboru-border)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {book.kdy_link && (
                  <a
                    href={book.kdy_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button 
                      size="lg"
                      className="w-full beyboru-button group"
                    >
                      Satın Al
                      <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </a>
                )}
                
                {book.price && (
                  <div 
                    className="flex items-center justify-center px-6 py-3 rounded-xl"
                    style={{ 
                      backgroundColor: 'var(--beyboru-surface)',
                      border: '1px solid var(--beyboru-border)',
                    }}
                  >
                    <span className="text-sm mr-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      Fiyat:
                    </span>
                    <span 
                      className="text-2xl font-playfair font-bold"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      {book.price} TL
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
