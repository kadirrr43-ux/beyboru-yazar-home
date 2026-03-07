import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { storageApi } from '@/lib/supabase';
import { useSettingsStore } from '@/store';
import { toast } from 'sonner';

export default function LogoSettings() {
  const { settings, setSettings } = useSettingsStore();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(settings?.logo_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      toast.error('Lütfen bir görsel dosyası seçin');
      return;
    }

    // Dosya boyutu kontrolü (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Dosya boyutu 2MB\'dan küçük olmalıdır');
      return;
    }

    setUploading(true);

    try {
      // Önizleme oluştur
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      let url: string;

      try {
        // Önce Supabase Storage'a yükle
        url = await storageApi.uploadImage(file, 'logos');
        toast.success('Logo başarıyla yüklendi!');
      } catch (storageError: any) {
        // Storage hatası - base64 fallback kullan
        console.warn('Storage hatası, base64 fallback kullanılıyor:', storageError);
        
        if (file.size > 500 * 1024) {
          toast.error('Dosya çok büyük (max 500KB). Lütfen daha küçük bir dosya seçin.');
          setUploading(false);
          return;
        }
        
        url = await storageApi.fileToBase64(file);
        toast.success('Logo base64 olarak kaydedildi (Storage yerine)');
      }
      
      // Ayarları güncelle
      if (settings) {
        const updated = { ...settings, logo_url: url };
        setSettings(updated);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Logo yüklenirken hata: ${error.message || 'Bilinmeyen hata'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    if (settings) {
      const updated = { ...settings, logo_url: '' };
      setSettings(updated);
      setPreviewUrl(null);
      toast.success('Logo kaldırıldı');
    }
  };

  const handleUseDefault = () => {
    // Varsayılan bozkurt logosunu kullan
    if (settings) {
      const updated = { ...settings, logo_url: '' };
      setSettings(updated);
      setPreviewUrl(null);
      toast.success('Varsayılan logo kullanılıyor');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-playfair font-bold mb-2" style={{ color: 'var(--beyboru-text)' }}>
          Logo Ayarları
        </h1>
        <p style={{ color: 'var(--beyboru-text-muted)' }}>
          Site logosunu buradan yükleyebilir veya değiştirebilirsiniz
        </p>
      </div>

      {/* Current Logo */}
      <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
        <CardHeader>
          <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
            Mevcut Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            {/* Logo Preview */}
            <div 
              className="w-48 h-48 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: 'var(--beyboru-bg)',
                border: '2px dashed var(--beyboru-border)',
              }}
            >
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Site Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon 
                    className="w-16 h-16 mx-auto mb-2" 
                    style={{ color: 'var(--beyboru-text-muted)' }} 
                  />
                  <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                    Varsayılan Bozkurt Logosu
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="beyboru-button"
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Yükleniyor...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Yeni Logo Yükle
                  </span>
                )}
              </Button>

              {previewUrl && (
                <Button
                  variant="outline"
                  onClick={handleRemoveLogo}
                  style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Logoyu Kaldır
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleUseDefault}
                style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
              >
                <Check className="w-4 h-4 mr-2" />
                Varsayılanı Kullan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card 
        className="border-dashed"
        style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px dashed var(--beyboru-gold)' }}
      >
        <CardContent className="p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--beyboru-gold)' }} />
          <div>
            <h4 className="font-medium mb-1" style={{ color: 'var(--beyboru-text)' }}>
              Logo Yükleme Kuralları
            </h4>
            <ul className="text-sm space-y-1" style={{ color: 'var(--beyboru-text-muted)' }}>
              <li>• Dosya boyutu en fazla 2MB olmalıdır (base64 için 500KB)</li>
              <li>• PNG, JPG veya SVG formatında olmalıdır</li>
              <li>• Kare veya yatay format önerilir</li>
              <li>• Şeffaf arka plan (PNG) önerilir</li>
              <li>• Storage hatası olursa otomatik base64 olarak kaydedilir</li>
            </ul>
            <div className="mt-3 p-3 rounded-lg text-xs" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
              <strong style={{ color: 'var(--beyboru-text)' }}>Storage Kurulumu:</strong>
              <p className="mt-1" style={{ color: 'var(--beyboru-text-muted)' }}>
                Supabase Dashboard → Storage → New Bucket → "images" adında Public bucket oluşturun.
                Policies bölümünden INSERT ve SELECT izinlerini ekleyin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview in Context */}
      <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
        <CardHeader>
          <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
            Navbar'da Önizleme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 rounded-lg flex items-center gap-4"
            style={{ backgroundColor: 'var(--beyboru-bg)' }}
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--beyboru-accent)' }}
            >
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Logo" 
                  className="max-w-full max-h-full object-contain p-1"
                />
              ) : (
                <ImageIcon className="w-6 h-6" style={{ color: 'var(--beyboru-text)' }} />
              )}
            </div>
            <span 
              className="font-playfair text-xl font-semibold"
              style={{ color: 'var(--beyboru-text)' }}
            >
              {settings?.site_title || 'Beybörü'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
