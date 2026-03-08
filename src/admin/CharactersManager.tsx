import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, User, Eye, EyeOff } from 'lucide-react';
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
import { charactersApi, booksApi } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Character, Book } from '@/types';

const roleOptions = [
  { value: 'protagonist', label: 'Baş Karakter' },
  { value: 'antagonist', label: 'Anti-Kahraman' },
  { value: 'supporting', label: 'Yan Karakter' },
  { value: 'minor', label: 'Küçük Karakter' },
];

export default function CharactersManager() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [formData, setFormData] = useState<{
    book_id: string;
    name: string;
    slug: string;
    role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
    short_description: string;
    full_description: string;
    traits: string;
    appears_in: string;
    order_index: number;
    is_active: boolean;
  }>({
    book_id: '',
    name: '',
    slug: '',
    role: 'supporting',
    short_description: '',
    full_description: '',
    traits: '',
    appears_in: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [charsData, booksData] = await Promise.all([
        charactersApi.getAll(),
        booksApi.getAll(),
      ]);
      setCharacters(charsData);
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
        traits: formData.traits.split(',').map(t => t.trim()).filter(Boolean),
        appears_in: formData.appears_in.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (editingCharacter) {
        await charactersApi.update(editingCharacter.id, data);
        toast.success('Karakter güncellendi');
      } else {
        await charactersApi.create(data);
        toast.success('Karakter eklendi');
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu karakteri silmek istediğinize emin misiniz?')) return;
    try {
      await charactersApi.delete(id);
      toast.success('Karakter silindi');
      loadData();
    } catch (error) {
      toast.error('Silme işlemi başarısız');
    }
  };

  const handleToggleActive = async (character: Character) => {
    try {
      await charactersApi.toggleActive(character.id, !character.is_active);
      toast.success(character.is_active ? 'Karakter gizlendi' : 'Karakter aktif edildi');
      loadData();
    } catch (error) {
      toast.error('İşlem başarısız');
    }
  };

  const openEditDialog = (character: Character) => {
    setEditingCharacter(character);
    setFormData({
      book_id: character.book_id,
      name: character.name,
      slug: character.slug,
      role: character.role,
      short_description: character.short_description,
      full_description: character.full_description || '',
      traits: character.traits?.join(', ') || '',
      appears_in: character.appears_in?.join(', ') || '',
      order_index: character.order_index,
      is_active: character.is_active,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCharacter(null);
    setFormData({
      book_id: books[0]?.id || '',
      name: '',
      slug: '',
      role: 'supporting',
      short_description: '',
      full_description: '',
      traits: '',
      appears_in: '',
      order_index: 0,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const filteredCharacters = characters.filter(
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
        <h1 className="font-playfair text-3xl font-bold">Karakterler</h1>
        <Button onClick={openCreateDialog} className="beyboru-button">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Karakter
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        <Input
          placeholder="Karakter ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 beyboru-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => (
          <Card
            key={character.id}
            className={`${!character.is_active ? 'opacity-50' : ''}`}
            style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{character.name}</CardTitle>
                    <p className="text-sm text-white/50">
                      {roleOptions.find((r) => r.value === character.role)?.label}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleActive(character)}
                  >
                    {character.is_active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(character)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(character.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-2">
                {character.short_description}
              </p>
              <p className="text-xs text-white/50 mt-2">
                {character.books?.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <DialogHeader>
            <DialogTitle>
              {editingCharacter ? 'Karakter Düzenle' : 'Yeni Karakter'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kitap</Label>
                <Select
                  value={formData.book_id}
                  onValueChange={(v) => setFormData({ ...formData, book_id: v })}
                >
                  <SelectTrigger className="beyboru-input">
                    <SelectValue placeholder="Kitap seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select
                  value={formData.role}
                  onValueChange={(v: any) => setFormData({ ...formData, role: v })}
                >
                  <SelectTrigger className="beyboru-input">
                    <SelectValue placeholder="Rol seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>İsim</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="beyboru-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="beyboru-input"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kısa Açıklama</Label>
              <Textarea
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="beyboru-input"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tam Açıklama</Label>
              <Textarea
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                className="beyboru-input"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Özellikler (virgülle ayırın)</Label>
                <Input
                  value={formData.traits}
                  onChange={(e) => setFormData({ ...formData, traits: e.target.value })}
                  className="beyboru-input"
                  placeholder="cesur, zeki, sadık"
                />
              </div>
              <div className="space-y-2">
                <Label>Geçtiği Kitaplar (virgülle ayırın)</Label>
                <Input
                  value={formData.appears_in}
                  onChange={(e) => setFormData({ ...formData, appears_in: e.target.value })}
                  className="beyboru-input"
                  placeholder="Ergenekod, Kudüs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sıra Numarası</Label>
              <Input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                className="beyboru-input"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit" className="beyboru-button">
                {editingCharacter ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
