import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, User, BookOpen, Quote, Sparkles, Shield, Sword, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

// Karakter verileri
const characters: Record<string, {
  name: string;
  book: string;
  bookSlug: string;
  role: string;
  image: string;
  description: string;
  bio: string;
  personality: string[];
  abilities: string[];
  quotes: string[];
  relationships: { name: string; relation: string }[];
}> = {
  'aras-soykan': {
    name: 'Profesör Aras Soykan',
    book: 'Ergenekon',
    bookSlug: 'ergenekon',
    role: 'Baş Karakter',
    image: '/images/characters/aras.jpg',
    description: 'Epigrafist ve tarihçi. Göktürk yazıtlarının sırlarını çözmeye çalışan bir bilim insanı.',
    bio: `Profesör Aras Soykan, Dil ve Tarih-Coğrafya Fakültesi'nde çalışan elli yaşlarında bir epigrafisttir. Akademik çevrede "imkânsızın peşindeki adam" olarak bilinir. Hayatını ölü dillere ve unutulmuş tamgalara adamıştır.

Aras, babasının 1970'lerde Moğolistan'da kaybolmasından bu yana "Demirdağ" efsanesinin peşindedir. Babasının son mektubu, onu bu gizemli yerin peşine düşürmüştür.

Ergenekon keşfi, onun için sadece bilimsel bir başarı değil, aynı zamanda babasına olan bir borçtur.`,
    personality: ['Azimli', 'Meraklı', 'Titiz', 'Fedakâr', 'Bilge'],
    abilities: ['Osmanlıca ve Göktürkçe uzmanı', 'Epigrafi bilgisi', 'Antik şifreleri çözme', 'Tarih analizi'],
    quotes: [
      'Demirdağ gerçek olabilir. Ve eğer öyleyse, Türk tarihi yeniden yazılacak.',
      'Taşlar konuşuyor Aras. Biz sadece dinlemeyi öğrenmeliyiz.',
      'Bazı sırlar bin yıldır bekler. Sabır, en büyük erdemdir.'
    ],
    relationships: [
      { name: 'Dr. Selin Karaca', relation: 'Öğrencisi ve Yardımcısı' },
      { name: 'Kerem Aksoy', relation: 'Ekip Üyesi' },
      { name: 'Babası', relation: 'Kayıp Araştırmacı' }
    ]
  },
  'selin-karaca': {
    name: 'Dr. Selin Karaca',
    book: 'Ergenekon',
    bookSlug: 'ergenekon',
    role: 'Yardımcı Karakter',
    image: '/images/characters/selin.jpg',
    description: 'Arkeolog ve profesyonel dağcı. Babasının izini süren cesur bir kadın.',
    bio: `Dr. Selin Karaca, otuzlu yaşlarının ortasında, hırslı bir arkeolog ve profesyonel dağcıdır. Babasını yıllar önce bir kazıda kaybettiğinden beri, yerin altındaki dünyayı yerin üstündekinden daha güvenli bulur.

Selin, babasının "Demirdağ" dosyasındaki imzasını keşfettiğinde, bu görevi bir aile meselesi olarak görür. Aras Hoca'nın en güvenilir öğrencisi ve saha sorumlusudur.

Ergenekon keşfi, onun için sadece bilimsel bir macera değil, babasının izini sürme fırsatıdır.`,
    personality: ['Cesur', 'Kararlı', 'Hırslı', 'Sadık', 'Mücadeleci'],
    abilities: ['Arkeoloji uzmanı', 'Dağcılık', 'Saha araştırması', 'Analitik düşünme'],
    quotes: [
      'Babamın izini sürmek için buradayım. Bu benim için kişisel.',
      'Dağlar beni korkutmaz. En büyük korkum, cevapsız kalan sorular.',
      'Kadınlar da bu işi yapabilir. Hatta daha iyisini.'
    ],
    relationships: [
      { name: 'Profesör Aras', relation: 'Hocası ve Lideri' },
      { name: 'Kerem Aksoy', relation: 'Ekip Üyesi' },
      { name: 'Babası', relation: 'Kayıp Arkeolog' }
    ]
  },
  'kerem-aksoy': {
    name: 'Kerem Aksoy',
    book: 'Ergenekon',
    bookSlug: 'ergenekon',
    role: 'Yardımcı Karakter',
    image: '/images/characters/kerem.jpg',
    description: 'Makine mühendisi ve jeofizik uzmanı. Gizli bir geçmişi olan gizemli bir adam.',
    bio: `Kerem Aksoy, savunma sanayisinden bir makine mühendisidir. Jeofizik üzerine uzmanlığı vardır ve yerin altındaki metal yoğunluklarını ve antik mekanizmaları analiz etmekte ustadır.

Ancak Kerem sadece bir mühendis değildir. Devletin "Kadim Mirası Koruma" birimine bağlı bir operasyon sorumlusudur. Görevi sadece keşfetmek değil, eğer teknoloji "tehlikeliyse" onu imha etmektir.

Kore'deki askeri geçmişi, onu antik savunma sistemlerini anlamada uzman kılar.`,
    personality: ['Gizemli', 'Profesyonel', 'Rasyonel', 'Koruyucu', 'Karmaşık'],
    abilities: ['Makine mühendisliği', 'Jeofizik', 'Antik mekanizmalar', 'Operasyonel taktikler'],
    quotes: [
      'Teknoloji bir silah değil, bir koruma sistemi. Ama her silah gibi, doğru ellerde olmalı.',
      'Geçmişi korumak kadar, geleceği korumak da benim görevim.',
      'Bazı sırlar, sırlar olarak kalmalıdır.'
    ],
    relationships: [
      { name: 'Profesör Aras', relation: 'Ekip Lideri' },
      { name: 'Dr. Selin Karaca', relation: 'Ekip Üyesi' },
      { name: 'Devlet', relation: 'İşvereni' }
    ]
  },
  'yusuf-kudus': {
    name: 'Yusuf',
    book: 'Kudüs',
    bookSlug: 'kudus',
    role: 'Baş Karakter',
    image: '/images/characters/yusuf.jpg',
    description: 'Kudüs\'te yaşayan bir baba ve öğretmen. Savaşın ortasında umudu yaşatmaya çalışan bir adam.',
    bio: `Yusuf, Kudüs'te yaşayan sıradan bir babadır. Oğlu Hasan ve eşi Fatıma ile birlikte savaşın ortasında hayatta kalmaya çalışmaktadır. Bir gece, büyük oğlunu kaybeder ve hayatı sonsuza dek değişir.

Yıkık bir okulda çocuklara harf öğretmeye başlar. Onun için bu, sadece bir iş değil, umudu yaşatma mücadelesidir.

Yusuf, direnişin en saf halini temsil eder: Sadece yaşamak ve başkalarına yaşatmak.`,
    personality: ['Sabırlı', ' fedakâr', 'Umutlu', 'Eğitimci', 'Direnişçi'],
    abilities: ['Öğretmenlik', 'Liderlik', 'Hayatta kalma', 'Diplomasi'],
    quotes: [
      'Bugün çocuklara elif harfini öğrettim. Bu bir tankı durdurmaz, ama belki yarın o çocuklardan biri, kendi çocuğuna cim harfini öğretir.',
      'Direniş, bazen sadece iki taşı bir arada tutmaktır.',
      'Korkuyorum. Ama korkuyu paylaşmak, onu bölüşmek gibidir.'
    ],
    relationships: [
      { name: 'Fatıma', relation: 'Eşi' },
      { name: 'Hasan', relation: 'Oğlu' },
      { name: 'Zeynep Ana', relation: 'Komşu ve Dost' }
    ]
  },
  'fatima-kudus': {
    name: 'Fatıma',
    book: 'Kudüs',
    bookSlug: 'kudus',
    role: 'Yardımcı Karakter',
    image: '/images/characters/fatima.jpg',
    description: 'Yusuf\'un eşi. Güçlü bir anne ve direnişin sembolü.',
    bio: `Fatıma, Yusuf'un eşi ve Hasan'ın annesidir. Savaşın ortasında ailesini bir arada tutmaya çalışan güçlü bir kadındır.

Her sabah enkazdan taş toplar. Kimse nedenini sormaz. Ama o bilir: Ellerinin bir şey yapıyor olması, beyninin sürekli dönen korku döngüsünden kurtulmasını sağlıyor.

Fatıma, direnişin başlangıcıdır. Küçük, görünmez, ama asla durmayan.`,
    personality: ['Güçlü', ' fedakâr', 'Sabırlı', 'Pratik', 'Dayanıklı'],
    abilities: ['Hayatta kalma', 'Toplum örgütleyiciliği', 'Dayanıklılık', 'Umut aşılama'],
    quotes: [
      'Evimizi mi yıkabilirler? Evet, yıkabilirler. Biz yeniden yaparız. Her seferinde.',
      'Paylaşılacak dert, dert olmaktan çıkıyor, bir bağ haline geliyor.',
      'Ben artık sadece bir anne değilim. Ben başlangıcımdır.'
    ],
    relationships: [
      { name: 'Yusuf', relation: 'Eşi' },
      { name: 'Hasan', relation: 'Oğlu' },
      { name: 'Meryem', relation: 'Yardım Ettiği Çocuk' }
    ]
  },
  'zeynep-ana': {
    name: 'Zeynep Ana',
    book: 'Kudüs',
    bookSlug: 'kudus',
    role: 'Yardımcı Karakter',
    image: '/images/characters/zeynep.jpg',
    description: 'Mahallenin bilge kadını. Kaybettiği oğlunun yerine tüm mahalleyi sahiplenmiş.',
    bio: `Zeynep Ana, mahallenin en yaşlısı ve bilgesidir. Oğlunu savaşta kaybetmiştir ama yıkılmamıştır. Onun yerine, tüm mahalleyi sahiplenmiştir.

Sırtı büküktür ama ruhu dimdiktir. Onun sözleri, mahalleli için rehberdir.

Zeynep Ana, direnişin ruhunu temsil eder: Kaybetmeye rağmen devam etmek, ağlamak yerine inşa etmek.`,
    personality: ['Bilge', 'Güçlü', ' fedakâr', 'Sabırlı', 'Rehber'],
    abilities: ['Bilgelik', 'Topluluk liderliği', 'Dua', 'Tecrübe'],
    quotes: [
      'Benim oğlum, bu arabanın tekerleklerinin döndüğünü görmeyi severdi. Şimdi göremiyor. Ben onun yerine bakacağım.',
      'Yarın taşları kaldırmaya başlarız. Hep birlikte.',
      'Evimizi mi yıkabilirler? Biz yeniden yaparız. Her seferinde.'
    ],
    relationships: [
      { name: 'Yusuf', relation: 'Komşu' },
      { name: 'Fatıma', relation: 'Komşu' },
      { name: 'Mahalleli', relation: 'Ailesi' }
    ]
  }
};

export default function CharacterWiki() {
  const { slug } = useParams<{ slug: string }>();
  const character = slug ? characters[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!character) {
    return <Navigate to="/kahramanlar" replace />;
  }

  return (
    <>
      <SEO
        title={`${character.name} | Beybörü Karakterler`}
        description={character.description}
        keywords={`${character.name}, ${character.book}, Beybörü karakterleri, ${character.role}`}
        url={`https://beyborudestanlari.com.tr/karakter/${slug}`}
        type="article"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Hero */}
        <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                <li><Link to="/" className="hover:text-[var(--beyboru-gold)]">Ana Sayfa</Link></li>
                <li>/</li>
                <li><Link to="/kahramanlar" className="hover:text-[var(--beyboru-gold)]">Kahramanlar</Link></li>
                <li>/</li>
                <li style={{ color: 'var(--beyboru-text)' }}>{character.name}</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Character Image */}
              <div className="lg:w-1/3">
                <div 
                  className="aspect-[3/4] rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--beyboru-accent)' }}
                >
                  <User className="w-32 h-32" style={{ color: 'var(--beyboru-text-muted)' }} />
                </div>
              </div>

              {/* Character Info */}
              <div className="lg:w-2/3">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      color: 'var(--beyboru-gold)',
                      border: '1px solid var(--beyboru-gold)',
                    }}
                  >
                    {character.role}
                  </span>
                  <Link to={`/kitap/${character.bookSlug}`}>
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                      style={{ 
                        backgroundColor: 'var(--beyboru-accent)',
                        color: 'var(--beyboru-text)',
                      }}
                    >
                      <BookOpen className="w-3 h-3 inline mr-1" />
                      {character.book}
                    </span>
                  </Link>
                </div>

                <h1 
                  className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
                  style={{ color: 'var(--beyboru-text)' }}
                >
                  {character.name}
                </h1>

                <p 
                  className="text-lg mb-6"
                  style={{ color: 'var(--beyboru-text-muted)' }}
                >
                  {character.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{ backgroundColor: 'var(--beyboru-surface)' }}
                  >
                    <BookOpen className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                    <span style={{ color: 'var(--beyboru-text)' }}>{character.book}</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{ backgroundColor: 'var(--beyboru-surface)' }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                    <span style={{ color: 'var(--beyboru-text)' }}>{character.role}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link to={`/kitap/${character.bookSlug}`}>
                    <Button 
                      className="gap-2"
                      style={{ backgroundColor: 'var(--beyboru-gold)', color: '#000' }}
                    >
                      <BookOpen className="w-4 h-4" />
                      Kitabı İncele
                    </Button>
                  </Link>
                  <Link to="/kahramanlar">
                    <Button 
                      variant="outline"
                      className="gap-2"
                      style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Tüm Kahramanlar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Biography */}
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6">
                    <h2 
                      className="font-playfair text-2xl font-semibold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      <User className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                      Biyografi
                    </h2>
                    <div 
                      className="prose prose-lg max-w-none"
                      style={{ color: 'var(--beyboru-text-muted)' }}
                    >
                      {character.bio.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quotes */}
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6">
                    <h2 
                      className="font-playfair text-2xl font-semibold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      <Quote className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                      Sözleri
                    </h2>
                    <div className="space-y-4">
                      {character.quotes.map((quote, index) => (
                        <blockquote 
                          key={index}
                          className="pl-4 border-l-2"
                          style={{ borderColor: 'var(--beyboru-gold)' }}
                        >
                          <p 
                            className="italic text-lg"
                            style={{ color: 'var(--beyboru-text)' }}
                          >
                            "{quote}"
                          </p>
                        </blockquote>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Personality */}
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6">
                    <h3 
                      className="font-playfair text-lg font-semibold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      <Heart className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                      Kişilik Özellikleri
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {character.personality.map((trait, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: 'var(--beyboru-accent)',
                            color: 'var(--beyboru-text)',
                          }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Abilities */}
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6">
                    <h3 
                      className="font-playfair text-lg font-semibold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      <Sword className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                      Yetenekler
                    </h3>
                    <ul className="space-y-2">
                      {character.abilities.map((ability, index) => (
                        <li 
                          key={index}
                          className="flex items-center gap-2"
                          style={{ color: 'var(--beyboru-text-muted)' }}
                        >
                          <Shield className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--beyboru-gold)' }} />
                          {ability}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Relationships */}
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6">
                    <h3 
                      className="font-playfair text-lg font-semibold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      <User className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                      İlişkiler
                    </h3>
                    <div className="space-y-3">
                      {character.relationships.map((rel, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                          style={{ borderColor: 'var(--beyboru-border)' }}
                        >
                          <span style={{ color: 'var(--beyboru-text)' }}>{rel.name}</span>
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--beyboru-text-muted)' }}
                          >
                            {rel.relation}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
