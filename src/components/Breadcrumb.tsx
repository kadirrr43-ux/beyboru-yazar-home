import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

// URL'den Türkçe başlık oluştur
const getPageTitle = (path: string): string => {
  const titles: Record<string, string> = {
    'kitaplar': 'Kitaplar',
    'kitap': 'Kitap',
    'kahramanlar': 'Kahramanlar',
    'karakter': 'Karakter',
    'ceviri': 'Çeviri',
    'blog': 'Blog',
    'sss': 'SSS',
    'hakkimda': 'Hakkımda',
    'iletisim': 'İletişim',
    'isim-cevirici': 'İsim Çevirici',
    'on-okuma': 'Ön Okuma',
  };
  
  const slug = path.split('/').pop() || '';
  return titles[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Ana sayfa veya 404 sayfalarında gösterme
  if (pathnames.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Ana Sayfa', path: '/' },
    ...pathnames.map((_, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      return {
        label: getPageTitle(path),
        path,
      };
    }),
  ];

  return (
    <nav 
      className="py-4 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--beyboru-surface)' }}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight 
                    className="w-4 h-4 mx-2" 
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  />
                )}
                
                {isLast ? (
                  <span 
                    className="font-medium"
                    style={{ color: 'var(--beyboru-text)' }}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center gap-1 hover:text-[var(--beyboru-gold)] transition-colors"
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {index === 0 && <Home className="w-4 h-4" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
