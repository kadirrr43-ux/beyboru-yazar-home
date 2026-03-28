import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Copy, Check, Sparkles, History, Share2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

// Osmanlıca harf eşleştirmeleri
const osmanlicaMap: Record<string, string> = {
  'a': 'ا', 'b': 'ب', 'c': 'ج', 'ç': 'چ', 'd': 'د', 'e': 'ە',
  'f': 'ف', 'g': 'گ', 'ğ': 'غ', 'h': 'ه', 'ı': 'ى', 'i': 'ي',
  'j': 'ژ', 'k': 'ك', 'l': 'ل', 'm': 'م', 'n': 'ن', 'o': 'و',
  'ö': 'ۆ', 'p': 'پ', 'r': 'ر', 's': 'س', 'ş': 'ش', 't': 'ت',
  'u': 'ۇ', 'ü': 'ۈ', 'v': 'و', 'y': 'ی', 'z': 'ز',
  'A': 'ا', 'B': 'ب', 'C': 'ج', 'Ç': 'چ', 'D': 'د', 'E': 'ە',
  'F': 'ف', 'G': 'گ', 'Ğ': 'غ', 'H': 'ه', 'I': 'ى', 'İ': 'ي',
  'J': 'ژ', 'K': 'ك', 'L': 'ل', 'M': 'م', 'N': 'ن', 'O': 'و',
  'Ö': 'ۆ', 'P': 'پ', 'R': 'ر', 'S': 'س', 'Ş': 'ش', 'T': 'ت',
  'U': 'ۇ', 'Ü': 'ۈ', 'V': 'و', 'Y': 'ی', 'Z': 'ز'
};

// Göktürkçe harf eşleştirmeleri (basitleştirilmiş)
const gokturkceMap: Record<string, string> = {
  'a': '𐰀', 'b': '𐰋', 'c': '𐰲', 'ç': '𐰲', 'd': '𐰑', 'e': '𐰀',
  'f': '𐰯', 'g': '𐰏', 'ğ': '𐰍', 'h': '𐰴', 'ı': '𐰃', 'i': '𐰃',
  'j': '𐰲', 'k': '𐰴', 'l': '𐰞', 'm': '𐰢', 'n': '𐰣', 'o': '𐰆',
  'ö': '𐰇', 'p': '𐰯', 'r': '𐰺', 's': '𐰽', 'ş': '𐱁', 't': '𐱃',
  'u': '𐰆', 'ü': '𐰇', 'v': '𐰉', 'y': '𐰖', 'z': '𐰔',
  'A': '𐰀', 'B': '𐰋', 'C': '𐰲', 'Ç': '𐰲', 'D': '𐰑', 'E': '𐰀',
  'F': '𐰯', 'G': '𐰏', 'Ğ': '𐰍', 'H': '𐰴', 'I': '𐰃', 'İ': '𐰃',
  'J': '𐰲', 'K': '𐰴', 'L': '𐰞', 'M': '𐰢', 'N': '𐰣', 'O': '𐰆',
  'Ö': '𐰇', 'P': '𐰯', 'R': '𐰺', 'S': '𐰽', 'Ş': '𐱁', 'T': '𐱃',
  'U': '𐰆', 'Ü': '𐰇', 'V': '𐰉', 'Y': '𐰖', 'Z': '𐰔'
};

export default function NameTranslator() {
  const [input, setInput] = useState('');
  const [osmanlicaResult, setOsmanlicaResult] = useState('');
  const [gokturkceResult, setGokturkceResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<'osmanlica' | 'gokturkce' | null>(null);

  const translate = () => {
    if (!input.trim()) {
      toast.error('Lütfen bir isim girin');
      return;
    }

    // Osmanlıca çeviri
    const osmanlica = input
      .split('')
      .map(char => osmanlicaMap[char] || char)
      .join('');
    setOsmanlicaResult(osmanlica);

    // Göktürkçe çeviri
    const gokturkce = input
      .split('')
      .map(char => gokturkceMap[char] || char)
      .join('');
    setGokturkceResult(gokturkce);

    // Geçmişe ekle
    if (!history.includes(input)) {
      setHistory(prev => [input, ...prev].slice(0, 10));
    }

    toast.success('Çeviri tamamlandı!');
  };

  const copyToClipboard = (text: string, type: 'osmanlica' | 'gokturkce') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    toast.success('Kopyalandı!');
  };

  const shareResult = () => {
    const text = `Benim adımın Osmanlıca ve Göktürkçe yazılışı:\nOsmanlıca: ${osmanlicaResult}\nGöktürkçe: ${gokturkceResult}\n\n#Beybörü #Osmanlıca #Göktürkçe`;
    
    if (navigator.share) {
      navigator.share({
        title: 'İsim Çevirisi - Beybörü',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Paylaşım metni kopyalandı!');
    }
  };

  return (
    <>
      <SEO
        title="İsim Çevirici | Osmanlıca ve Göktürkçe - Beybörü"
        description="İsminizi Osmanlıca ve Göktürkçe'ye çevirin. Ücretsiz online çeviri aracı."
        keywords="isim çevirici, Osmanlıca isim çeviri, Göktürkçe isim çeviri, ad çevirme, Osmanlıca yazı"
        url="https://beyborudestanlari.com.tr/isim-cevirici"
        type="website"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Hero */}
        <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--beyboru-gold)',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
                Ücretsiz Araç
              </span>
            </div>
            
            <h1 
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              İsim Çevirici
            </h1>
            
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              İsminizi anında Osmanlıca ve Göktürkçe'ye çevirin. 
              Sonucunuzu paylaşın ve bu kadim dilleri keşfedin.
            </p>
          </div>
        </div>

        {/* Translator */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <Card 
              className="overflow-hidden"
              style={{ 
                backgroundColor: 'var(--beyboru-surface)',
                border: '1px solid var(--beyboru-border)',
              }}
            >
              <CardContent className="p-6 sm:p-8">
                {/* Input */}
                <div className="mb-8">
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    İsminizi Yazın
                  </label>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="örn: Ahmet, Ayşe, Mehmet..."
                      className="flex-1 h-12 text-lg"
                      style={{ 
                        backgroundColor: 'var(--beyboru-bg)',
                        borderColor: 'var(--beyboru-border)',
                        color: 'var(--beyboru-text)',
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && translate()}
                    />
                    <Button 
                      onClick={translate}
                      className="h-12 px-6 gap-2"
                      style={{ backgroundColor: 'var(--beyboru-gold)', color: '#000' }}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      Çevir
                    </Button>
                  </div>
                </div>

                {/* Results */}
                {osmanlicaResult && gokturkceResult && (
                  <div className="space-y-6">
                    {/* Osmanlıca Result */}
                    <div 
                      className="p-6 rounded-lg"
                      style={{ backgroundColor: 'var(--beyboru-bg)' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: 'var(--beyboru-text-muted)' }}
                        >
                          Osmanlıca
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(osmanlicaResult, 'osmanlica')}
                          className="gap-2"
                        >
                          {copied === 'osmanlica' ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          Kopyala
                        </Button>
                      </div>
                      <p 
                        className="text-4xl sm:text-5xl font-arabic text-center py-4"
                        style={{ color: 'var(--beyboru-text)', direction: 'rtl' }}
                      >
                        {osmanlicaResult}
                      </p>
                    </div>

                    {/* Göktürkçe Result */}
                    <div 
                      className="p-6 rounded-lg"
                      style={{ backgroundColor: 'var(--beyboru-bg)' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: 'var(--beyboru-text-muted)' }}
                        >
                          Göktürkçe
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(gokturkceResult, 'gokturkce')}
                          className="gap-2"
                        >
                          {copied === 'gokturkce' ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          Kopyala
                        </Button>
                      </div>
                      <p 
                        className="text-4xl sm:text-5xl text-center py-4"
                        style={{ color: 'var(--beyboru-text)' }}
                      >
                        {gokturkceResult}
                      </p>
                    </div>

                    {/* Share Button */}
                    <Button
                      onClick={shareResult}
                      variant="outline"
                      className="w-full gap-2"
                      style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                    >
                      <Share2 className="w-4 h-4" />
                      Sonucu Paylaş
                    </Button>
                  </div>
                )}

                {/* History */}
                {history.length > 0 && (
                  <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--beyboru-border)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <History className="w-4 h-4" style={{ color: 'var(--beyboru-text-muted)' }} />
                      <span 
                        className="text-sm font-medium"
                        style={{ color: 'var(--beyboru-text-muted)' }}
                      >
                        Son Çeviriler
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {history.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(item)}
                          className="px-3 py-1 rounded-full text-sm transition-all hover:opacity-80"
                          style={{ 
                            backgroundColor: 'var(--beyboru-accent)',
                            color: 'var(--beyboru-text)',
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                    <h3 
                      className="font-playfair text-lg font-semibold"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      Osmanlıca Nedir?
                    </h3>
                  </div>
                  <p style={{ color: 'var(--beyboru-text-muted)' }}>
                    Osmanlıca, Osmanlı İmparatorluğu döneminde kullanılan Arap alfabesiyle 
                    yazılan Türkçe dilidir. 600 yıllık bir tarihe sahiptir.
                  </p>
                  <Link to="/blog/osmanlica-nedir">
                    <Button 
                      variant="link" 
                      className="mt-2 p-0"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Daha fazla bilgi →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                    <h3 
                      className="font-playfair text-lg font-semibold"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      Göktürkçe Nedir?
                    </h3>
                  </div>
                  <p style={{ color: 'var(--beyboru-text-muted)' }}>
                    Göktürkçe, eski Türklerin kullandığı runik yazı sistemidir. 
                    Orhun Yazıtları bu alfabenin en önemli örneklerindendir.
                  </p>
                  <Link to="/blog/gokturkce-nedir">
                    <Button 
                      variant="link" 
                      className="mt-2 p-0"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Daha fazla bilgi →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div 
              className="mt-8 p-8 rounded-xl text-center"
              style={{ 
                backgroundColor: 'var(--beyboru-surface)',
                border: '1px solid var(--beyboru-border)',
              }}
            >
              <h3 
                className="font-playfair text-2xl font-semibold mb-3"
                style={{ color: 'var(--beyboru-text)' }}
              >
                Profesyonel Çeviri mi İstiyorsunuz?
              </h3>
              <p 
                className="mb-4"
                style={{ color: 'var(--beyboru-text-muted)' }}
              >
                Uzman kadromuzla profesyonel Osmanlıca ve Göktürkçe çeviri hizmeti sunuyoruz.
              </p>
              <Link to="/ceviri">
                <Button 
                  className="gap-2"
                  style={{ backgroundColor: 'var(--beyboru-gold)', color: '#000' }}
                >
                  <Sparkles className="w-4 h-4" />
                  Çeviri Hizmetleri
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
