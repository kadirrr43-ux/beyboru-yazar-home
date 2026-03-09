import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/store';
import WolfLogo from './WolfLogo';

const navLinks = [
  { path: '/', label: 'Ana Sayfa' },
  { path: '/kitaplar', label: 'Kitaplar' },
  { path: '/kahramanlar', label: 'Kahramanlar' },
  { path: '/ceviri', label: 'Çeviri' },
  { path: '/hakkimda', label: 'Hakkımda' },
  { path: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSettingsStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--beyboru-surface)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--beyboru-border)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: settings?.logo_url ? 'transparent' : 'var(--beyboru-accent)' }}
            >
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <WolfLogo size={28} className="text-[var(--beyboru-text)]" />
              )}
            </div>
            <span 
              className="font-playfair text-xl font-semibold hidden sm:block"
              style={{ color: 'var(--beyboru-text)' }}
            >
              {settings?.site_title || 'Beybörü'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--beyboru-gold)' : 'var(--beyboru-text-muted)',
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" style={{ color: 'var(--beyboru-text)' }} aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" style={{ color: 'var(--beyboru-text)' }} aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          backgroundColor: 'var(--beyboru-surface)',
          borderBottom: '1px solid var(--beyboru-border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <nav className="px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                style={{
                  color: isActive ? 'var(--beyboru-gold)' : 'var(--beyboru-text)',
                  backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
