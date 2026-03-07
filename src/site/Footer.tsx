import { Link } from 'react-router-dom';
import { BookOpen, Heart, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useSettingsStore } from '@/store';

export default function Footer() {
  const { settings } = useSettingsStore();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    site: [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Kitaplar', href: '/kitaplar' },
      { label: 'Hakkımda', href: '/hakkimda' },
      { label: 'İletişim', href: '/iletisim' },
    ],
    admin: [
      { label: 'Admin Panel', href: '/admin' },
    ],
  };

  const socialLinks = [
    ...(settings?.social_twitter ? [{
      icon: Twitter,
      href: settings.social_twitter,
      label: 'Twitter',
    }] : []),
    ...(settings?.social_instagram ? [{
      icon: Instagram,
      href: settings.social_instagram,
      label: 'Instagram',
    }] : []),
    ...(settings?.social_youtube ? [{
      icon: Youtube,
      href: settings.social_youtube,
      label: 'YouTube',
    }] : []),
    ...(settings?.contact_email ? [{
      icon: Mail,
      href: `mailto:${settings.contact_email}`,
      label: 'E-posta',
    }] : []),
  ];

  return (
    <footer 
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ 
        backgroundColor: 'var(--beyboru-surface)',
        borderTop: '1px solid var(--beyboru-border)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--beyboru-accent)' }}
              >
                <BookOpen className="w-5 h-5" style={{ color: 'var(--beyboru-text)' }} />
              </div>
              <span 
                className="font-playfair text-xl font-semibold"
                style={{ color: 'var(--beyboru-text)' }}
              >
                {settings?.site_title || 'Beybörü'}
              </span>
            </Link>
            <p 
              className="max-w-md mb-6"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              {settings?.site_description || 'Türk edebiyatının yeni sesi. Tarih, mitoloji ve modern dünyanın kesişiminde hikayeler.'}
            </p>
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                      style={{ backgroundColor: 'var(--beyboru-bg)' }}
                      title={item.label}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-playfair font-semibold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              {footerLinks.site.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="transition-colors hover:text-[var(--beyboru-gold)]"
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin */}
          <div>
            <h3 
              className="font-playfair font-semibold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Yönetim
            </h3>
            <ul className="space-y-2">
              {footerLinks.admin.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="transition-colors hover:text-[var(--beyboru-gold)]"
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div 
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--beyboru-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
            © {currentYear} {settings?.site_title || 'Beybörü Yazar Evi'}. Tüm hakları saklıdır.
          </p>
          <p 
            className="text-sm flex items-center gap-1"
            style={{ color: 'var(--beyboru-text-subtle)' }}
          >
            Made with <Heart className="w-4 h-4 text-red-500" /> in Turkey
          </p>
        </div>
      </div>
    </footer>
  );
}
