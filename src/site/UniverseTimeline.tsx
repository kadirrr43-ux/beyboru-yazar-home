import { useEffect } from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  book: string;
  era: 'ancient' | 'medieval' | 'modern' | 'future';
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'turk-birth',
    year: 'MÖ 209',
    title: 'Ergenekon\'dan Kurtuluş',
    description: 'Türkler, demir dağlar arasından kurtularak özgürlüğüne kavuşur. Ergenekon Vadisi, Türk milletinin doğuş yeri olarak tarihe geçer.',
    book: 'Ergenekod',
    era: 'ancient',
  },
  {
    id: 'gokturk-empire',
    year: 'MS 552',
    title: 'Göktürk İmparatorluğu\'nun Kuruluşu',
    description: 'Bumin Kağan liderliğinde Göktürk Kağanlığı kurulur. Tamgalar ve runik yazı sistemi geliştirilir.',
    book: 'Ergenekod',
    era: 'medieval',
  },
  {
    id: 'bozkurt-protocol',
    year: 'MS 744',
    title: 'Bozkurt Protokolü\'nün Kuruluşu',
    description: 'Göktürklerin çöküşünden sonra, kadim sırları korumakla görevli gizli örgüt kurulur.',
    book: 'Ergenekod',
    era: 'medieval',
  },
  {
    id: 'kudus-crusades',
    year: '1099',
    title: 'Haçlı Seferleri ve Kudüs',
    description: 'Kudüs, Haçlılar tarafından işgal edilir. Şehir binlerce yıllık direniş tarihinin başlangıcı olur.',
    book: 'Kudüs',
    era: 'medieval',
  },
  {
    id: 'ottoman-conquest',
    year: '1517',
    title: 'Yavuz\'un Kudüs\'ü Fethi',
    description: 'Yavuz Sultan Selim, Kudüs\'ü Osmanlı hakimiyetine alır. Şehir 400 yıl barış içinde yaşar.',
    book: 'Kudüs',
    era: 'medieval',
  },
  {
    id: 'africa-slavery',
    year: '1600-1900',
    title: 'Afrika Kıtası\'nda Sömürü Dönemi',
    description: 'Yüzyıllar boyunca Afrika halkları köle ticaretine maruz kalır. Milyonlarca insan zorla başka kıtalara götürülür.',
    book: 'Zincirlerden Güneşe',
    era: 'medieval',
  },
  {
    id: 'kudus-occupation',
    year: '1948',
    title: 'Kudüs\'ün İşgali',
    description: 'Kudüs ve Filistin toprakları işgal edilir. Binlerce Filistinli evlerinden edilir.',
    book: 'Kudüs',
    era: 'modern',
  },
  {
    id: 'kara-sun-birth',
    year: '1960',
    title: 'Kara Güneş Hareketi\'nin Doğuşu',
    description: 'Afrika\'da özgürlük mücadelesi veren gizli örgüt kurulur. Kara Güneş sembolü direnişin işareti haline gelir.',
    book: 'Zincirlerden Güneşe',
    era: 'modern',
  },
  {
    id: 'istanbul-museum',
    year: '1980',
    title: 'İstanbul Gizli Müzesi\'nin Kuruluşu',
    description: 'Türkiye Cumhuriyeti, kadim eserleri korumak için gizli müze kurar. Bozkurt Protokolü ile işbirliği başlar.',
    book: 'Ergenekod',
    era: 'modern',
  },
  {
    id: 'ergenekod-discovery',
    year: '2026',
    title: 'Ergenekon Kodu\'nun Keşfi',
    description: 'Dr. Aydın Yılmaz, Ergenekon\'un sırlarını çözmeye başlar. Kadim Türk bilgileri gün yüzüne çıkar.',
    book: 'Ergenekod',
    era: 'future',
  },
  {
    id: 'kudus-resistance',
    year: '2026',
    title: 'Kudüs\'te Direniş',
    description: 'Umut ve Fatma Ana önderliğinde Kudüs halkı direnişe geçer. Umudun hikayesi yazılır.',
    book: 'Kudüs',
    era: 'future',
  },
  {
    id: 'africa-awakening',
    year: '2026',
    title: 'Afrika Uyanışı',
    description: 'Kara Güneş hareketi, Afrika kıtasında geniş çaplı bir uyanış başlatır. Zincirler kırılmaya başlar.',
    book: 'Zincirlerden Güneşe',
    era: 'future',
  },
];

const eraLabels = {
  ancient: { label: 'Kadim Çağ', color: '#8b5cf6' },
  medieval: { label: 'Orta Çağ', color: '#f59e0b' },
  modern: { label: 'Modern Çağ', color: '#3b82f6' },
  future: { label: 'Günümüz/Gelecek', color: '#22c55e' },
};

export default function UniverseTimeline() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Zaman Çizelgesi | Beybörü Evreni"
        description="Beybörü evreninin kronolojik tarihi - Ergenekon'dan kurtuluştan günümüze kadar."
        keywords="Beybörü zaman çizelgesi, roman kronolojisi, tarih"
        url="https://beyborudestanlari.com.tr/evren/zaman-cizelgesi"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Header */}
        <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
              <span className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                Beybörü Evreni
              </span>
            </div>
            <h1 
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Zaman Çizelgesi
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Beybörü evreninin kronolojik tarihi, olaylar ve dönemler.
            </p>

            {/* Era Legend */}
            <div className="flex flex-wrap gap-3">
              {Object.entries(eraLabels).map(([key, { label, color }]) => (
                <span
                  key={key}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${color}20`,
                    color: color,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div 
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
                style={{ backgroundColor: 'var(--beyboru-border)' }}
              />

              {/* Events */}
              <div className="space-y-8">
                {timelineEvents.map((event, index) => {
                  const isLeft = index % 2 === 0;
                  const era = eraLabels[event.era];
                  
                  return (
                    <div 
                      key={event.id} 
                      className={`relative flex items-start gap-8 ${
                        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Timeline Dot */}
                      <div 
                        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 md:-translate-x-1/2 z-10"
                        style={{ 
                          backgroundColor: 'var(--beyboru-bg)',
                          borderColor: era.color,
                          top: '1.5rem',
                        }}
                      />

                      {/* Content */}
                      <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? 'md:pr-8' : 'md:pl-8'
                      }`}>
                        <Card 
                          style={{ 
                            backgroundColor: 'var(--beyboru-surface)',
                            border: '1px solid var(--beyboru-border)',
                          }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <span 
                                className="px-2 py-1 rounded text-xs font-medium"
                                style={{ 
                                  backgroundColor: `${era.color}20`,
                                  color: era.color,
                                }}
                              >
                                {era.label}
                              </span>
                              <span 
                                className="text-sm font-playfair font-bold"
                                style={{ color: 'var(--beyboru-gold)' }}
                              >
                                {event.year}
                              </span>
                            </div>
                            
                            <h3 
                              className="font-playfair text-xl font-semibold mb-2"
                              style={{ color: 'var(--beyboru-text)' }}
                            >
                              {event.title}
                            </h3>
                            
                            <p 
                              className="text-sm mb-4"
                              style={{ color: 'var(--beyboru-text-muted)' }}
                            >
                              {event.description}
                            </p>
                            
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                              <span 
                                className="text-sm"
                                style={{ color: 'var(--beyboru-text-subtle)' }}
                              >
                                {event.book}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Empty space for other side */}
                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
