import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, MessageCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SEO from '@/components/SEO';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Osmanlıca & Göktürkçe
  {
    category: 'Osmanlıca ve Göktürkçe',
    question: 'Osmanlıca çeviri nasıl yapılır?',
    answer: 'Osmanlıca çeviri yapmak için öncelikle Arap alfabesini tanımanız gerekir. Metni harf harf okuyup, kelime kelime anlamlandırarak çeviri yapabilirsiniz. Dijital çeviri araçları da kullanabilirsiniz ancak profesyonel sonuçlar için uzman bir çevirmene danışmanız önerilir. Beybörü Yazar Evi olarak profesyonel Osmanlıca çeviri hizmeti sunmaktayız.'
  },
  {
    category: 'Osmanlıca ve Göktürkçe',
    question: 'Göktürkçe yazı öğrenmek zor mu?',
    answer: 'Göktürkçe öğrenmek, düzenli çalışma ve pratikle mümkündür. 38 harften oluşan alfabeyi öğrenmek başlangıçta zor görünebilir ancak sistematik bir yaklaşımla birkaç hafta içinde temel düzeyde okuma yazma yapabilirsiniz. Orhun Yazıtları\'nı incelemek ve online kaynaklardan yararlanmak öğrenme sürecini hızlandırır.'
  },
  {
    category: 'Osmanlıca ve Göktürkçe',
    question: 'Osmanlıca ve modern Türkçe arasındaki farklar nelerdir?',
    answer: 'Osmanlıca ve modern Türkçe arasındaki temel farklar: 1) Yazı sistemi: Osmanlıca Arap alfabesiyle, modern Türkçe Latin alfabesiyle yazılır. 2) Sözcük dağarcığı: Osmanlıca\'da çok fazla Arapça ve Farsça kelime kullanılır. 3) Dil yapısı: Osmanlıca daha karmaşık cümle yapılarına sahiptir. 4) Okunuş: Osmanlıca sağdan sola doğru okunur ve harfler bağlı yazılır.'
  },
  {
    category: 'Osmanlıca ve Göktürkçe',
    question: 'Online Osmanlıca çeviri araçları güvenilir mi?',
    answer: 'Online çeviri araçları temel düzeyde çeviri yapabilir ancak %100 doğru sonuç garantisi vermezler. Özellikle Arapça ve Farsça kökenli kelimelerde, el yazısı metinlerde ve karmaşık cümle yapılarında hata yapabilirler. Önemli belgeler için mutlaka profesyonel bir çevirmenden destek almanız önerilir.'
  },
  // Kitaplar
  {
    category: 'Kitaplar',
    question: 'Beybörü kitapları nereden alınır?',
    answer: 'Beybörü kitapları tüm major online kitap satış platformlarından (Kitapyurdu, D&R, Amazon vb.) temin edilebilir. Ayrıca seçkin kitabevlerinde de bulabilirsiniz. Dijital versiyonlar için e-kitap platformlarını kontrol edebilirsiniz.'
  },
  {
    category: 'Kitaplar',
    question: 'Ergenekon destanı nedir?',
    answer: 'Ergenekon Destanı, Türk milletinin demir dağlar arasından kurtuluşunu anlatan kadim bir efsanedir. Bu destan, Türklerin zorluklar karşısındaki direncini ve özgürlük mücadelesini sembolize eder. Beybörü\'nün "Ergenekon" romanı bu destanı modern bir bakış açısıyla ele alır.'
  },
  {
    category: 'Kitaplar',
    question: 'Kitaplarınızın e-kitap versiyonları var mı?',
    answer: 'Şuan için malesef bulunmuyor.'
  },
  {
    category: 'Kitaplar',
    question: 'Toplu sipariş ve indirim imkanları var mı?',
    answer: 'Malesef hayır KDY'deki indirimleri takip edebilirsiniz.'
  },
  // Çeviri Hizmetleri
  {
    category: 'Çeviri Hizmetleri',
    question: 'Hangi dillerde çeviri hizmeti sunuyorsunuz?',
    answer: 'Beybörü Yazar Evi olarak Osmanlıca, Göktürkçe ve modern Türkçe arasında çeviri hizmetleri sunuyoruz.'
  },
  {
    category: 'Çeviri Hizmetleri',
    question: 'Çeviri ücretleri nasıl belirleniyor?',
    answer: 'Çevirilerinizi internet sitemizden tamamen ücretsiz olarak yapabilirsiniz.'
  },
  {
    category: 'Çeviri Hizmetleri',
    question: 'Tarihi belge çevirisi yapıyor musunuz?',
    answer: 'Çevirilerinizi internet sitemizden tamamen ücretsiz olarak yapabilirsiniz. Sorumluluk tamamen çeviriyi yaptırana aittir.'
  },
  // Beybörü Evreni
  {
    category: 'Beybörü Evreni',
    question: 'Beybörü evreni nedir?',
    answer: 'Beybörü evreni, yazarımız tarafından yaratılan kurgusal bir dünyadır. Bu evrende tarih, mitoloji ve modern dünyanın kesişiminde hikayeler anlatılır. Ergenekon, Kudüs ve Zincirlerden Güneşe gibi romanlar bu evrenin parçasıdır.'
  },
  {
    category: 'Beybörü Evreni',
    question: 'Karakterler hakkında daha fazla bilgi nerede bulunur?',
    answer: 'Beybörü evrenindeki karakterler hakkında detaylı bilgiler web sitemizin Karakterler bölümünde yer almaktadır. Her karakterin biyografisi, güçleri ve hikayesini inceleyebilirsiniz.'
  },
  {
    category: 'Beybörü Evreni',
    question: 'Yeni kitaplar ne zaman çıkacak?',
    answer: 'Yeni kitaplarımız hakkında güncel bilgileri web sitemizden, sosyal medya hesaplarımızdan ve bültenimize abone olarak takip edebilirsiniz.'
  },
  // Genel
  {
    category: 'Genel',
    question: 'Yazarla nasıl iletişime geçebilirim?',
    answer: 'Yazarla iletişime geçmek için web sitemizdeki İletişim sayfasını kullanabilirsiniz. Ayrıca sosyal medya hesaplarımızdan da bize ulaşabilirsiniz. Tüm mesajları dikkatle okuyor ve mümkün olan en kısa sürede yanıtlıyoruz. '
  },
  {
    category: 'Genel',
    question: 'İmza günleri ve etkinlikler düzenliyor musunuz?',
    answer: 'Evet, düzenli olarak imza günleri, söyleşiler ve edebiyat etkinlikleri düzenliyoruz. Yaklaşan etkinliklerimizi web sitemizin etkinlikler bölümünden ve sosyal medya hesaplarımızdan takip edebilirsiniz.'
  },
  {
    category: 'Genel',
    question: 'Kitaplarımı nasıl imzalatabilirim?',
    answer: 'İmza günleri etkinliklerimizde kitaplarınızı imzalatabilirsiniz. Ayrıca özel talepler için iletişim sayfamızdan bize ulaşabilirsiniz. Kargo ile gönderim imkanı da sunuyoruz.'
  }
];

const categories = ['Tümü', ...Array.from(new Set(faqData.map(item => item.category)))];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // FAQ Schema için yapılandırılmış veri
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <>
      <SEO
        title="SSS | Sık Sorulan Sorular - Beybörü"
        description="Osmanlıca çeviri, Göktürkçe öğrenme, kitaplarımız ve hizmetlerimiz hakkında sık sorulan sorular ve cevapları."
        keywords="SSS, sık sorulan sorular, Osmanlıca çeviri, Göktürkçe öğrenme, Beybörü kitapları"
        url="https://beyborudestanlari.com.tr/sss"
        type="website"
      />
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Hero */}
        <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--beyboru-gold)',
              }}
            >
              <HelpCircle className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
                SSS
              </span>
            </div>
            
            <h1 
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Sık Sorulan Sorular
            </h1>
            
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Osmanlıca çeviri, Göktürkçe öğrenme, kitaplarımız ve hizmetlerimiz 
              hakkında merak edilenler.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--beyboru-text-muted)' }} />
              <Input
                type="text"
                placeholder="Soru ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
                style={{ 
                  backgroundColor: 'var(--beyboru-surface)',
                  borderColor: 'var(--beyboru-border)',
                  color: 'var(--beyboru-text)',
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: activeCategory === category 
                      ? 'var(--beyboru-gold)' 
                      : 'var(--beyboru-surface)',
                    color: activeCategory === category 
                      ? '#000' 
                      : 'var(--beyboru-text)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden transition-all"
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--beyboru-gold)' }} />
                      <span 
                        className="font-medium"
                        style={{ color: 'var(--beyboru-text)' }}
                      >
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`}
                      style={{ color: 'var(--beyboru-text-muted)' }}
                    />
                  </button>
                  
                  {openItems.includes(index) && (
                    <div 
                      className="px-6 pb-4 pl-14"
                      style={{ color: 'var(--beyboru-text-muted)' }}
                    >
                      <p className="leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--beyboru-text-muted)' }} />
                <p style={{ color: 'var(--beyboru-text-muted)' }}>
                  Aramanızla eşleşen soru bulunamadı.
                </p>
              </div>
            )}

            {/* Contact CTA */}
            <div 
              className="mt-12 p-8 rounded-xl text-center"
              style={{ 
                backgroundColor: 'var(--beyboru-surface)',
                border: '1px solid var(--beyboru-border)',
              }}
            >
              <h3 
                className="font-playfair text-xl font-semibold mb-3"
                style={{ color: 'var(--beyboru-text)' }}
              >
                Cevabını Bulamadın mı?
              </h3>
              <p 
                className="mb-4"
                style={{ color: 'var(--beyboru-text-muted)' }}
              >
                Başka soruların varsa bizimle iletişime geçebilirsin.
              </p>
              <Link to="/iletisim">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all"
                  style={{ 
                    backgroundColor: 'var(--beyboru-gold)',
                    color: '#000',
                  }}
                >
                  İletişime Geç
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
