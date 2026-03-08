import { useEffect, useState } from 'react';
import { Check, Palette, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useThemeStore, applyTheme, THEMES } from '@/store';

export default function ThemeSettings() {
  const { currentTheme, setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.id);
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    setSelectedTheme(currentTheme.id);
  }, [currentTheme]);

  const handlePreview = (themeId: string) => {
    setPreviewing(true);
    const theme = THEMES.find((t) => t.id === themeId);
    if (theme) {
      applyTheme(theme);
    }
    setTimeout(() => setPreviewing(false), 300);
  };

  const handleSave = () => {
    setTheme(selectedTheme);
  };

  const handleReset = () => {
    setSelectedTheme(currentTheme.id);
    applyTheme(currentTheme);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-playfair font-bold mb-2" style={{ color: 'var(--beyboru-text)' }}>
          Tema Ayarları
        </h1>
        <p style={{ color: 'var(--beyboru-text-muted)' }}>
          Sitenizin görünümünü değiştirin
        </p>
      </div>

      {/* Theme Preview Notice */}
      <Card 
        className="border-dashed"
        style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px dashed var(--beyboru-gold)' }}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <Palette className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
          <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
            Bir temaya tıklayarak önizleyebilirsiniz. Değişiklikleri kaydetmek için "Temayı Uygula" butonuna basın.
          </p>
        </CardContent>
      </Card>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {THEMES.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedTheme === theme.id ? 'ring-2' : ''
            }`}
            style={{ 
              backgroundColor: theme.colors.surface,
              border: `2px solid ${selectedTheme === theme.id ? theme.colors.gold : theme.colors.border}`,
              boxShadow: selectedTheme === theme.id ? `0 0 0 2px ${theme.colors.gold}40` : 'none',
            }}
            onClick={() => {
              setSelectedTheme(theme.id);
              handlePreview(theme.id);
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle 
                  className="font-playfair text-lg"
                  style={{ color: theme.colors.text }}
                >
                  {theme.name}
                </CardTitle>
                {selectedTheme === theme.id && (
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.gold }}
                  >
                    <Check className="w-4 h-4" style={{ color: theme.colors.background }} />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Color Preview */}
              <div className="space-y-2">
                <p className="text-xs" style={{ color: theme.colors.textMuted }}>Renk Paleti</p>
                <div className="flex gap-2">
                  <div 
                    className="w-8 h-8 rounded-full border-2"
                    style={{ 
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border
                    }}
                    title="Arka Plan"
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: theme.colors.surface }}
                    title="Yüzey"
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: theme.colors.accent }}
                    title="Vurgu"
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: theme.colors.gold }}
                    title="Altın"
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: theme.colors.text }}
                    title="Metin"
                  />
                </div>
              </div>

              {/* Preview Text */}
              <div 
                className="p-4 rounded-lg space-y-2"
                style={{ backgroundColor: theme.colors.background }}
              >
                <p 
                  className="font-playfair text-lg"
                  style={{ color: theme.colors.text }}
                >
                  Beybörü Yazar Evi
                </p>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textMuted }}
                >
                  Kelimelerin izinde, hikayelerin peşinde...
                </p>
                <div className="flex gap-2 pt-2">
                  <span 
                    className="px-3 py-1 rounded text-sm"
                    style={{ 
                      backgroundColor: theme.colors.accent,
                      color: theme.colors.text
                    }}
                  >
                    Buton
                  </span>
                  <span 
                    className="px-3 py-1 rounded text-sm border"
                    style={{ 
                      borderColor: theme.colors.gold,
                      color: theme.colors.gold
                    }}
                  >
                    Outline
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={previewing}
          style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Sıfırla
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          disabled={previewing || selectedTheme === currentTheme.id}
          className="beyboru-button"
        >
          <Check className="w-4 h-4 mr-2" />
          Temayı Uygula
        </Button>
      </div>

      {/* Theme Info */}
      <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
        <CardHeader>
          <CardTitle className="font-playfair text-lg" style={{ color: 'var(--beyboru-text)' }}>
            Mevcut Tema: {currentTheme.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p style={{ color: 'var(--beyboru-text-muted)' }}>Arka Plan</p>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: currentTheme.colors.background }}
                />
                <span style={{ color: 'var(--beyboru-text)' }}>{currentTheme.colors.background}</span>
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--beyboru-text-muted)' }}>Vurgu Rengi</p>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: currentTheme.colors.accent }}
                />
                <span style={{ color: 'var(--beyboru-text)' }}>{currentTheme.colors.accent}</span>
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--beyboru-text-muted)' }}>Altın Rengi</p>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: currentTheme.colors.gold }}
                />
                <span style={{ color: 'var(--beyboru-text)' }}>{currentTheme.colors.gold}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
