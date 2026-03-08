import { useEffect, useState } from 'react';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SEO from '@/components/SEO';

interface Concept {
  id: string;
  name: string;
  category: 'power' | 'organization' | 'artifact' | 'mystery';
  shortDesc: string;
  fullDesc: string;
  relatedBooks: string[];
}

const concepts: Concept[] = [
  {
    id: 'ergenekon-kodu',
    name: 'Ergenekon Kodu',
    category: 'mystery',
    shortDesc: 'Kadim Türklerin gizli bilgilerini saklayan şifreli sistem.',
    fullDesc: 'Göktürk tamgaları ve mekanik labirentlerle korunan, bin yıllardır aktarılan gizli bilgi sistemidir. Ergenekon\'un sırlarını çözmek için bu kodun anahtarına ihtiyaç vardır.',
    relatedBooks: ['Ergenekod'],
  },
  {
    id: 'bozkurt-protokolu',
    name: 'Bozkurt Protokolü',
    category: 'organization',
    shortDesc: 'Kadim Türk mirasını koruyan gizli örgüt.',
    fullDesc: 'Yüzyıllardır Türk tarihinin sırlarını korumakla görevli, modern dünyada bile varlığını sürdüren gizli bir örgüt. Devletin bile haberi olmayan bu örgüt, Ergenekon\'un sırlarını korumak için her şeyi yapar.',
    relatedBooks: ['Ergenekod'],
  },
  {
    id: 'tamga-gucu',
    name: 'Tamga Gücü',
    category: 'power',
    shortDesc: 'Göktürk tamgalarının taşıdığı mistik enerji.',
    fullDesc: 'Her Göktürk tamgası, sahibine özel güçler veren mistik bir enerji taşır. Bu güçler doğru kullanıldığında inanılmaz şeyler başarılabilir, yanlış ellerde ise yıkıcı olabilir.',
    relatedBooks: ['Ergenekod'],
  },
  {
    id: 'kudus-ruhu',
    name: 'Kudüs Ruhu',
    category: 'power',
    shortDesc: 'Kudüs\'ün taşlarında yaşayan manevi güç.',
    fullDesc: 'Yüzyıllardır şehirde yaşayanların inancı, sabrı ve direnişiyle şekillenen manevi bir güç. Bu güç, şehirde yaşayanları korur ve onlara umut verir.',
    relatedBooks: ['Kudüs'],
  },
  {
    id: 'kara-gunes',
    name: 'Kara Güneş Sembolü',
    category: 'artifact',
    shortDesc: 'Afrika direnişinin sembolü haline gelen gizemli işaret.',
    fullDesc: 'Afrika\'nın dört bir yanında görülen, özgürlük mücadelesinin sembolü haline gelen gizemli bir işaret. Bu sembolü taşıyanlar, direnişin bir parçası olarak kabul edilir.',
    relatedBooks: ['Zincirlerden Güneşe'],
  },
  {
    id: 'zincir-kirma-ritueli',
    name: 'Zincir Kırma Ritüeli',
    category: 'mystery',
    shortDesc: 'Kölelik zincirlerini manevi olarak kıran eski bir tören.',
    fullDesc: 'Afrika\'nın kadim kabilelerinden gelen, kölelik ve baskı zincirlerini kırmak için yapılan gizli bir ritüel. Bu töreni yaşayanlar, gerçek özgürlüğe kavuşur.',
    relatedBooks: ['Zincirlerden Güneşe'],
  },
];

const categoryLabels = {
  power: { label: 'Güç', color: '#f59e0b' },
  organization: { label: 'Organizasyon', color: '#3b82f6' },
  artifact: { label: 'Eser', color: '#8b5cf6' },
  mystery: { label: 'Gizem', color: '#ef4444' },
};

export default function UniverseConcepts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredConcepts = concepts.filter((concept) => {
    const matchesSearch = 
      concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <SEO
        title="Kavramlar | Beybörü Evreni"
        description="Beybörü evreninin kavramları - Ergenekon Kodu, Bozkurt Protokolü, Tamga Gücü ve daha fazlası."
        keywords="Beybörü kavramları, Ergenekon Kodu, Bozkurt Protokolü, roman evreni"
        url="https://beyborudestanlari.com.tr/evren/kavramlar"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Header */}
        <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
              <span className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                Beybörü Evreni
              </span>
            </div>
            <h1 
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Kavramlar
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Evrende geçen özel terimler, güçler, organizasyonlar ve gizemler.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--beyboru-text-muted)' }} />
              <Input
                placeholder="Kavram ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 beyboru-input"
              />
            </div>
          </div>
        </div>

        {/* Concepts Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map((concept) => (
                <Card
                  key={concept.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[var(--beyboru-gold)]"
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                  onClick={() => setSelectedConcept(concept)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${categoryLabels[concept.category].color}20`,
                          color: categoryLabels[concept.category].color,
                        }}
                      >
                        {categoryLabels[concept.category].label}
                      </span>
                      <Sparkles className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                    </div>
                    
                    <h3 
                      className="font-playfair text-xl font-semibold mb-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      {concept.name}
                    </h3>
                    
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--beyboru-text-muted)' }}
                    >
                      {concept.shortDesc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Concept Detail Dialog */}
        <Dialog open={!!selectedConcept} onOpenChange={() => setSelectedConcept(null)}>
          <DialogContent 
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ 
              backgroundColor: 'var(--beyboru-surface)',
              border: '1px solid var(--beyboru-border)',
            }}
          >
            {selectedConcept && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: `${categoryLabels[selectedConcept.category].color}20`,
                        color: categoryLabels[selectedConcept.category].color,
                      }}
                    >
                      {categoryLabels[selectedConcept.category].label}
                    </span>
                  </div>
                  <DialogTitle 
                    className="font-playfair text-2xl"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    {selectedConcept.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Açıklama
                    </h4>
                    <p style={{ color: 'var(--beyboru-text-muted)' }}>
                      {selectedConcept.fullDesc}
                    </p>
                  </div>
                  
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      İlgili Kitaplar
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedConcept.relatedBooks.map((book, i) => (
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
