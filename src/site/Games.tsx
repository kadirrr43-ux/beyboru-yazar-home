import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, Brain, Puzzle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

const games = [
  {
    id: 'mangala',
    title: 'Mangala',
    subtitle: 'Geleneksel Türk Zeka Oyunu',
    description: 'Mangala (Mankala) - 2 oyuncu, 12 kuyu, strateji ve zeka mücadelesi! Taşları toplayın, hazinenizi doldurun ve rakibinizi yenin.',
    icon: Gamepad2,
    features: ['2 Oyuncu veya Bilgisayara Karşı', '3 Zorluk Seviyesi', 'Animasyonlu Taşlar'],
    color: 'var(--beyboru-gold)',
  },
  {
    id: '9-tas',
    title: '9 Taş',
    subtitle: 'Dokuz Taş - Mill Oyunu',
    description: 'Geleneksel Türk zeka oyunu. Üçlü yap, strateji kur, kazan! 9 taşınızı yerleştirin, üçlüler yapın ve rakibin taşlarını alın.',
    icon: Brain,
    features: ['2 Oyuncu veya Bilgisayara Karşı', 'Yerleştirme ve Hareket Aşamaları', 'Uçan Taş Mekaniği'],
    color: '#8B4513',
  },
  {
    id: 'mahjong',
    title: 'Beybörü Mahjong',
    subtitle: 'Karakterleri Eşleştir',
    description: 'Beybörü evreninin karakterleri ve sembolleriyle eşleştirme oyunu. Ergenekon, Kudüs ve daha fazlasını keşfedin!',
    icon: Puzzle,
    features: ['24 Farklı Karakter ve Sembol', 'İpucu ve Karıştırma', 'Süre ve Hamle Sayacı'],
    color: '#4A90D9',
  },
];

export default function Games() {
  return (
    <>
      <SEO
        title="Oyunlar | Geleneksel Türk Zeka Oyunları - Beybörü"
        description="Mangala, 9 Taş ve Beybörü Mahjong - Geleneksel Türk zeka oyunlarını oynayın. Beybörü karakterleriyle eğlenceli ve öğretici oyunlar!"
        keywords="Türk oyunları, Mangala, 9 Taş, Mahjong, zeka oyunları, strateji oyunları, geleneksel oyunlar"
        url="https://beyborudestanlari.com.tr/oyunlar"
        type="website"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Hero */}
        <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
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
                Eğlence Merkezi
              </span>
            </div>
            
            <h1 
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Geleneksel Türk Oyunları
            </h1>
            
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Mangala, 9 Taş ve Beybörü Mahjong - Kadim Türk zeka oyunlarını 
              modern bir yaklaşımla keşfedin. Strateji, hafıza ve eğlence bir arada!
            </p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {games.map((game) => {
                const Icon = game.icon;
                return (
                  <Link key={game.id} to={`/oyunlar/${game.id}`}>
                    <Card 
                      className="h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                      style={{ 
                        backgroundColor: 'var(--beyboru-surface)',
                        border: '1px solid var(--beyboru-border)',
                      }}
                    >
                      <CardContent className="p-6">
                        {/* Icon */}
                        <div 
                          className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${game.color}20` }}
                        >
                          <Icon className="w-8 h-8" style={{ color: game.color }} />
                        </div>

                        {/* Title */}
                        <h2 
                          className="font-playfair text-2xl font-bold mb-1 group-hover:text-[var(--beyboru-gold)] transition-colors"
                          style={{ color: 'var(--beyboru-text)' }}
                        >
                          {game.title}
                        </h2>
                        <p 
                          className="text-sm mb-3"
                          style={{ color: game.color }}
                        >
                          {game.subtitle}
                        </p>

                        {/* Description */}
                        <p 
                          className="mb-4"
                          style={{ color: 'var(--beyboru-text-muted)' }}
                        >
                          {game.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2 mb-4">
                          {game.features.map((feature, index) => (
                            <div 
                              key={index}
                              className="flex items-center gap-2 text-sm"
                              style={{ color: 'var(--beyboru-text-muted)' }}
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: game.color }}
                              />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div 
                          className="flex items-center text-sm font-medium transition-colors"
                          style={{ color: game.color }}
                        >
                          Oyna
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Why Play Section */}
            <div className="mt-16">
              <h2 
                className="font-playfair text-3xl font-bold text-center mb-8"
                style={{ color: 'var(--beyboru-text)' }}
              >
                Neden Oynamalısınız?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6 text-center">
                    <Brain className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--beyboru-gold)' }} />
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--beyboru-text)' }}>
                      Zeka Geliştirme
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                      Strateji, hafıza ve mantık becerilerinizi geliştirin. 
                      Her oyun farklı bir zihinsel egzersiz sunar.
                    </p>
                  </CardContent>
                </Card>
                
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6 text-center">
                    <Gamepad2 className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--beyboru-gold)' }} />
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--beyboru-text)' }}>
                      Kültürel Miras
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                      Kadim Türk oyun kültürünü keşfedin. 
                      Mangala ve 9 Taş yüzyıllardır oynanan geleneksel oyunlardır.
                    </p>
                  </CardContent>
                </Card>
                
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6 text-center">
                    <Sparkles className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--beyboru-gold)' }} />
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--beyboru-text)' }}>
                      Beybörü Evreni
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                      Mahjong'da Beybörü karakterleri ve sembolleriyle tanışın. 
                      Ergenekon, Kudüs ve daha fazlasını keşfedin!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA */}
            <div 
              className="mt-12 p-8 rounded-xl text-center"
              style={{ 
                backgroundColor: 'var(--beyboru-surface)',
                border: '1px solid var(--beyboru-border)',
              }}
            >
              <h3 
                className="font-playfair text-2xl font-semibold mb-3"
                style={{ color: 'var(--beyboru-text)' }}
              >
                Hemen Oynamaya Başlayın!
              </h3>
              <p 
                className="mb-4"
                style={{ color: 'var(--beyboru-text-muted)' }}
              >
                Ücretsiz, reklamsız ve eğlenceli. Hangi oyunla başlamak istersiniz?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/oyunlar/mangala">
                  <Button 
                    className="gap-2"
                    style={{ backgroundColor: 'var(--beyboru-gold)', color: '#000' }}
                  >
                    <Gamepad2 className="w-4 h-4" />
                    Mangala Oyna
                  </Button>
                </Link>
                <Link to="/oyunlar/9-tas">
                  <Button 
                    variant="outline"
                    className="gap-2"
                    style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                  >
                    <Brain className="w-4 h-4" />
                    9 Taş Oyna
                  </Button>
                </Link>
                <Link to="/oyunlar/mahjong">
                  <Button 
                    variant="outline"
                    className="gap-2"
                    style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                  >
                    <Puzzle className="w-4 h-4" />
                    Mahjong Oyna
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
