import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Share2, BookOpen, Calendar, Hash, FileText,
  Users, Star, MessageSquare, ChevronDown, ChevronUp, Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { booksApi } from '@/lib/supabase';
import SEO from '@/components/SEO';
import type { Book } from '@/types';

// Kitap karakterleri verisi
const bookCharacters: Record<string, Array<{name: string, role: string, desc: string}>> = {
  'ergenekod': [
    { name: 'Dr. Aydın Yılmaz', role: 'Baş Karakter', desc: 'Arkeolog ve Ergenekon sırlarının izini süren bilim insanı' },
    { name: 'Leyla Kaya', role: 'Yan Karakter', desc: 'Teknoloji uzmanı ve Aydın\'ın güvenilir yardımcısı' },
    { name: 'Gölge Ajanı', role: 'Anti-Kahraman', desc: 'Ergenekon sırlarını ele geçirmeye çalışan gizli örgüt üyesi' },
  ],
  'kudus': [
    { name: 'Umut', role: 'Baş Karakter', desc: 'Kudüs\'ün yıkıntılarında umudu arayan genç' },
    { name: 'Fatma Ana', role: 'Yan Karakter', desc: 'Kudüs\'ün bilge kadını, direnişin manevi lideri' },
  ],
  'zincirlerden-gunese': [
    { name: 'Kara Güneş Lideri', role: 'Baş Karakter', desc: 'Afrika\'da özgürlük mücadelesi veren gizli örgütün lideri' },
  ],
};

// İlk bölüm örnekleri
const firstChapters: Record<string, string> = {
  'ergenekod': `İstanbul'un sisli bir kasım sabahında, Dr. Aydın Yılmaz Üniversite kütüphanesinin bodrum katındaki tozlu raflar arasında kaybolmuştu. Elindeki eski harita, dedesinden kalma bir mirasın parçasıydı. Haritanın üzerindeki işaretler, yüzyıllardır çözülememiş bir şifreyi gizliyordu.

"Ergenekon..." diye mırıldandı Aydın, parmağıyla haritadaki gizemli sembolü takip ederken. "Demir dağların arasından kurtuluşun efsanesi."

Aniden telefonu çaldı. Ekranda bilinmeyen bir numara parlıyordu. Aydın tereddütle açtı.

"Dr. Yılmaz, sizi bekliyoruz. Göktürk tamgalarının sırrını çözmek için vaktiniz daralıyor."`,

  'kudus': `Siren sesleri yine gökyüzünü delip geçti. Umut, enkazların arasından süzülen ışık huzmesine bakarken, elindeki son ekmeği küçük kız kardeşine uzattı.

"Ye sen," dedi kız kardeşi, başını sallayarak. "Ben tokum."

Umut gülümsedi. Yalan söylemeyi henüz öğrenememişti küçük kız. Ama bu yalan, Kudüs'ün taşlarında büyüyen tüm çocukların ortak yalanıydı. Açlıklarını gizlemek için söyledikleri, umudu ayakta tutan bir yalan.

Ezan sesi uzaktan yükseldi. Cuma günüydü ve direnişin en kutsal günü. Umut, babasının mezarının olduğu yöne baktı. Orada, harabelerin arasında, umut filizleniyordu.`,

  'zincirlerden-gunese': `Kara Güneş ilk kez doğduğunda, Afrika'nın toprakları titredi. Yüzyılların zincirleri, bu yeni güneşin ışığıyla çatırdamaya başladı.

Lider, maskesinin arkasından baktı. Binlerce yüz, onu izliyordu. Her yüz, bir hikaye taşıyordu. Her hikaye, kayıp bir anne, öldürülen bir baba, çalınmış bir çocukluk.

"Bugün," dedi Lider, sesi gecenin sessizliğini yarıyordu. "Zincirlerin kırıldığı gün. Bugün, Kara Güneş'in doğduğu gün."

Eller havaya kalktı. Kara Güneş sembolleri, meşalelerin ışığında dans ediyordu. Ve Afrika, ilk kez yüzyıllardır uykuda olan aslan gibi kükremeye başladı.`,
};

// Örnek yorumlar
const sampleReviews: Array<{name: string; rating: number; comment: string; date: string}> = [
  { name: 'Ahmet Y.', rating: 5, comment: 'Muhteşem bir hikaye! Türk mitolojisini bu kadar güçlü işleyen başka bir roman okumadım.', date: '2 hafta önce' },
  { name: 'Zeynep K.', rating: 5, comment: 'Karakterler çok iyi işlenmiş, okurken kendimi olayların içinde hissettim.', date: '1 ay önce' },
  { name: 'Mehmet S.', rating: 4, comment: 'Tarih ve kurgu mükemmel harmanlanmış. Devamını merakla bekliyorum.', date: '2 ay önce' },
];

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFullChapter, setShowFullChapter] = useState(false);

  useEffect(() => {
    if (slug) {
      loadBook();
    }
  }, [slug]);

  const loadBook = async () => {
    try {
      const data = await booksApi.getBySlug(slug!);
      if (data) {
        setBook(data);
        await booksApi.incrementView(slug!);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error loading book:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title,
          text: book?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--beyboru-text-subtle)' }} />
          <h1 className="font-playfair text-2xl mb-2" style={{ color: 'var(--beyboru-text)' }}>
            Kitap Bulunamadı
          </h1>
          <p className="mb-6" style={{ color: 'var(--beyboru-text-muted)' }}>
            Aradığınız kitap mevcut değil veya kaldırılmış olabilir.
          </p>
          <Link to="/kitaplar">
            <Button className="beyboru-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kitaplara Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const characters = book ? bookCharacters[book.slug] || [] : [];
  const firstChapter = book ? firstChapters[book.slug] || '' : '';
  const reviews = sampleReviews;

  return (
    <>
      <SEO
        title={`${book.title}${book.subtitle ? ` - ${book.subtitle}` : ''} | Beybörü`}
        description={book.seo_description || book.description}
        keywords={book.seo_keywords?.join(', ') || book.tags?.join(', ')}
        image={book.cover_image}
        url={`https://beyborudestanlari.com.tr/kitap/${book.slug}`}
        type="book"
        publishedDate={book.publish_date}
        bookData={{
          name: book.title,
          isbn: book.isbn,
          price: book.price,
          pageCount: book.page_count,
          publishDate: book.publish_date,
          image: book.cover_image,
        }}
      />
    <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      {/* Header */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/kitaplar"
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-[var(--beyboru-gold)]"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm Kitaplara Dön
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image */}
            <div className="relative">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
              >
                <img
                  src={book.cover_image || '/placeholder-book.png'}
                  alt={book.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {book.is_new && (
                    <span 
                      className="px-3 py-1 text-sm font-medium rounded-full"
                      style={{ 
                        backgroundColor: 'var(--beyboru-gold)',
                        color: 'var(--beyboru-bg)',
                      }}
                    >
                      Yeni
                    </span>
                  )}
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: 'var(--beyboru-surface)',
                  border: '1px solid var(--beyboru-border)',
                }}
              >
                <Share2 className="w-5 h-5" style={{ color: 'var(--beyboru-text)' }} />
              </button>
            </div>

            {/* Right: Details */}
            <div className="space-y-8">
              {/* Title */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.category?.map((cat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full capitalize"
                      style={{
                        backgroundColor: 'var(--beyboru-surface)',
                        color: 'var(--beyboru-text-muted)',
                        border: '1px solid var(--beyboru-border)',
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                
                <h1 
                  className="font-playfair text-4xl sm:text-5xl font-bold mb-3"
                  style={{ color: 'var(--beyboru-text)' }}
                >
                  {book.title}
                </h1>
                
                {book.subtitle && (
                  <p 
                    className="text-xl font-playfair italic"
                    style={{ color: 'var(--beyboru-gold)' }}
                  >
                    {book.subtitle}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--beyboru-text-muted)' }}
                >
                  {book.description}
                </p>
              </div>

              {/* Full Description */}
              {book.full_description && (
                <div 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                >
                  <h3 
                    className="font-playfair text-lg font-semibold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    <FileText className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                    Hikaye Özeti
                  </h3>
                  <div 
                    className="prose prose-invert max-w-none whitespace-pre-line"
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {book.full_description}
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {book.page_count && (
                  <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                    <CardContent className="p-4 text-center">
                      <BookOpen className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>Sayfa</p>
                      <p className="font-semibold" style={{ color: 'var(--beyboru-text)' }}>{book.page_count}</p>
                    </CardContent>
                  </Card>
                )}
                
                {book.isbn && (
                  <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                    <CardContent className="p-4 text-center">
                      <Hash className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>ISBN</p>
                      <p className="font-semibold text-xs" style={{ color: 'var(--beyboru-text)' }}>{book.isbn}</p>
                    </CardContent>
                  </Card>
                )}
                
                {book.publish_date && (
                  <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>Yayın Tarihi</p>
                      <p className="font-semibold" style={{ color: 'var(--beyboru-text)' }}>
                        {new Date(book.publish_date).toLocaleDateString('tr-TR')}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div>
                  <p className="text-sm mb-3" style={{ color: 'var(--beyboru-text-muted)' }}>
                    Etiketler
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{
                          backgroundColor: 'var(--beyboru-bg)',
                          color: 'var(--beyboru-text-muted)',
                          border: '1px solid var(--beyboru-border)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {book.kdy_link && (
                  <a
                    href={book.kdy_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button 
                      size="lg"
                      className="w-full beyboru-button group"
                    >
                      Satın Al
                      <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </a>
                )}
                
                {book.price && (
                  <div 
                    className="flex items-center justify-center px-6 py-3 rounded-xl"
                    style={{ 
                      backgroundColor: 'var(--beyboru-surface)',
                      border: '1px solid var(--beyboru-border)',
                    }}
                  >
                    <span className="text-sm mr-2" style={{ color: 'var(--beyboru-text-muted)' }}>
                      Fiyat:
                    </span>
                    <span 
                      className="text-2xl font-playfair font-bold"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      {book.price} TL
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Characters Section */}
          {characters.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-6 h-6" style={{ color: 'var(--beyboru-gold)' }} />
                <h2 
                  className="font-playfair text-3xl font-bold"
                  style={{ color: 'var(--beyboru-text)' }}
                >
                  Karakterler
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {characters.map((char, i) => (
                  <Card 
                    key={i}
                    style={{ 
                      backgroundColor: 'var(--beyboru-surface)',
                      border: '1px solid var(--beyboru-border)',
                    }}
                  >
                    <CardContent className="p-6">
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium mb-3 inline-block"
                        style={{ 
                          backgroundColor: 'var(--beyboru-gold)20',
                          color: 'var(--beyboru-gold)',
                        }}
                      >
                        {char.role}
                      </span>
                      <h3 
                        className="font-playfair text-xl font-semibold mb-2"
                        style={{ color: 'var(--beyboru-text)' }}
                      >
                        {char.name}
                      </h3>
                      <p style={{ color: 'var(--beyboru-text-muted)' }}>
                        {char.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* First Chapter Preview */}
          {firstChapter && (
            <div className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-6 h-6" style={{ color: 'var(--beyboru-gold)' }} />
                <h2 
                  className="font-playfair text-3xl font-bold"
                  style={{ color: 'var(--beyboru-text)' }}
                >
                  İlk Bölümden Bir Alıntı
                </h2>
              </div>
              
              <Card 
                style={{ 
                  backgroundColor: 'var(--beyboru-surface)',
                  border: '1px solid var(--beyboru-border)',
                }}
              >
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 mb-4" style={{ color: 'var(--beyboru-gold)' }} />
                  <div 
                    className={`prose prose-invert max-w-none whitespace-pre-line transition-all duration-300 ${
                      showFullChapter ? '' : 'line-clamp-6'
                    }`}
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {firstChapter}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFullChapter(!showFullChapter)}
                    className="mt-4"
                    style={{ color: 'var(--beyboru-gold)' }}
                  >
                    {showFullChapter ? (
                      <>Daha Az Göster <ChevronUp className="w-4 h-4 ml-2" /></>
                    ) : (
                      <>Devamını Oku <ChevronDown className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reviews Section */}
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6" style={{ color: 'var(--beyboru-gold)' }} />
              <h2 
                className="font-playfair text-3xl font-bold"
                style={{ color: 'var(--beyboru-text)' }}
              >
                Okuyucu Yorumları
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <Card 
                  key={i}
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j} 
                          className={`w-4 h-4 ${j < review.rating ? 'fill-current' : ''}`}
                          style={{ color: j < review.rating ? 'var(--beyboru-gold)' : 'var(--beyboru-text-subtle)' }}
                        />
                      ))}
                    </div>
                    <p 
                      className="mb-4 italic"
                      style={{ color: 'var(--beyboru-text-muted)' }}
                    >
                      "{review.comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="font-medium"
                        style={{ color: 'var(--beyboru-text)' }}
                      >
                        {review.name}
                      </span>
                      <span 
                        className="text-sm"
                        style={{ color: 'var(--beyboru-text-subtle)' }}
                      >
                        {review.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
