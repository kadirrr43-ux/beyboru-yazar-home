import { useState, useEffect, useCallback } from 'react';
import { ArrowRightLeft, Copy, Volume2, RefreshCw, Languages, History, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { translate, speak, type Language, sampleTexts, languageInfo } from '@/lib/translator';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

interface TranslationHistory {
  id: string;
  from: Language;
  to: Language;
  original: string;
  translated: string;
  timestamp: number;
}

export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLang, setFromLang] = useState<Language>('turkce');
  const [toLang, setToLang] = useState<Language>('osmanlica');
  const [history, setHistory] = useState<TranslationHistory[]>([]);
  const [activeTab, setActiveTab] = useState('translate');

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('translation-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (inputText.trim()) {
      const translated = translate(inputText, fromLang, toLang);
      setOutputText(translated);
    } else {
      setOutputText('');
    }
  }, [inputText, fromLang, toLang]);

  const saveToHistory = useCallback(() => {
    if (!inputText.trim() || !outputText.trim()) return;
    
    const newItem: TranslationHistory = {
      id: Date.now().toString(),
      from: fromLang,
      to: toLang,
      original: inputText,
      translated: outputText,
      timestamp: Date.now(),
    };
    
    const updated = [newItem, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('translation-history', JSON.stringify(updated));
    toast.success('Geçmişe kaydedildi');
  }, [inputText, outputText, fromLang, toLang, history]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Kopyalandı!');
  };

  const handleSpeak = (text: string, lang: Language) => {
    speak(text, lang);
  };

  const handleSwap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleSampleClick = (text: string) => {
    setInputText(text);
  };

  const loadFromHistory = (item: TranslationHistory) => {
    setFromLang(item.from);
    setToLang(item.to);
    setInputText(item.original);
    setActiveTab('translate');
  };

  const deleteFromHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('translation-history', JSON.stringify(updated));
  };

  const getLanguageLabel = (lang: Language) => languageInfo[lang].name;
  const getLanguageDirection = (lang: Language) => languageInfo[lang].direction;

  return (
    <>
      <SEO
        title="Osmanlıca Göktürkçe Çeviri | Ücretsiz Online Çeviri Aracı - Beybörü"
        description="Türkçe metinleri Osmanlıca ve Göktürkçe'ye ücretsiz çevirin. Sesli okuma, sayı çevirisi ve geçmiş kaydı özellikleriyle kadim Türk dillerini keşfedin. Eski Türkçe yazı çevirisi."
        keywords="Osmanlıca çeviri, Göktürkçe çeviri, Türkçe Osmanlıca çeviri, Türkçe Göktürkçe çeviri, Osmanlıca yazı, Göktürkçe yazı, eski Türkçe çeviri, kadim Türkçe, online çeviri aracı, ücretsiz çeviri, Osmanlı alfabesi, Göktürk alfabesi"
        url="https://beyborudestanlari.com.tr/ceviri"
        type="website"
      />
    <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      {/* Hero */}
      <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--beyboru-gold)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
              Kadim Diller
            </span>
          </div>
          
          <h1 
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: 'var(--beyboru-text)' }}
          >
            Çeviri Aracı
          </h1>
          
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            Türkçe, Osmanlıca ve Göktürkçe arasında anında çeviri yapın. 
            Sayılar da dahil olmak üzere tam destek.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mx-auto mb-8" style={{ backgroundColor: 'var(--beyboru-surface)' }}>
              <TabsTrigger value="translate" className="flex-1">
                <Languages className="w-4 h-4 mr-2" />
                Çeviri
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                <History className="w-4 h-4 mr-2" />
                Geçmiş
              </TabsTrigger>
            </TabsList>

            <TabsContent value="translate" className="space-y-6">
              {/* Language Selector Bar */}
              <Card 
                className="overflow-hidden"
                style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-4">
                    {/* From Language */}
                    <div className="flex-1 max-w-[180px]">
                      <label className="text-xs mb-1 block" style={{ color: 'var(--beyboru-text-muted)' }}>
                        Kaynak Dil
                      </label>
                      <select
                        value={fromLang}
                        onChange={(e) => setFromLang(e.target.value as Language)}
                        className="w-full px-3 py-2 rounded-lg beyboru-input text-sm font-medium"
                      >
                        <option value="turkce">🇹🇷 Türkçe</option>
                        <option value="osmanlica">☪️ Osmanlıca</option>
                        <option value="gokturkce">🏛️ Göktürkçe</option>
                      </select>
                    </div>

                    {/* Swap Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSwap}
                      className="rounded-full h-10 w-10 mt-5"
                      style={{ borderColor: 'var(--beyboru-gold)' }}
                    >
                      <ArrowRightLeft className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                    </Button>

                    {/* To Language */}
                    <div className="flex-1 max-w-[180px]">
                      <label className="text-xs mb-1 block" style={{ color: 'var(--beyboru-text-muted)' }}>
                        Hedef Dil
                      </label>
                      <select
                        value={toLang}
                        onChange={(e) => setToLang(e.target.value as Language)}
                        className="w-full px-3 py-2 rounded-lg beyboru-input text-sm font-medium"
                      >
                        <option value="turkce">🇹🇷 Türkçe</option>
                        <option value="osmanlica">☪️ Osmanlıca</option>
                        <option value="gokturkce">🏛️ Göktürkçe</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Translation Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Input */}
                <Card 
                  className="relative"
                  style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ backgroundColor: 'var(--beyboru-accent)', color: 'var(--beyboru-text)' }}
                        >
                          {getLanguageLabel(fromLang)}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--beyboru-text-muted)' }}>
                          {inputText.length} karakter
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {inputText && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClear}
                            className="h-8 w-8"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSpeak(inputText, fromLang)}
                          className="h-8 w-8"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Çevirmek istediğiniz metni yazın..."
                      className="min-h-[180px] beyboru-input resize-none border-0 focus-visible:ring-0"
                      style={{ 
                        fontSize: fromLang === 'gokturkce' ? '1.3rem' : '1rem',
                        direction: getLanguageDirection(fromLang),
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Output */}
                <Card 
                  className="relative"
                  style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-gold)' }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ backgroundColor: 'var(--beyboru-gold)', color: 'var(--beyboru-bg)' }}
                        >
                          {getLanguageLabel(toLang)}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--beyboru-text-muted)' }}>
                          {outputText.length} karakter
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(outputText)}
                          disabled={!outputText}
                          className="h-8 w-8"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSpeak(outputText, toLang)}
                          disabled={!outputText}
                          className="h-8 w-8"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={outputText}
                      readOnly
                      placeholder="Çeviri burada görünecek..."
                      className="min-h-[180px] beyboru-input resize-none border-0 focus-visible:ring-0"
                      style={{ 
                        fontSize: toLang === 'gokturkce' ? '1.3rem' : '1rem',
                        direction: getLanguageDirection(toLang),
                      }}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Save Button */}
              {inputText && outputText && (
                <div className="flex justify-center">
                  <Button
                    onClick={saveToHistory}
                    className="beyboru-button"
                  >
                    <History className="w-4 h-4 mr-2" />
                    Geçmişe Kaydet
                  </Button>
                </div>
              )}

              {/* Sample Texts */}
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-6">
                  <h3 
                    className="font-playfair text-lg font-semibold mb-4"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    Örnek Metinler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sampleTexts.map((text, index) => (
                      <button
                        key={index}
                        onClick={() => handleSampleClick(text)}
                        className="px-4 py-2 rounded-lg text-sm transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: 'var(--beyboru-bg)',
                          color: 'var(--beyboru-text-muted)',
                          border: '1px solid var(--beyboru-border)',
                        }}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Language Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['turkce', 'osmanlica', 'gokturkce'] as Language[]).map((lang) => (
                  <Card 
                    key={lang}
                    style={{ 
                      backgroundColor: 'var(--beyboru-surface)', 
                      border: `1px solid ${fromLang === lang || toLang === lang ? 'var(--beyboru-gold)' : 'var(--beyboru-border)'}`,
                      boxShadow: fromLang === lang || toLang === lang ? '0 0 0 2px var(--beyboru-gold)' : 'none',
                    }}
                  >
                    <CardContent className="p-4">
                      <h4 
                        className="font-playfair font-semibold mb-2"
                        style={{ color: 'var(--beyboru-gold)' }}
                      >
                        {languageInfo[lang].name}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                        {languageInfo[lang].description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-6">
                  <h3 
                    className="font-playfair text-xl font-semibold mb-6"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    Çeviri Geçmişi
                  </h3>
                  
                  {history.length === 0 ? (
                    <div className="text-center py-12">
                      <History className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--beyboru-text-subtle)' }} />
                      <p style={{ color: 'var(--beyboru-text-muted)' }}>
                        Henüz kaydedilmiş çeviri yok
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {history.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-lg group"
                          style={{ backgroundColor: 'var(--beyboru-bg)' }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span 
                                className="px-2 py-0.5 rounded text-xs"
                                style={{ backgroundColor: 'var(--beyboru-accent)', color: 'var(--beyboru-text)' }}
                              >
                                {getLanguageLabel(item.from)}
                              </span>
                              <ArrowRightLeft className="w-3 h-3" style={{ color: 'var(--beyboru-text-muted)' }} />
                              <span 
                                className="px-2 py-0.5 rounded text-xs"
                                style={{ backgroundColor: 'var(--beyboru-gold)', color: 'var(--beyboru-bg)' }}
                              >
                                {getLanguageLabel(item.to)}
                              </span>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => loadFromHistory(item)}
                                className="h-7 w-7"
                              >
                                <RefreshCw className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteFromHistory(item.id)}
                                className="h-7 w-7 text-red-400"
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <p className="text-sm line-clamp-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                              {item.original}
                            </p>
                            <p className="text-sm line-clamp-2" style={{ color: 'var(--beyboru-text)' }}>
                              {item.translated}
                            </p>
                          </div>
                          <p className="text-xs mt-2" style={{ color: 'var(--beyboru-text-subtle)' }}>
                            {new Date(item.timestamp).toLocaleString('tr-TR')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </>
  );
}
