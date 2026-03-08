import { useEffect, useState } from 'react';
import { Check, Star, Trash2, Search, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { reviewsApi, booksApi } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Review, Book } from '@/types';

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [_books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [reviewsData, booksData] = await Promise.all([
        reviewsApi.getAll(),
        booksApi.getAll(),
      ]);
      setReviews(reviewsData);
      setBooks(booksData);
    } catch (error) {
      toast.error('Veriler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await reviewsApi.approve(id);
      toast.success('Yorum onaylandı');
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const handleToggleFeatured = async (review: Review) => {
    try {
      await reviewsApi.toggleFeatured(review.id, !review.is_featured);
      toast.success(review.is_featured ? 'Öne çıkarma kaldırıldı' : 'Yorum öne çıkarıldı');
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;
    try {
      await reviewsApi.delete(id);
      toast.success('Yorum silindi');
      loadData();
    } catch (error) {
      toast.error('Silme işlemi başarısız');
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.reviewer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'approved'
        ? r.is_approved
        : !r.is_approved;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => !r.is_approved).length,
    approved: reviews.filter((r) => r.is_approved).length,
    featured: reviews.filter((r) => r.is_featured).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-playfair text-3xl font-bold">Yorumlar</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-white/50">Toplam</p>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: '#f59e0b' }}>{stats.pending}</p>
            <p className="text-sm text-white/50">Bekleyen</p>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>{stats.approved}</p>
            <p className="text-sm text-white/50">Onaylı</p>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--beyboru-gold)' }}>{stats.featured}</p>
            <p className="text-sm text-white/50">Öne Çıkan</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            placeholder="Yorum ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 beyboru-input"
          />
        </div>
        <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
          <SelectTrigger className="w-40 beyboru-input">
            <SelectValue placeholder="Filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="pending">Bekleyen</SelectItem>
            <SelectItem value="approved">Onaylı</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card
            key={review.id}
            className={`${!review.is_approved ? 'border-yellow-500/30' : ''}`}
            style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{review.reviewer_name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                            style={{ color: i < review.rating ? 'var(--beyboru-gold)' : 'var(--beyboru-text-subtle)' }}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/50">• {review.books?.title}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!review.is_approved && (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-400">
                      Onay Bekliyor
                    </span>
                  )}
                  {review.is_featured && (
                    <span className="px-2 py-1 text-xs rounded bg-[var(--beyboru-gold)]/20 text-[var(--beyboru-gold)]">
                      Öne Çıkan
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">"{review.comment}"</p>
              <div className="flex gap-2">
                {!review.is_approved && (
                  <Button size="sm" onClick={() => handleApprove(review.id)} className="bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4 mr-1" />
                    Onayla
                  </Button>
                )}
                {review.is_approved && (
                  <Button size="sm" variant="outline" onClick={() => handleToggleFeatured(review)}>
                    {review.is_featured ? 'Öne Çıkarma' : 'Öne Çıkar'}
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => handleDelete(review.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
