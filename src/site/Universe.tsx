import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

const universeSections = [
  {
    id: 'karakterler',
    title: 'Karakterler',
    description: 'Beybörü evreninin unutulmaz karakterleri, kahramanları ve anti-kahramanları.',
    icon: Users,
    path: '/evren/karakterler',
    color: 'var(--beyboru-accent)',
    count: '12+',
  },
  {
    id: 'kavramlar',
    title: 'Kavramlar',
    description: 'Evrende geçen özel terimler, güçler, organizasyonlar ve gizemler.',
    icon: BookOpen,
    path: '/evren/kavramlar',
    color: 'var(--beyboru-gold)',
    count: '20+',
  },
  {
    id: 'lokasyonlar',
    title: 'Lokasyonlar',
    description: 'Hikayelerin geçtiği yerler, şehirler, ülkeler ve gizli mekanlar.',
    icon: MapPin,
    path: '/evren/lokasyonlar',
    color: 'var(--beyboru-accent-light)',
    count: '15+',
  },
  {
    id: 'zaman-cizelgesi',
    title: 'Zaman Çizelgesi',
    description: 'Beybörü evreninin kronolojik tarihi, olaylar ve dönemler.',
    icon: Clock,
    path: '/evren/zaman-cizelgesi',
    color: 'var(--beyboru-gold-light)',
    count: '500+ Yıl',
  },
];

export default function Universe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Beybörü Evreni | Karakterler, Kavramlar ve Lokasyonlar"
        description="Beybörü evrenini keşfedin. Karakterler, kavramlar, lokasyonlar ve zaman çizelgesi. Mini viki rehberi."
        keywords="Beybörü evreni, karakterler, kavramlar, lokasyonlar, zaman çizelgesi"
        url="https://beyborudestanlari.com.tr/evren"
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
                Mini Viki Rehberi
              </span>
            </div>
            
            <h1 
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Beybörü Evreni
            </h1>
            
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Hikayelerin geçtiği dünyayı keşfedin. Karakterler, kavramlar, 
              lokasyonlar ve evrenin kronolojik tarihi.
            </p>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universeSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Link key={section.id} to={section.path}>
                    <Card 
                      className="h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                      style={{ 
                        backgroundColor: 'var(--beyboru-surface)',
                        border: '1px solid var(--beyboru-border)',
                      }}
                    >
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${section.color}20` }}
                          >
                            <Icon className="w-7 h-7" style={{ color: section.color }} />
                          </div>
                          <span 
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${section.color}20`,
                              color: section.color,
                            }}
                          >
                            {section.count}
                          </span>
                        </div>
                        
                        <h3 
                          className="font-playfair text-2xl font-semibold mb-2 group-hover:text-[var(--beyboru-gold)] transition-colors"
                          style={{ color: 'var(--beyboru-text)' }}
                        >
                          {section.title}
                        </h3>
                        
                        <p 
                          className="mb-4"
                          style={{ color: 'var(--beyboru-text-muted)' }}
                        >
                          {section.description}
                        </p>
                        
                        <div 
                          className="flex items-center text-sm font-medium transition-colors"
                          style={{ color: section.color }}
                        >
                          Keşfet
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
