import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Sparkles, Eye, EyeOff } from 'lucide-react';
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
import { conceptsApi, booksApi } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Concept, Book } from '@/types';

const categoryOptions = [
  { value: 'power', label: 'Güç' },
  { value: 'organization', label: 'Organizasyon' },
  { value: 'artifact', label: 'Eser' },
  { value: 'mystery', label: 'Gizem' },
  { value: 'technology', label: 'Teknoloji' },
  { value: 'culture', label: 'Kültür' },
];

export default function ConceptsManager() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConcept, setEditingConcept] = useState<Concept | null>(null);
  const [formData, setFormData] = useState<{
    book_id: string;
    name: string;
    slug: string;
    category: 'power' | 'organization' | 'artifact' | 'mystery' | 'technology' | 'culture';
    short_description: string;
    full_description: string;
    related_books: string;
    order_index: number;
    is_active: boolean;
  }>({
    book_id: '',
    name: '',
    slug: '',
    category: 'mystery',
    short_description: '',
    full_description: '',
    related_books: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [conceptsData, booksData] = await Promise.all([
        conceptsApi.getAll(),
        booksApi.getAll(),
      ]);
      setConcepts(conceptsData);
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

      if (editingConcept) {
        await conceptsApi.update(editingConcept.id, data);
        toast.success('Kavram güncellendi');
      } else {
        await conceptsApi.create(data);
        toast.success('Kavram eklendi');
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kavramı silmek istediğinize emin misiniz?')) return;
    try {
      await conceptsApi.delete(id);
      toast.success('Kavram silindi');
      loadData();
    } catch (error) {
      toast.error('Silme işlemi başarısız');
    }
  };

  const handleToggleActive = async (concept: Concept) => {
    try {
      await conceptsApi.toggleActive(concept.id, !concept.is_active);
      toast.success(concept.is_active ? 'Kavram gizlendi' : 'Kavram aktif edildi');
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const openEditDialog = (concept: Concept) => {
    setEditingConcept(concept);
    setFormData({
      book_id: concept.book_id,
      name: concept.name,
      slug: concept.slug,
      category: concept.category,
      short_description: concept.short_description,
      full_description: concept.full_description || '',
      related_books: concept.related_books?.join(', ') || '',
      order_index: concept.order_index,
      is_active: concept.is_active,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingConcept(null);
    setFormData({
      book_id: books[0]?.id || '',
      name: '',
      slug: '',
      category: 'mystery',
      short_description: '',
      full_description: '',
      related_books: '',
      order_index: 0,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const filteredConcepts = concepts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.short_description.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="font-playfair text-3xl font-bold">Kavramlar</h1>
        <Button onClick={openCreateDialog} className="beyboru-button">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Kavram
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        <Input
          placeholder="Kavram ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 beyboru-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConcepts.map((concept) => (
          <Card
            key={concept.id}
            className={`${!concept.is_active ? 'opacity-50' : ''}`}
            style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{concept.name}</CardTitle>
                    <p className="text-sm text-white/50">
                      {categoryOptions.find((c) => c.value === concept.category)?.label}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleToggleActive(concept)}>
                    {concept.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(concept)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(concept.id)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-2">{concept.short_description}</p>
              <p className="text-xs text-white/50 mt-2">{concept.books?.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <DialogHeader>
            <DialogTitle>{editingConcept ? 'Kavram Düzenle' : 'Yeni Kavram'}</DialogTitle>
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
                <Label>Kategori</Label>
                <Select value={formData.category} onValueChange={(v: any) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="beyboru-input"><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((c) => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}
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
              <Label>Kısa Açıklama</Label>
              <Textarea value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} className="beyboru-input" rows={2} required />
            </div>

            <div className="space-y-2">
              <Label>Tam Açıklama</Label>
              <Textarea value={formData.full_description} onChange={(e) => setFormData({ ...formData, full_description: e.target.value })} className="beyboru-input" rows={4} />
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
              <Button type="submit" className="beyboru-button">{editingConcept ? 'Güncelle' : 'Ekle'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
