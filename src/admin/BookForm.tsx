import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { booksApi, storageApi } from '@/lib/supabase';
import { useBooksStore } from '@/store';
import type { Book } from '@/types';

const CATEGORIES = [
  'edebiyat',
  'roman',
  'tarih',
  'macera',
  'bilim-kurgu',
  'fantastik',
  'biyografi',
  'şiir',
  'deneme',
];

export default function BookForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addBook, updateBook } = useBooksStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isEditing = !!id;
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    full_description: '',
    cover_image: '',
    kdy_link: '',
    kdy_book_id: '',
    price: undefined,
    page_count: undefined,
    isbn: '',
    publish_date: '',
    category: [],
    tags: [],
    status: 'draft',
    is_featured: false,
    is_new: true,
    seo_title: '',
    seo_description: '',
    seo_keywords: [],
  });

  useEffect(() => {
    if (isEditing) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      const book = await booksApi.getBySlug(id!);
      if (book) {
        setFormData(book);
      } else {
        navigate('/admin/kitaplar');
      }
    } catch (error) {
      console.error('Error loading book:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await storageApi.uploadImage(file, 'books');
      setFormData((prev) => ({ ...prev, cover_image: url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        const updated = await booksApi.update(id!, formData);
        updateBook(updated);
      } else {
        const created = await booksApi.create(formData);
        addBook(created);
      }
      navigate('/admin/kitaplar');
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category?.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...(prev.category || []), cat],
    }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map((t) => t.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map((k) => k.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, seo_keywords: keywords }));
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
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/admin/kitaplar')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-playfair font-bold" style={{ color: 'var(--beyboru-text)' }}>
            {isEditing ? 'Kitabı Düzenle' : 'Yeni Kitap'}
          </h1>
          <p style={{ color: 'var(--beyboru-text-muted)' }}>
            {isEditing ? formData.title : 'Yeni bir kitap tanıtımı oluşturun'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList style={{ backgroundColor: 'var(--beyboru-surface)' }}>
            <TabsTrigger value="general">Genel</TabsTrigger>
            <TabsTrigger value="content">İçerik</TabsTrigger>
            <TabsTrigger value="media">Görsel</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                  Temel Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--beyboru-text)' }}>Kitap Adı *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Örn: Ergenekod"
                      required
                      className="beyboru-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--beyboru-text)' }}>Alt Başlık</Label>
                    <Input
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Örn: Küllerden Doğan Umut"
                      className="beyboru-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>URL Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="ergenekod"
                    required
                    className="beyboru-input font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--beyboru-text)' }}>Fiyat (TL)</Label>
                    <Input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value ? parseFloat(e.target.value) : undefined }))}
                      placeholder="119"
                      className="beyboru-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--beyboru-text)' }}>Sayfa Sayısı</Label>
                    <Input
                      type="number"
                      value={formData.page_count || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, page_count: e.target.value ? parseInt(e.target.value) : undefined }))}
                      placeholder="84"
                      className="beyboru-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--beyboru-text)' }}>ISBN</Label>
                    <Input
                      value={formData.isbn || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isbn: e.target.value }))}
                      placeholder="9786258662054"
                      className="beyboru-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--beyboru-text)' }}>KDY Linki</Label>
                    <Input
                      value={formData.kdy_link || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, kdy_link: e.target.value }))}
                      placeholder="https://www.kitapyurdu.com/kitap/..."
                      className="beyboru-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--beyboru-text)' }}>KDY Kitap ID</Label>
                    <Input
                      value={formData.kdy_book_id || ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, kdy_book_id: e.target.value }))}
                      placeholder="745980"
                      className="beyboru-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Yayın Tarihi</Label>
                  <Input
                    type="date"
                    value={formData.publish_date || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, publish_date: e.target.value }))}
                    className="beyboru-input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                  Durum & Ayarlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Yayın Durumu</Label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as Book['status'] }))}
                    className="w-full px-3 py-2 rounded-lg beyboru-input"
                  >
                    <option value="draft">Taslak</option>
                    <option value="published">Yayında</option>
                    <option value="archived">Arşiv</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
                  <div>
                    <Label style={{ color: 'var(--beyboru-text)' }}>Öne Çıkan</Label>
                    <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                      Ana sayfada göster
                    </p>
                  </div>
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_featured: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
                  <div>
                    <Label style={{ color: 'var(--beyboru-text)' }}>Yeni Etiketi</Label>
                    <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                      "Yeni" rozetini göster
                    </p>
                  </div>
                  <Switch
                    checked={formData.is_new}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_new: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                  Açıklamalar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    Kısa Açıklama * 
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      (Liste görünümünde gösterilir)
                    </span>
                  </Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Kitabın kısa özeti..."
                    required
                    rows={3}
                    className="beyboru-input resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    Tam Açıklama
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      (Detay sayfasında gösterilir)
                    </span>
                  </Label>
                  <Textarea
                    value={formData.full_description || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, full_description: e.target.value }))}
                    placeholder="Kitabın detaylı açıklaması..."
                    rows={10}
                    className="beyboru-input resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                  Kategoriler & Etiketler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Kategoriler</Label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className="px-3 py-1.5 rounded-full text-sm capitalize transition-colors"
                        style={{
                          backgroundColor: formData.category?.includes(cat) 
                            ? 'var(--beyboru-accent)' 
                            : 'var(--beyboru-bg)',
                          color: formData.category?.includes(cat) 
                            ? 'var(--beyboru-text)' 
                            : 'var(--beyboru-text-muted)',
                          border: `1px solid ${formData.category?.includes(cat) 
                            ? 'var(--beyboru-accent)' 
                            : 'var(--beyboru-border)'}`,
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    Etiketler
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      (Virgülle ayırın)
                    </span>
                  </Label>
                  <Input
                    value={formData.tags?.join(', ')}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="türk mitolojisi, bozkurt, macera..."
                    className="beyboru-input"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                  Kapak Görseli
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {formData.cover_image ? (
                  <div className="relative inline-block">
                    <img
                      src={formData.cover_image}
                      alt="Kitap kapağı"
                      className="w-48 h-72 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, cover_image: '' }))}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--beyboru-accent)' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-48 h-72 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors hover:border-solid"
                    style={{ 
                      borderColor: 'var(--beyboru-border)',
                      backgroundColor: 'var(--beyboru-bg)'
                    }}
                  >
                    {uploadingImage ? (
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ImageIcon className="w-10 h-10" style={{ color: 'var(--beyboru-text-muted)' }} />
                        <span className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                          Görsel Yükle
                        </span>
                      </>
                    )}
                  </button>
                )}

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Veya URL ile ekle</Label>
                  <Input
                    value={formData.cover_image || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cover_image: e.target.value }))}
                    placeholder="https://..."
                    className="beyboru-input"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                  SEO Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    SEO Başlığı
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      ({formData.seo_title?.length || 0}/60)
                    </span>
                  </Label>
                  <Input
                    value={formData.seo_title || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seo_title: e.target.value }))}
                    placeholder="Ergenekod | Beybörü | Türk Mitolojisi Romanı"
                    maxLength={60}
                    className="beyboru-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    SEO Açıklaması
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      ({formData.seo_description?.length || 0}/160)
                    </span>
                  </Label>
                  <Textarea
                    value={formData.seo_description || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seo_description: e.target.value }))}
                    placeholder="Ergenekon Destanı'nı yeniden yazan..."
                    maxLength={160}
                    rows={3}
                    className="beyboru-input resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    Anahtar Kelimeler
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      (Virgülle ayırın)
                    </span>
                  </Label>
                  <Input
                    value={formData.seo_keywords?.join(', ')}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    placeholder="ergenekod, beybörü, türk mitolojisi..."
                    className="beyboru-input"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 sticky bottom-0 pb-4" 
             style={{ backgroundColor: 'var(--beyboru-bg)' }}>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/kitaplar')}
            style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
          >
            İptal
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="beyboru-button"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Kaydediliyor...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {isEditing ? 'Güncelle' : 'Kaydet'}
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
