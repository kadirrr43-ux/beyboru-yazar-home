import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'book';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  bookData?: {
    name: string;
    isbn?: string;
    price?: number;
    pageCount?: number;
    publishDate?: string;
    image?: string;
  };
}

const defaultSEO = {
  title: 'Beybörü Yazar Evi | Türkçe-Osmanlıca-Göktürkçe Çeviri ve Edebiyat',
  description: 'Türkçe metinleri Osmanlıca ve Göktürkçe\'ye çeviren özgün platform. Tarih, mitoloji ve modern edebiyatın kesişiminde hikayeler.',
  keywords: 'Osmanlıca çeviri, Göktürkçe çeviri, Türk edebiyatı, tarihi roman, mitolojik hikayeler',
  image: 'https://beyborudestanlari.com.tr/og-image.jpg',
  url: 'https://beyborudestanlari.com.tr',
  author: 'Beybörü',
};

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = 'website',
  author = defaultSEO.author,
  publishedDate,
  modifiedDate,
  bookData,
}: SEOProps) {
  const fullTitle = title.includes('Beybörü') ? title : `${title} | Beybörü`;
  
  // Schema.org JSON-LD
  const getSchema = () => {
    if (type === 'book' && bookData) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: bookData.name,
        author: {
          '@type': 'Person',
          name: author,
        },
        description: description,
        image: bookData.image || image,
        ...(bookData.isbn && { isbn: bookData.isbn }),
        ...(bookData.publishDate && { datePublished: bookData.publishDate }),
        ...(bookData.pageCount && { numberOfPages: bookData.pageCount }),
        ...(bookData.price && { 
          offers: {
            '@type': 'Offer',
            price: bookData.price,
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          }
        }),
        inLanguage: 'tr',
        publisher: {
          '@type': 'Organization',
          name: 'Beybörü Yazar Evi',
        },
      };
    }
    
    if (type === 'article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: image,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Beybörü Yazar Evi',
          logo: {
            '@type': 'ImageObject',
            url: 'https://beyborudestanlari.com.tr/logo.png',
          },
        },
        url: url,
        ...(publishedDate && { datePublished: publishedDate }),
        ...(modifiedDate && { dateModified: modifiedDate }),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      };
    }
    
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: url,
      image: image,
    };
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Article Specific */}
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      <meta property="article:author" content={author} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(getSchema())}
      </script>
    </Helmet>
  );
}
