import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { booksApi } from '@/lib/supabase';
import { useBooksStore } from '@/store';
import type { Book } from '@/types';

export default function BooksList() {
  const { books, setBooks, deleteBook } = useBooksStore();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!bookToDelete) return;
    
    try {
      await booksApi.delete(bookToDelete.id);
      deleteBook(bookToDelete.id);
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const configs = {
      published: { label: 'Yayında', bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
      draft: { label: 'Taslak', bg: 'rgba(234, 179, 8, 0.2)', color: '#eab308' },
      archived: { label: 'Arşiv', bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' },
    };
    const config = configs[status as keyof typeof configs] || configs.draft;
    return (
      <span 
        className="px-2 py-1 text-xs rounded-full font-medium"
        style={{ backgroundColor: config.bg, color: config.color }}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold mb-1" style={{ color: 'var(--beyboru-text)' }}>
            Kitaplar
          </h1>
          <p style={{ color: 'var(--beyboru-text-muted)' }}>
            Tüm kitapları yönetin
          </p>
        </div>
        <Link to="/admin/kitaplar/yeni">
          <Button className="beyboru-button">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kitap
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--beyboru-text-muted)' }} />
              <Input
                placeholder="Kitap ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 beyboru-input"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm beyboru-input"
              >
                <option value="all">Tümü</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşiv</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse" style={{ backgroundColor: 'var(--beyboru-surface)' }}>
              <CardContent className="p-4">
                <div className="h-48 rounded-lg mb-4" style={{ backgroundColor: 'var(--beyboru-surface-light)' }} />
                <div className="h-4 rounded w-3/4 mb-2" style={{ backgroundColor: 'var(--beyboru-surface-light)' }} />
                <div className="h-3 rounded w-1/2" style={{ backgroundColor: 'var(--beyboru-surface-light)' }} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <Card 
              key={book.id}
              className="group overflow-hidden"
              style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
            >
              <div className="relative">
                <img
                  src={book.cover_image || '/placeholder-book.png'}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(book.status)}
                </div>
                {book.is_featured && (
                  <div 
                    className="absolute top-2 left-2 px-2 py-1 text-xs rounded-full font-medium"
                    style={{ backgroundColor: 'var(--beyboru-gold)', color: 'var(--beyboru-bg)' }}
                  >
                    Öne Çıkan
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-playfair font-semibold text-lg truncate mb-1" style={{ color: 'var(--beyboru-text)' }}>
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="text-sm truncate mb-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                        {book.subtitle}
                      </p>
                    )}
                    <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--beyboru-text-muted)' }}>
                      {book.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--beyboru-text-subtle)' }}>
                      <span>{book.view_count || 0} görüntülenme</span>
                      {book.price && <span>{book.price} TL</span>}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end"
                      style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
                    >
                      <DropdownMenuItem asChild>
                        <Link to={`/kitap/${book.slug}`} target="_blank" className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Görüntüle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/kitaplar/${book.id}`} className="flex items-center gap-2">
                          <Edit2 className="w-4 h-4" />
                          Düzenle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => { setBookToDelete(book); setDeleteDialogOpen(true); }}
                        className="text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card 
          className="text-center py-16"
          style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
        >
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
               style={{ backgroundColor: 'var(--beyboru-surface-light)' }}>
            <Search className="w-8 h-8" style={{ color: 'var(--beyboru-text-muted)' }} />
          </div>
          <h3 className="font-playfair text-lg mb-2" style={{ color: 'var(--beyboru-text)' }}>
            Kitap bulunamadı
          </h3>
          <p className="mb-4" style={{ color: 'var(--beyboru-text-muted)' }}>
            {searchQuery ? 'Arama kriterlerine uygun kitap yok' : 'Henüz kitap eklenmemiş'}
          </p>
          <Link to="/admin/kitaplar/yeni">
            <Button className="beyboru-button">
              <Plus className="w-4 h-4 mr-2" />
              İlk Kitabı Ekle
            </Button>
          </Link>
        </Card>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <DialogHeader>
            <DialogTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
              Kitabı Sil
            </DialogTitle>
            <DialogDescription style={{ color: 'var(--beyboru-text-muted)' }}>
              "{bookToDelete?.title}" kitabını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
            >
              İptal
            </Button>
            <Button 
              onClick={handleDelete}
              style={{ backgroundColor: 'var(--beyboru-accent)', color: 'var(--beyboru-text)' }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
