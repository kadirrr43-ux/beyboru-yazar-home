import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { timelineApi, booksApi } from '@/lib/supabase';
import { toast } from 'sonner';
import type { TimelineEvent, Book } from '@/types';

const eraOptions = [
  { value: 'ancient', label: 'Kadim Çağ' },
  { value: 'medieval', label: 'Orta Çağ' },
  { value: 'modern', label: 'Modern Çağ' },
  { value: 'future', label: 'Günümüz/Gelecek' },
];

export default function TimelineManager() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [formData, setFormData] = useState<{
    book_id: string;
    year: string;
    title: string;
    description: string;
    era: 'ancient' | 'medieval' | 'modern' | 'future';
    related_books: string;
    related_characters: string;
    related_locations: string;
    order_index: number;
    is_active: boolean;
  }>({
    book_id: '',
    year: '',
    title: '',
    description: '',
    era: 'modern',
    related_books: '',
    related_characters: '',
    related_locations: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsData, booksData] = await Promise.all([
        timelineApi.getAll(),
        booksApi.getAll(),
      ]);
      setEvents(eventsData);
      setBooks(booksData);
    } catch (error) {
      toast.error('Veriler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        related_books: formData.related_books.split(',').map(t => t.trim()).filter(Boolean),
        related_characters: formData.related_characters.split(',').map(t => t.trim()).filter(Boolean),
        related_locations: formData.related_locations.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (editingEvent) {
        await timelineApi.update(editingEvent.id, data);
        toast.success('Olay güncellendi');
      } else {
        await timelineApi.create(data);
        toast.success('Olay eklendi');
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu olayı silmek istediğinize emin misiniz?')) return;
    try {
      await timelineApi.delete(id);
      toast.success('Olay silindi');
      loadData();
    } catch (error) {
      toast.error('Silme işlemi başarısız');
    }
  };

  const handleToggleActive = async (event: TimelineEvent) => {
    try {
      await timelineApi.toggleActive(event.id, !event.is_active);
      toast.success(event.is_active ? 'Olay gizlendi' : 'Olay aktif edildi');
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const openEditDialog = (event: TimelineEvent) => {
    setEditingEvent(event);
    setFormData({
      book_id: event.book_id,
      year: event.year,
      title: event.title,
      description: event.description,
      era: event.era,
      related_books: event.related_books?.join(', ') || '',
      related_characters: event.related_characters?.join(', ') || '',
      related_locations: event.related_locations?.join(', ') || '',
      order_index: event.order_index,
      is_active: event.is_active,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingEvent(null);
    setFormData({
      book_id: books[0]?.id || '',
      year: '',
      title: '',
      description: '',
      era: 'modern',
      related_books: '',
      related_characters: '',
      related_locations: '',
      order_index: 0,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.year.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="font-playfair text-3xl font-bold">Zaman Çizelgesi</h1>
        <Button onClick={openCreateDialog} className="beyboru-button">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Olay
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        <Input
          placeholder="Olay ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 beyboru-input"
        />
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className={`${!event.is_active ? 'opacity-50' : ''}`}
            style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold" style={{ color: 'var(--beyboru-gold)' }}>
                      {event.year}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <p className="text-sm text-white/50">
                      {eraOptions.find((e) => e.value === event.era)?.label}
                      {event.books?.title && ` • ${event.books.title}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleToggleActive(event)}>
                    {event.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(event)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Olay Düzenle' : 'Yeni Olay'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kitap</Label>
                <Select value={formData.book_id} onValueChange={(v) => setFormData({ ...formData, book_id: v })}>
                  <SelectTrigger className="beyboru-input"><SelectValue placeholder="Kitap seçin" /></SelectTrigger>
                  <SelectContent>
                    {books.map((book) => (<SelectItem key={book.id} value={book.id}>{book.title}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Dönem</Label>
                <Select value={formData.era} onValueChange={(v: any) => setFormData({ ...formData, era: v })}>
                  <SelectTrigger className="beyboru-input"><SelectValue placeholder="Dönem seçin" /></SelectTrigger>
                  <SelectContent>
                    {eraOptions.map((e) => (<SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Yıl</Label>
                <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="beyboru-input" placeholder="Örn: MÖ 209, 1970, Günümüz" required />
              </div>
              <div className="space-y-2">
                <Label>Başlık</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="beyboru-input" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Açıklama</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="beyboru-input" rows={4} required />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>İlgili Kitaplar</Label>
                <Input value={formData.related_books} onChange={(e) => setFormData({ ...formData, related_books: e.target.value })} className="beyboru-input" placeholder="virgülle ayırın" />
              </div>
              <div className="space-y-2">
                <Label>İlgili Karakterler</Label>
                <Input value={formData.related_characters} onChange={(e) => setFormData({ ...formData, related_characters: e.target.value })} className="beyboru-input" placeholder="virgülle ayırın" />
              </div>
              <div className="space-y-2">
                <Label>İlgili Lokasyonlar</Label>
                <Input value={formData.related_locations} onChange={(e) => setFormData({ ...formData, related_locations: e.target.value })} className="beyboru-input" placeholder="virgülle ayırın" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sıra Numarası</Label>
              <Input type="number" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })} className="beyboru-input" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
              <Button type="submit" className="beyboru-button">{editingEvent ? 'Güncelle' : 'Ekle'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
