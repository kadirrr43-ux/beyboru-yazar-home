import { useEffect, useState } from 'react';
import { Save, Globe, Mail, FileText, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { settingsApi } from '@/lib/supabase';
import { useSettingsStore } from '@/store';
import type { SiteSettings } from '@/types';

const defaultSettings: SiteSettings = {
  site_title: 'Beybörü Yazar Evi',
  site_description: 'Türk edebiyatının yeni sesi',
  hero_title: 'Beybörü Yazar Evi',
  hero_subtitle: 'Kelimelerin izinde, hikayelerin peşinde...',
  about_title: 'Hakkımda',
  about_content: 'Beybörü, Türk edebiyatına yeni bir soluk getiren bir yazar. Eserlerinde tarih, mitoloji ve modern dünyanın kesişim noktalarını keşfediyor.',
  contact_email: 'iletisim@beyboru.com',
  contact_phone: '',
  social_twitter: '',
  social_instagram: '',
  social_youtube: '',
  seo_default_title: 'Beybörü Yazar Evi',
  seo_default_description: 'Beybörü - Türk edebiyatının yeni sesi. Tarih, mitoloji ve modern dünyanın kesişiminde hikayeler.',
  theme: 'dark',
  primary_color: '#8B3A3A',
  accent_color: '#D4AF37',
};

export default function Settings() {
  const { settings, setSettings } = useSettingsStore();
  const [formData, setFormData] = useState<SiteSettings>(settings || defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsApi.get();
      if (data) {
        setFormData(data);
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const existing = await settingsApi.get();
      if (existing) {
        const updated = await settingsApi.update(formData);
        setSettings(updated);
      } else {
        const created = await settingsApi.create(formData);
        setSettings(created);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
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
      <div>
        <h1 className="text-2xl font-playfair font-bold mb-2" style={{ color: 'var(--beyboru-text)' }}>
          Site Ayarları
        </h1>
        <p style={{ color: 'var(--beyboru-text-muted)' }}>
          Sitenizin genel ayarlarını buradan yönetin
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList style={{ backgroundColor: 'var(--beyboru-surface)' }}>
            <TabsTrigger value="general">Genel</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">Hakkımda</TabsTrigger>
            <TabsTrigger value="contact">İletişim</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2" style={{ color: 'var(--beyboru-text)' }}>
                  <Globe className="w-5 h-5" />
                  Site Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Site Başlığı</Label>
                  <Input
                    value={formData.site_title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, site_title: e.target.value }))}
                    placeholder="Beybörü Yazar Evi"
                    className="beyboru-input"
                  />
                  <p className="text-xs" style={{ color: 'var(--beyboru-text-muted)' }}>
                    Tarayıcı sekmesinde ve başlıklarda gösterilir
                  </p>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Site Açıklaması</Label>
                  <Input
                    value={formData.site_description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, site_description: e.target.value }))}
                    placeholder="Türk edebiyatının yeni sesi"
                    className="beyboru-input"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Tab */}
          <TabsContent value="hero" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2" style={{ color: 'var(--beyboru-text)' }}>
                  <Type className="w-5 h-5" />
                  Hero Bölümü
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Hero Başlık</Label>
                  <Input
                    value={formData.hero_title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hero_title: e.target.value }))}
                    placeholder="Beybörü Yazar Evi"
                    className="beyboru-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Hero Alt Başlık</Label>
                  <Textarea
                    value={formData.hero_subtitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hero_subtitle: e.target.value }))}
                    placeholder="Kelimelerin izinde, hikayelerin peşinde..."
                    rows={2}
                    className="beyboru-input resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2" style={{ color: 'var(--beyboru-text)' }}>
                  <FileText className="w-5 h-5" />
                  Hakkımda Sayfası
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Sayfa Başlığı</Label>
                  <Input
                    value={formData.about_title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, about_title: e.target.value }))}
                    placeholder="Hakkımda"
                    className="beyboru-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>İçerik</Label>
                  <Textarea
                    value={formData.about_content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, about_content: e.target.value }))}
                    placeholder="Kendinizi tanıtın..."
                    rows={10}
                    className="beyboru-input resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2" style={{ color: 'var(--beyboru-text)' }}>
                  <Mail className="w-5 h-5" />
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>E-posta</Label>
                  <Input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="iletisim@beyboru.com"
                    className="beyboru-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Telefon</Label>
                  <Input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contact_phone: e.target.value }))}
                    placeholder="+90 555 123 4567"
                    className="beyboru-input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardHeader>
                <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
                  Sosyal Medya
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Twitter / X</Label>
                  <Input
                    value={formData.social_twitter}
                    onChange={(e) => setFormData((prev) => ({ ...prev, social_twitter: e.target.value }))}
                    placeholder="https://twitter.com/..."
                    className="beyboru-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>Instagram</Label>
                  <Input
                    value={formData.social_instagram}
                    onChange={(e) => setFormData((prev) => ({ ...prev, social_instagram: e.target.value }))}
                    placeholder="https://instagram.com/..."
                    className="beyboru-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>YouTube</Label>
                  <Input
                    value={formData.social_youtube}
                    onChange={(e) => setFormData((prev) => ({ ...prev, social_youtube: e.target.value }))}
                    placeholder="https://youtube.com/..."
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
                  SEO Varsayılanları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    Varsayılan Başlık
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      ({formData.seo_default_title?.length || 0}/60)
                    </span>
                  </Label>
                  <Input
                    value={formData.seo_default_title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seo_default_title: e.target.value }))}
                    placeholder="Beybörü Yazar Evi"
                    maxLength={60}
                    className="beyboru-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: 'var(--beyboru-text)' }}>
                    Varsayılan Açıklama
                    <span className="text-xs ml-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      ({formData.seo_default_description?.length || 0}/160)
                    </span>
                  </Label>
                  <Textarea
                    value={formData.seo_default_description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seo_default_description: e.target.value }))}
                    placeholder="Beybörü - Türk edebiyatının yeni sesi..."
                    maxLength={160}
                    rows={3}
                    className="beyboru-input resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 sticky bottom-0 pb-4"
             style={{ backgroundColor: 'var(--beyboru-bg)' }}>
          {saved && (
            <span className="text-sm" style={{ color: '#22c55e' }}>
              Ayarlar kaydedildi!
            </span>
          )}
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
                Ayarları Kaydet
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
