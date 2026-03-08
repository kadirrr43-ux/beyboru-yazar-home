import { useEffect, useState } from 'react';
import { Users, Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SEO from '@/components/SEO';

interface Character {
  id: string;
  name: string;
  book: string;
  role: 'protagonist' | 'antagonist' | 'supporting';
  shortDesc: string;
  fullDesc: string;
  traits: string[];
  appearsIn: string[];
}

const characters: Character[] = [
  {
    id: 'dr-aydin-yilmaz',
    name: 'Dr. Aydın Yılmaz',
    book: 'Ergenekod',
    role: 'protagonist',
    shortDesc: 'Arkeolog ve Ergenekon sırlarının izini süren bilim insanı.',
    fullDesc: 'İstanbul Üniversitesi Arkeoloji Bölümü\'nden mezun olan Dr. Aydın Yılmaz, Türk mitolojisi ve kadim medeniyetler üzerine uzmanlaşmış bir araştırmacıdır. Ergenekon\'un gizli sırlarını keşfetmek için yola çıktığında, hayatının en büyük macerasına atılır.',
    traits: ['Meraklı', 'Kararlı', 'Bilgili', 'Cesur'],
    appearsIn: ['Ergenekod'],
  },
  {
    id: 'leyla-kaya',
    name: 'Leyla Kaya',
    book: 'Ergenekod',
    role: 'supporting',
    shortDesc: 'Teknoloji uzmanı ve Aydın\'ın güvenilir yardımcısı.',
    fullDesc: 'Yapay zeka ve veri analizi uzmanı olan Leyla, modern teknolojiyi kadim sırların çözümünde kullanan bir dahi. Aydın\'ın en güvendiği müttefiki.',
    traits: ['Zeki', 'Pratik', 'Sadık', 'Teknoloji uzmanı'],
    appearsIn: ['Ergenekod'],
  },
  {
    id: 'umut-kudus',
    name: 'Umut',
    book: 'Kudüs',
    role: 'protagonist',
    shortDesc: 'Kudüs\'ün yıkıntılarında umudu arayan genç.',
    fullDesc: 'Savaşın ortasında büyümüş, kayıpların acısını taşıyan ama umudunu kaybetmemiş bir genç. Kudüs\'ün taşlarında filizlenen direnişin sembolü.',
    traits: ['Sabırlı', 'İnançlı', 'Merhametli', 'Güçlü'],
    appearsIn: ['Kudüs'],
  },
  {
    id: 'kara-gunes-lideri',
    name: 'Kara Güneş Lideri',
    book: 'Zincirlerden Güneşe',
    role: 'protagonist',
    shortDesc: 'Afrika\'da özgürlük mücadelesi veren gizli örgütün lideri.',
    fullDesc: 'Yüzyılların sömürüsüne karşı kalkan, zincirleri kırmaya ant içmiş bir lider. Kimliği gizli, etkisi büyük.',
    traits: ['Lider', 'Stratejist', 'Korkusuz', 'Adil'],
    appearsIn: ['Zincirlerden Güneşe'],
  },
  {
    id: 'golge-ajansi',
    name: 'Gölge Ajanı',
    book: 'Ergenekod',
    role: 'antagonist',
    shortDesc: 'Ergenekon sırlarını ele geçirmeye çalışan gizli örgüt üyesi.',
    fullDesc: 'Kadim güçleri kendi çıkarları için kullanmak isteyen gizli bir örgütün tetikçisi. Aydın\'ın en büyük düşmanı.',
    traits: ['Gizemli', 'Tehlikeli', 'Hırslı', 'Zeki'],
    appearsIn: ['Ergenekod'],
  },
  {
    id: 'fatma-ana',
    name: 'Fatma Ana',
    book: 'Kudüs',
    role: 'supporting',
    shortDesc: 'Kudüs\'ün bilge kadını, direnişin manevi lideri.',
    fullDesc: 'Yılların tecrübesiyle Kudüs\'ün ruhunu taşıyan, gençlere yol gösteren bilge bir kadın. Umudun ve sabrın sembolü.',
    traits: ['Bilge', 'Sabırlı', 'Şefkatli', 'Güçlü irade'],
    appearsIn: ['Kudüs'],
  },
];

const roleLabels = {
  protagonist: { label: 'Baş Karakter', color: '#22c55e' },
  antagonist: { label: 'Anti-Kahraman', color: '#ef4444' },
  supporting: { label: 'Yan Karakter', color: '#3b82f6' },
};

export default function UniverseCharacters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = 
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <SEO
        title="Karakterler | Beybörü Evreni"
        description="Beybörü evreninin karakterleri - Dr. Aydın Yılmaz, Umut, Kara Güneş Lideri ve daha fazlası."
        keywords="Beybörü karakterleri, Ergenekod karakterleri, roman karakterleri"
        url="https://beyborudestanlari.com.tr/evren/karakterler"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Header */}
        <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
              <span className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                Beybörü Evreni
              </span>
            </div>
            <h1 
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Karakterler
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Hikayelerin kahramanları, anti-kahramanları ve unutulmaz yan karakterleri.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--beyboru-text-muted)' }} />
              <Input
                placeholder="Karakter ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 beyboru-input"
              />
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCharacters.map((character) => (
                <Card
                  key={character.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[var(--beyboru-gold)]"
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                  onClick={() => setSelectedCharacter(character)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${roleLabels[character.role].color}20`,
                          color: roleLabels[character.role].color,
                        }}
                      >
                        {roleLabels[character.role].label}
                      </span>
                      <span 
                        className="text-xs"
                        style={{ color: 'var(--beyboru-text-subtle)' }}
                      >
                        {character.book}
                      </span>
                    </div>
                    
                    <h3 
                      className="font-playfair text-xl font-semibold mb-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      {character.name}
                    </h3>
                    
                    <p 
                      className="text-sm mb-4"
                      style={{ color: 'var(--beyboru-text-muted)' }}
                    >
                      {character.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {character.traits.slice(0, 3).map((trait, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-xs"
                          style={{
                            backgroundColor: 'var(--beyboru-bg)',
                            color: 'var(--beyboru-text-muted)',
                          }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Character Detail Dialog */}
        <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
          <DialogContent 
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ 
              backgroundColor: 'var(--beyboru-surface)',
              border: '1px solid var(--beyboru-border)',
            }}
          >
            {selectedCharacter && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: `${roleLabels[selectedCharacter.role].color}20`,
                        color: roleLabels[selectedCharacter.role].color,
                      }}
                    >
                      {roleLabels[selectedCharacter.role].label}
                    </span>
                  </div>
                  <DialogTitle 
                    className="font-playfair text-2xl"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    {selectedCharacter.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2 flex items-center gap-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      <BookOpen className="w-4 h-4" />
                      Hakkında
                    </h4>
                    <p style={{ color: 'var(--beyboru-text-muted)' }}>
                      {selectedCharacter.fullDesc}
                    </p>
                  </div>
                  
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Özellikler
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCharacter.traits.map((trait, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: 'var(--beyboru-bg)',
                            color: 'var(--beyboru-text)',
                            border: '1px solid var(--beyboru-border)',
                          }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Geçtiği Kitaplar
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCharacter.appearsIn.map((book, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-sm"
                          style={{
                            backgroundColor: 'var(--beyboru-accent)',
                            color: 'var(--beyboru-text)',
                          }}
                        >
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
