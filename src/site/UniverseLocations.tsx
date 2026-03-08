import { useEffect, useState } from 'react';
import { MapPin, Search, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SEO from '@/components/SEO';

interface Location {
  id: string;
  name: string;
  type: 'city' | 'country' | 'landmark' | 'mystery' | 'region';
  region: string;
  shortDesc: string;
  fullDesc: string;
  significance: string;
  relatedBooks: string[];
}

const locations: Location[] = [
  {
    id: 'ergenekon-vadisi',
    name: 'Ergenekon Vadisi',
    type: 'mystery',
    region: 'Moğolistan',
    shortDesc: 'Efsanevi Türk kurtuluşunun gerçekleştiği gizli vadi.',
    fullDesc: 'Efsanelere göre Türklerin demir dağlar arasından kurtulduğu, binlerce yıldır gizli kalmış mistik bir vadi. Modern zamanlarda koordinatları bile bilinmeyen bu vadi, Ergenekon Kodu\'nun sırlarını barındırır.',
    significance: 'Türk milletinin doğuş yeri',
    relatedBooks: ['Ergenekod'],
  },
  {
    id: 'istanbul-gizli-muzesi',
    name: 'İstanbul Gizli Müzesi',
    type: 'landmark',
    region: 'İstanbul, Türkiye',
    shortDesc: 'Kamuoyuna kapalı, kadim eserleri barındıran gizli müze.',
    fullDesc: 'İstanbul\'un tarihi yarımadasının derinliklerinde, devletin en gizli arşivlerinin ve kadim eserlerin saklandığı yeraltı müzesi. Sadece özel izinle girilebilir.',
    significance: 'Ergenekon Kodu araştırmalarının başladığı yer',
    relatedBooks: ['Ergenekod'],
  },
  {
    id: 'kudus-eski-sehir',
    name: 'Kudüs Eski Şehir',
    type: 'city',
    region: 'Kudüs, Filistin',
    shortDesc: 'Binlerce yıllık tarihi ve manevi değeri olan kutsal şehir.',
    fullDesc: 'Üç semavi dinin kutsal kabul ettiği, binlerce yıllık tarihiyle dünyanın en eski şehirlerinden biri. Savaşların ve işgallerin ortasında direnen halkın umudu.',
    significance: 'Hikayenin ana mekanı, direnişin sembolü',
    relatedBooks: ['Kudüs'],
  },
  {
    id: 'refugee-camp',
    name: 'Eylem Mülteci Kampı',
    type: 'landmark',
    region: 'Kudüs Çevresi',
    shortDesc: 'Savaştan kaçanların sığındığı geçici kamp.',
    fullDesc: 'Savaşın vurduğu ailelerin, çocukların ve yaşlıların sığındığı, zor şartlarda hayata tutunmaya çalıştıkları geçici barınma alanı. Umut ve acının bir arada yaşandığı yer.',
    significance: 'Umut\'un büyüdüğü yer',
    relatedBooks: ['Kudüs'],
  },
  {
    id: 'afrika-kalbi',
    name: 'Afrika Kalbi',
    type: 'region',
    region: 'Orta Afrika',
    shortDesc: 'Kara Güneş hareketinin doğduğu bölge.',
    fullDesc: 'Yüzyılların sömürüsüne karşı direnişin başladığı, Kara Güneş sembolünün ilk görüldüğü bölge. Gizli örgütün merkezi ve özgürlük mücadelesinin beşiği.',
    significance: 'Kara Güneş hareketinin merkezi',
    relatedBooks: ['Zincirlerden Güneşe'],
  },
  {
    id: 'zincir-adasi',
    name: 'Zincir Adası',
    type: 'mystery',
    region: 'Atlas Okyanusu',
    shortDesc: 'Eski köle ticaretinin yapıldığı gizemli ada.',
    fullDesc: 'Eski köle ticaretinin merkezi olan, şimdi terk edilmiş gizemli bir ada. Adanın derinliklerinde, zincirlerin kırıldığına dair efsaneler ve gizli ritüellerin izleri vardır.',
    significance: 'Zincir Kırma Ritüeli\'nin yapıldığı yer',
    relatedBooks: ['Zincirlerden Güneşe'],
  },
];

const typeLabels = {
  city: { label: 'Şehir', color: '#3b82f6' },
  country: { label: 'Ülke', color: '#22c55e' },
  landmark: { label: 'Yer', color: '#f59e0b' },
  mystery: { label: 'Gizemli', color: '#8b5cf6' },
  region: { label: 'Bölge', color: '#ef4444' },
};

export default function UniverseLocations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch = 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <SEO
        title="Lokasyonlar | Beybörü Evreni"
        description="Beybörü evreninin lokasyonları - Ergenekon Vadisi, Kudüs, Afrika Kalbi ve daha fazlası."
        keywords="Beybörü lokasyonları, Ergenekon Vadisi, roman mekanları"
        url="https://beyborudestanlari.com.tr/evren/lokasyonlar"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Header */}
        <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
              <span className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                Beybörü Evreni
              </span>
            </div>
            <h1 
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Lokasyonlar
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Hikayelerin geçtiği şehirler, ülkeler, gizli mekanlar ve mistik yerler.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--beyboru-text-muted)' }} />
              <Input
                placeholder="Lokasyon ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 beyboru-input"
              />
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[var(--beyboru-gold)]"
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${typeLabels[location.type].color}20`,
                          color: typeLabels[location.type].color,
                        }}
                      >
                        {typeLabels[location.type].label}
                      </span>
                      <Globe className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                    </div>
                    
                    <h3 
                      className="font-playfair text-xl font-semibold mb-1"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      {location.name}
                    </h3>
                    
                    <p 
                      className="text-sm mb-3"
                      style={{ color: 'var(--beyboru-text-subtle)' }}
                    >
                      {location.region}
                    </p>
                    
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--beyboru-text-muted)' }}
                    >
                      {location.shortDesc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Location Detail Dialog */}
        <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
          <DialogContent 
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ 
              backgroundColor: 'var(--beyboru-surface)',
              border: '1px solid var(--beyboru-border)',
            }}
          >
            {selectedLocation && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: `${typeLabels[selectedLocation.type].color}20`,
                        color: typeLabels[selectedLocation.type].color,
                      }}
                    >
                      {typeLabels[selectedLocation.type].label}
                    </span>
                  </div>
                  <DialogTitle 
                    className="font-playfair text-2xl"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    {selectedLocation.name}
                  </DialogTitle>
                  <p style={{ color: 'var(--beyboru-text-muted)' }}>
                    {selectedLocation.region}
                  </p>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Hakkında
                    </h4>
                    <p style={{ color: 'var(--beyboru-text-muted)' }}>
                      {selectedLocation.fullDesc}
                    </p>
                  </div>
                  
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Önemi
                    </h4>
                    <p style={{ color: 'var(--beyboru-text-muted)' }}>
                      {selectedLocation.significance}
                    </p>
                  </div>
                  
                  <div>
                    <h4 
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      Geçtiği Kitaplar
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.relatedBooks.map((book, i) => (
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
