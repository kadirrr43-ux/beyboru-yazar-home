import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Languages, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/store';
import WolfLogo from './WolfLogo';

export default function HeroSection() {
  const { settings } = useSettingsStore();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--beyboru-bg) 0%, var(--beyboru-surface) 50%, var(--beyboru-bg) 100%)`,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--beyboru-accent) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
            transform: 'translate(var(--mouse-x, 0), var(--mouse-y, 0))',
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--beyboru-gold) 0%, transparent 70%)',
            bottom: '10%',
            right: '-5%',
            transform: 'translate(calc(var(--mouse-x, 0) * -1), calc(var(--mouse-y, 0) * -1))',
            transition: 'transform 0.3s ease-out',
          }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(var(--beyboru-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--beyboru-border) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div 
            className="relative"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.3))',
            }}
          >
            {settings?.logo_url ? (
              <img 
                src={settings.logo_url} 
                alt="Site Logo" 
                className="h-28 w-auto object-contain"
              />
            ) : (
              <WolfLogo size={120} className="text-[var(--beyboru-gold)]" />
            )}
          </div>
        </div>

        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-in"
          style={{ 
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid var(--beyboru-gold)',
          }}
        >
          <BookOpen className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
            Yazar & Hikaye Anlatıcısı
          </span>
        </div>

        {/* Title */}
        <h1 
          className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up"
          style={{ 
            color: 'var(--beyboru-text)',
            textShadow: '0 0 60px var(--beyboru-glow)',
          }}
        >
          {settings?.hero_title || 'Beybörü Yazar Evi'}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-xl sm:text-2xl mb-10 max-w-2xl mx-auto animate-slide-up"
          style={{ 
            color: 'var(--beyboru-text-muted)',
            animationDelay: '0.1s',
          }}
        >
          {settings?.hero_subtitle || 'Kelimelerin izinde, hikayelerin peşinde...'}
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <Link to="/kitaplar">
            <Button 
              size="lg"
              className="group px-8 py-6 text-lg beyboru-button"
            >
              Kitapları Keşfet
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/kahramanlar">
            <Button 
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg beyboru-button-outline"
            >
              <Users className="w-5 h-5 mr-2" />
              Kahramanlar
            </Button>
          </Link>
          <Link to="/ceviri">
            <Button 
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg beyboru-button-outline"
            >
              <Languages className="w-5 h-5 mr-2" />
              Çeviri
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          {[
            { value: '3+', label: 'Yayınlanan Kitap' },
            { value: '18+', label: 'Türk Kahramanı' },
            { value: '3', label: 'Kadim Dil' },
            { value: '1000+', label: 'Okuyucu' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p 
                className="text-2xl sm:text-3xl font-playfair font-bold"
                style={{ color: 'var(--beyboru-gold)' }}
              >
                {stat.value}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--beyboru-text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: 'var(--beyboru-text-muted)' }}
      >
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
             style={{ borderColor: 'var(--beyboru-border)' }}>
          <div 
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: 'var(--beyboru-gold)' }}
          />
        </div>
      </div>
    </section>
  );
}
