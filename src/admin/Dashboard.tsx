import { useEffect, useState } from 'react';
import { BookOpen, Eye, TrendingUp, Calendar, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { booksApi } from '@/lib/supabase';
import type { Book } from '@/types';

interface Stats {
  totalBooks: number;
  publishedBooks: number;
  featuredBooks: number;
  totalViews: number;
}

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalBooks: 0,
    publishedBooks: 0,
    featuredBooks: 0,
    totalViews: 0,
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await booksApi.getAll();
      setBooks(data);
      
      // Calculate stats
      setStats({
        totalBooks: data.length,
        publishedBooks: data.filter(b => b.status === 'published').length,
        featuredBooks: data.filter(b => b.is_featured).length,
        totalViews: data.reduce((sum, b) => sum + (b.view_count || 0), 0),
      });
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Toplam Kitap', 
      value: stats.totalBooks, 
      icon: BookOpen,
      color: 'var(--beyboru-gold)'
    },
    { 
      title: 'Yayında', 
      value: stats.publishedBooks, 
      icon: TrendingUp,
      color: 'var(--beyboru-accent-light)'
    },
    { 
      title: 'Öne Çıkan', 
      value: stats.featuredBooks, 
      icon: Eye,
      color: 'var(--beyboru-gold-light)'
    },
    { 
      title: 'Toplam Görüntülenme', 
      value: stats.totalViews.toLocaleString('tr-TR'), 
      icon: Calendar,
      color: 'var(--beyboru-text-muted)'
    },
  ];

  const recentBooks = books.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-playfair font-bold mb-2" style={{ color: 'var(--beyboru-text)' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--beyboru-text-muted)' }}>
          Site istatistikleri ve genel bakış
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index}
              className="beyboru-card"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1" style={{ color: 'var(--beyboru-text-muted)' }}>
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                      {loading ? '-' : stat.value}
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Books */}
      <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
        <CardHeader>
          <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
            Son Eklenen Kitaplar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--beyboru-surface-light)' }} />
              ))}
            </div>
          ) : recentBooks.length > 0 ? (
            <div className="space-y-3">
              {recentBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-4 p-3 rounded-lg transition-colors"
                  style={{ backgroundColor: 'var(--beyboru-bg)' }}
                >
                  <img
                    src={book.cover_image || '/placeholder-book.png'}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate" style={{ color: 'var(--beyboru-text)' }}>
                      {book.title}
                    </h3>
                    <p className="text-sm truncate" style={{ color: 'var(--beyboru-text-muted)' }}>
                      {book.status === 'published' ? 'Yayında' : 
                       book.status === 'draft' ? 'Taslak' : 'Arşiv'}
                    </p>
                  </div>
                  <span 
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: book.status === 'published' ? 'rgba(34, 197, 94, 0.2)' : 
                                      book.status === 'draft' ? 'rgba(234, 179, 8, 0.2)' : 
                                      'rgba(107, 114, 128, 0.2)',
                      color: book.status === 'published' ? '#22c55e' : 
                             book.status === 'draft' ? '#eab308' : 
                             '#6b7280'
                    }}
                  >
                    {book.view_count || 0} görüntülenme
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--beyboru-text-subtle)' }} />
              <p style={{ color: 'var(--beyboru-text-muted)' }}>
                Henüz kitap eklenmemiş
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <CardHeader>
            <CardTitle className="font-playfair text-lg" style={{ color: 'var(--beyboru-text)' }}>
              Hızlı İşlemler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/kitaplar/yeni"
              className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-white/5"
              style={{ backgroundColor: 'var(--beyboru-bg)' }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--beyboru-accent)' }}
              >
                <BookOpen className="w-5 h-5" style={{ color: 'var(--beyboru-text)' }} />
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--beyboru-text)' }}>
                  Yeni Kitap Ekle
                </p>
                <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                  Yeni bir kitap tanıtımı oluştur
                </p>
              </div>
            </a>
            <a
              href="/admin/ayarlar"
              className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-white/5"
              style={{ backgroundColor: 'var(--beyboru-bg)' }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--beyboru-gold)', opacity: 0.8 }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--beyboru-bg)' }} />
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--beyboru-text)' }}>
                  Site Ayarları
                </p>
                <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                  Genel ayarları düzenle
                </p>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <CardHeader>
            <CardTitle className="font-playfair text-lg" style={{ color: 'var(--beyboru-text)' }}>
              Tema Değiştir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4" style={{ color: 'var(--beyboru-text-muted)' }}>
              Sitenizin görünümünü değiştirmek için tema ayarlarına gidin.
            </p>
            <a
              href="/admin/tema"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: 'var(--beyboru-accent)',
                color: 'var(--beyboru-text)'
              }}
            >
              <Palette className="w-4 h-4" />
              Temaya Git
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
