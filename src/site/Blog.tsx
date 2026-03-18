import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Feather } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

// Blog içerikleri - SEO için
const blogPosts = [
  {
    id: 'osmanlica-nedir',
    title: 'Osmanlıca Nedir? Tarihi ve Önemi',
    excerpt: 'Osmanlıca, Osmanlı İmparatorluğu döneminde kullanılan yazı dilidir. Arap alfabesiyle yazılan bu dil, Türkçenin tarihi bir biçimidir.',
    date: '10 Mart 2026',
    category: 'Dil Tarihi',
    keywords: ['Osmanlıca nedir', 'Osmanlıca tarihi', 'Osmanlı alfabesi', 'eski Türkçe'],
  },
  {
    id: 'gokturkce-nedir',
    title: 'Göktürkçe Nedir? Orhun Yazıtları',
    excerpt: 'Göktürkçe, eski Türklerin kullandığı runik yazı sistemidir. Orhun Yazıtları bu alfabenin en önemli örneklerindendir.',
    date: '8 Mart 2026',
    category: 'Dil Tarihi',
    keywords: ['Göktürkçe nedir', 'Orhun yazıtları', 'Göktürk alfabesi', 'runik yazı'],
  },
  {
    id: 'turk-mitolojisi',
    title: 'Türk Mitolojisi: Efsaneler ve Kahramanlar',
    excerpt: 'Türk mitolojisi, kadim Türklerin inanç sistemini, efsanelerini ve kahramanlarını içerir. Ergenekon, Asena, Bozkurt gibi semboller bu mitolojinin önemli parçalarıdır.',
    date: '5 Mart 2026',
    category: 'Mitoloji',
    keywords: ['Türk mitolojisi', 'Türk efsaneleri', 'Ergenekon efsanesi', 'Bozkurt mitolojisi'],
  },
  {
    id: 'osmanlica-ceviri-nasil-yapilir',
    title: 'Osmanlıca Çeviri Nasıl Yapılır?',
    excerpt: 'Osmanlıca çeviri yapmak için Arap alfabesini bilmek gerekir. Online çeviri araçları bu süreci kolaylaştırır.',
    date: '1 Mart 2026',
    category: 'Rehber',
    keywords: ['Osmanlıca çeviri', 'Osmanlıca öğrenme', 'Arap alfabesi', 'online çeviri'],
  },
  {
    id: 'turk-edebiyati-roman',
    title: 'Türk Edebiyatında Tarihi Romanlar',
    excerpt: 'Türk edebiyatında tarihi romanlar, geçmişe ışık tutan önemli eserlerdir. Tarih ve kurgunun harmanlandığı bu romanlar okuyucuyu geçmişe götürür.',
    date: '25 Şubat 2026',
    category: 'Edebiyat',
    keywords: ['Türk edebiyatı', 'tarihi roman', 'Türk romanı', 'edebiyat'],
  },
  {
    id: 'ergenekon-destani',
    title: 'Ergenekon Destanı ve Anlamı',
    excerpt: 'Ergenekon Destanı, Türk milletinin demir dağlar arasından kurtuluşunu anlatan kadim bir efsanedir. Bu destan, Türklerin özgürlük ve bağımsızlık mücadelesinin sembolüdür.',
    date: '20 Şubat 2026',
    category: 'Mitoloji',
    keywords: ['Ergenekon destanı', 'Türk mitolojisi', 'demir dağlar', 'Türk efsanesi'],
  },
];

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Blog | Osmanlıca Göktürkçe ve Türk Edebiyatı - Beybörü"
        description="Osmanlıca ve Göktürkçe hakkında bilgiler, Türk mitolojisi, tarihi romanlar ve edebiyat üzerine yazılar. Türk edebiyatının zengin dünyasını keşfedin."
        keywords="Osmanlıca blog, Göktürkçe yazılar, Türk mitolojisi, Türk edebiyatı, tarihi roman, edebiyat blogu"
        url="https://beyborudestanlari.com.tr/blog"
        type="website"
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
              <Feather className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
                Blog
              </span>
            </div>
            
            <h1 
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: 'var(--beyboru-text)' }}
            >
              Osmanlıca, Göktürkçe ve Türk Edebiyatı
            </h1>
            
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              Kadim Türk dilleri, mitoloji ve edebiyat üzerine yazılar. 
              Türk kültürünün zengin dünyasını keşfedin.
            </p>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card 
                    className="h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                    style={{ 
                      backgroundColor: 'var(--beyboru-surface)',
                      border: '1px solid var(--beyboru-border)',
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: 'var(--beyboru-accent)',
                            color: 'var(--beyboru-text)',
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                      
                      <h2 
                        className="font-playfair text-xl font-semibold mb-3 group-hover:text-[var(--beyboru-gold)] transition-colors"
                        style={{ color: 'var(--beyboru-text)' }}
                      >
                        {post.title}
                      </h2>
                      
                      <p 
                        className="mb-4 line-clamp-3"
                        style={{ color: 'var(--beyboru-text-muted)' }}
                      >
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div 
                          className="flex items-center gap-2 text-sm"
                          style={{ color: 'var(--beyboru-text-subtle)' }}
                        >
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        
                        <div 
                          className="flex items-center text-sm font-medium transition-colors"
                          style={{ color: 'var(--beyboru-gold)' }}
                        >
                          Devamını Oku
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
