import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, MapPin, Eye, EyeOff } from 'lucide-react';
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
import { locationsApi, booksApi } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Location, Book } from '@/types';

const typeOptions = [
  { value: 'city', label: 'Şehir' },
  { value: 'country', label: 'Ülke' },
  { value: 'landmark', label: 'Yer' },
  { value: 'mystery', label: 'Gizemli' },
  { value: 'region', label: 'Bölge' },
  { value: 'building', label: 'Bina' },
];

export default function LocationsManager() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<{
    book_id: string;
    name: string;
    slug: string;
    type: 'city' | 'country' | 'landmark' | 'mystery' | 'region' | 'building';
    region: string;
    short_description: string;
    full_description: string;
    significance: string;
    related_books: string;
    order_index: number;
    is_active: boolean;
  }>({
    book_id: '',
    name: '',
    slug: '',
    type: 'city',
    region: '',
    short_description: '',
    full_description: '',
    significance: '',
    related_books: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [locsData, booksData] = await Promise.all([
        locationsApi.getAll(),
        booksApi.getAll(),
      ]);
      setLocations(locsData);
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
      };

      if (editingLocation) {
        await locationsApi.update(editingLocation.id, data);
        toast.success('Lokasyon güncellendi');
      } else {
        await locationsApi.create(data);
        toast.success('Lokasyon eklendi');
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu lokasyonu silmek istediğinize emin misiniz?')) return;
    try {
      await locationsApi.delete(id);
      toast.success('Lokasyon silindi');
      loadData();
    } catch (error) {
      toast.error('Silme işlemi başarısız');
    }
  };

  const handleToggleActive = async (location: Location) => {
    try {
      await locationsApi.toggleActive(location.id, !location.is_active);
      toast.success(location.is_active ? 'Lokasyon gizlendi' : 'Lokasyon aktif edildi');
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const openEditDialog = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      book_id: location.book_id,
      name: location.name,
      slug: location.slug,
      type: location.type,
      region: location.region || '',
      short_description: location.short_description,
      full_description: location.full_description || '',
      significance: location.significance || '',
      related_books: location.related_books?.join(', ') || '',
      order_index: location.order_index,
      is_active: location.is_active,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingLocation(null);
    setFormData({
      book_id: books[0]?.id || '',
      name: '',
      slug: '',
      type: 'city',
      region: '',
      short_description: '',
      full_description: '',
      significance: '',
      related_books: '',
      order_index: 0,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const filteredLocations = locations.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.region?.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="font-playfair text-3xl font-bold">Lokasyonlar</h1>
        <Button onClick={openCreateDialog} className="beyboru-button">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Lokasyon
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        <Input
          placeholder="Lokasyon ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 beyboru-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location) => (
          <Card
            key={location.id}
            className={`${!location.is_active ? 'opacity-50' : ''}`}
            style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <p className="text-sm text-white/50">
                      {typeOptions.find((t) => t.value === location.type)?.label}
                      {location.region && ` • ${location.region}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleActive(location)}
                  >
                    {location.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(location)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(location.id)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-2">{location.short_description}</p>
              <p className="text-xs text-white/50 mt-2">{location.books?.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <DialogHeader>
            <DialogTitle>{editingLocation ? 'Lokasyon Düzenle' : 'Yeni Lokasyon'}</DialogTitle>
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
                <Label>Tip</Label>
                <Select value={formData.type} onValueChange={(v: any) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger className="beyboru-input"><SelectValue placeholder="Tip seçin" /></SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>İsim</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="beyboru-input" required />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="beyboru-input" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bölge</Label>
              <Input value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className="beyboru-input" placeholder="Örn: Moğolistan, Türkiye" />
            </div>

            <div className="space-y-2">
              <Label>Kısa Açıklama</Label>
              <Textarea value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} className="beyboru-input" rows={2} required />
            </div>

            <div className="space-y-2">
              <Label>Tam Açıklama</Label>
              <Textarea value={formData.full_description} onChange={(e) => setFormData({ ...formData, full_description: e.target.value })} className="beyboru-input" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Önemi</Label>
              <Textarea value={formData.significance} onChange={(e) => setFormData({ ...formData, significance: e.target.value })} className="beyboru-input" rows={2} placeholder="Bu yerin hikayedeki önemi nedir?" />
            </div>

            <div className="space-y-2">
              <Label>İlgili Kitaplar (virgülle ayırın)</Label>
              <Input value={formData.related_books} onChange={(e) => setFormData({ ...formData, related_books: e.target.value })} className="beyboru-input" placeholder="Ergenekod, Kudüs" />
            </div>

            <div className="space-y-2">
              <Label>Sıra Numarası</Label>
              <Input type="number" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })} className="beyboru-input" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
              <Button type="submit" className="beyboru-button">{editingLocation ? 'Güncelle' : 'Ekle'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
