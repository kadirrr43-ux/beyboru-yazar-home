import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, ExternalLink } from 'lucide-react';
import type { Book } from '@/types';

// Kitapyurdu resimlerini optimize et
function getOptimizedImageUrl(url: string | undefined, width: number): string {
  if (!url) return '/placeholder-book.png';
  
  // Kitapyurdu URL'lerini optimize et
  if (url.includes('kitapyurdu.com')) {
    // wi:800 yerine istenen genişliği kullan
    return url.replace(/wi:\d+/, `wi:${width}`);
  }
  
  return url;
}

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  // KDY linki var mı kontrol et
  const hasKDYLink = !!book.kdy_link && book.kdy_link.length > 0;
  
  // Kitap detay sayfasına mı, yoksa doğrudan KDY'ye mi gidecek
  const internalLink = `/kitap/${book.slug}`;
  const externalLink = book.kdy_link || '';

  return (
    <div
      className="group block"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {hasKDYLink ? (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`${book.title} - Kitapyurdu'nda satın al`}
        >
          <BookCardContent book={book} isExternal={true} />
        </a>
      ) : (
        <Link 
          to={internalLink} 
          className="block"
          aria-label={`${book.title} - Kitap detaylarını görüntüle`}
        >
          <BookCardContent book={book} isExternal={false} />
        </Link>
      )}
    </div>
  );
}

function BookCardContent({ book, isExternal }: { book: Book; isExternal: boolean }) {
  return (
    <div 
      className="relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: 'var(--beyboru-surface)',
        border: '1px solid var(--beyboru-border)',
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <picture>
          {/* WebP format if available */}
          <source 
            srcSet={getOptimizedImageUrl(book.cover_image, 400)} 
            type="image/webp"
          />
          <img
            src={getOptimizedImageUrl(book.cover_image, 400)}
            alt={`${book.title} kitap kapağı`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            width="400"
            height="600"
          />
        </picture>
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{
            background: 'linear-gradient(to top, rgba(15, 15, 18, 0.9) 0%, transparent 100%)',
          }}
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            style={{ backgroundColor: 'var(--beyboru-gold)' }}
            aria-hidden="true"
          >
            {isExternal ? (
              <ExternalLink className="w-6 h-6" style={{ color: 'var(--beyboru-bg)' }} aria-hidden="true" />
            ) : (
              <Eye className="w-6 h-6" style={{ color: 'var(--beyboru-bg)' }} aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.is_new && (
            <span 
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: 'var(--beyboru-gold)',
                color: 'var(--beyboru-bg)',
              }}
            >
              Yeni
            </span>
          )}
          {book.is_featured && (
            <span 
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: 'var(--beyboru-accent)',
                color: 'var(--beyboru-text)',
              }}
            >
              Öne Çıkan
            </span>
          )}
        </div>

        {/* KDY Badge */}
        {isExternal && (
          <div 
            className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium"
            style={{ 
              backgroundColor: 'var(--beyboru-accent)',
              color: 'var(--beyboru-text)',
            }}
          >
            KDY
          </div>
        )}

        {/* Price Badge */}
        {book.price && (
          <div 
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-sm font-semibold"
            style={{ 
              backgroundColor: 'var(--beyboru-surface)',
              color: 'var(--beyboru-gold)',
              border: '1px solid var(--beyboru-border)',
            }}
          >
            {book.price.toFixed(2)} TL
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 
          className="font-playfair text-xl font-semibold mb-2 line-clamp-1 group-hover:text-[var(--beyboru-gold)] transition-colors"
          style={{ color: 'var(--beyboru-text)' }}
        >
          {book.title}
        </h3>
        
        {book.subtitle && (
          <p 
            className="text-sm mb-3 line-clamp-1"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            {book.subtitle}
          </p>
        )}

        <p 
          className="text-sm line-clamp-2 mb-4"
          style={{ color: 'var(--beyboru-text-muted)' }}
        >
          {book.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {book.category?.slice(0, 3).map((cat, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs rounded-full capitalize"
              style={{
                backgroundColor: 'var(--beyboru-bg)',
                color: 'var(--beyboru-text-muted)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div 
          className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--beyboru-gold)' }}
        >
          <span>{isExternal ? 'Satın Al' : 'İncele'}</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
