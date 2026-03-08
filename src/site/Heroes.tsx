import { useEffect, useState } from 'react';
import { 
  Shield, Sword, Crown, Scroll, Search, 
  BookOpen, Compass, Building2, Scale, Flame, Mountain,
  Star, Flag, Target, Zap, Anchor, Map, Globe, Trophy
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SEO from '@/components/SEO';

interface Hero {
  id: string;
  name: string;
  title: string;
  period: string;
  category: 'savas' | 'devlet' | 'bilim' | 'kultur' | 'kesif';
  shortDesc: string;
  fullDesc: string;
  achievements: string[];
  icon: typeof Shield;
  color: string;
}

const heroes: Hero[] = [
  // SAVAŞÇILAR
  {
    id: '1',
    name: 'Mete Han',
    title: 'Hun İmparatoru',
    period: 'MÖ 234 - MÖ 174',
    category: 'savas',
    shortDesc: 'Hun İmparatorluğu\'nun kurucusu ve ilk hakanı.',
    fullDesc: 'Mete Han, Asya\'da kurulan ilk Türk devleti olan Hun İmparatorluğu\'nun kurucusudur. Babası Teoman\'dan tahtı devralarak Hunları bir araya getirmiş ve Çin\'e karşı birçok zafer kazanmıştır. Ok-sadar sistemi ile dünyanın ilk disiplinli ordusunu kurmuştur.',
    achievements: [
      'Hun İmparatorluğu\'nu kurdu',
      'Çin Seddi\'ni aştı',
      'Moğolistan\'ı birleştirdi',
      'Ok-sadar sistemini kurdu',
      'Dünyanın ilk disiplinli ordusunu oluşturdu',
    ],
    icon: Sword,
    color: '#DC2626',
  },
  {
    id: '2',
    name: 'Atilla',
    title: 'Avrupa Hunları Hükümdarı',
    period: '406 - 453',
    category: 'savas',
    shortDesc: 'Tanrıların Kırbacı olarak bilinen büyük komutan.',
    fullDesc: 'Atilla, Avrupa Hunları\'nın en ünlü hükümdarıdır. "Tanrıların Kırbacı" lakabıyla anılan Atilla, Avrupa\'da büyük bir imparatorluk kurmuş ve Roma İmparatorluğu\'nu titretmiştir. Galya ve İtalya seferleriyle Avrupa tarihinin seyrini değiştirmiştir.',
    achievements: [
      'Avrupa\'da geniş bir imparatorluk kurdu',
      'Roma İmparatorluğu\'nu boyun eğdirdi',
      'Galya ve İtalya seferleri düzenledi',
      'Hun gücünün zirvesine ulaştı',
      'Katalaun Savaşı\'nda zafer kazandı',
    ],
    icon: Flame,
    color: '#DC2626',
  },
  {
    id: '3',
    name: 'Alparslan',
    title: 'Büyük Selçuklu Sultanı',
    period: '1029 - 1072',
    category: 'savas',
    shortDesc: 'Malazgirt Zaferi ile Anadolu\'nun kapılarını açan hükümdar.',
    fullDesc: 'Sultan Alparslan, Büyük Selçuklu İmparatorluğu\'nun ikinci hükümdarıdır. 1071 Malazgirt Meydan Muharebesi\'nde Bizans İmparatorluğu\'nu yenerek Anadolu\'nun kapılarını Türklere açmıştır. Bu zafer, Anadolu\'nun Türk yurdu olmasının başlangıcı kabul edilir.',
    achievements: [
      'Malazgirt Zaferi (1071)',
      'Anadolu\'nun kapılarını açtı',
      'Selçuklu İmparatorluğu\'nu genişletti',
      'İslam dünyasının lideri oldu',
      'Gürcistan ve Azerbaycan\'ı fethetti',
    ],
    icon: Target,
    color: '#DC2626',
  },
  {
    id: '4',
    name: 'Fatih Sultan Mehmet',
    title: 'Osmanlı Padişahı',
    period: '1432 - 1481',
    category: 'savas',
    shortDesc: 'İstanbul\'u fethederek çağ açan, çağ kapatan padişah.',
    fullDesc: 'II. Mehmet, Osmanlı İmparatorluğu\'nun yedinci padişahıdır. 21 yaşında İstanbul\'u fethederek Bizans İmparatorluğu\'na son vermiş ve Osmanlı İmparatorluğu\'nu dünya gücü haline getirmiştir. Bilime ve sanata büyük önem vermiş, çok yönlü bir devlet adamıdır.',
    achievements: [
      'İstanbul\'un Fethi (1453)',
      'Osmanlı İmparatorluğu\'nu dünya gücü yaptı',
      'Rumeli\'yi tamamen ele geçirdi',
      'Medreseler ve kütüphaneler kurdu',
      'Fatih Külliyesi\'ni inşa ettirdi',
    ],
    icon: Crown,
    color: '#DC2626',
  },
  {
    id: '5',
    name: 'Yavuz Sultan Selim',
    title: 'Osmanlı Padişahı',
    period: '1470 - 1520',
    category: 'savas',
    shortDesc: 'Mısır ve Hicaz\'ı Osmanlı topraklarına katan hükümdar.',
    fullDesc: 'I. Selim, Osmanlı İmparatorluğu\'nun dokuzuncu padişahıdır. Memlük Devleti\'ni yenilgiye uğratarak Mısır ve Hicaz\'ı Osmanlı topraklarına katmış, halifeliği İstanbul\'a taşımıştır. Safevi İmparatorluğu\'na karşı Çaldıran Zaferi\'ni kazanmıştır.',
    achievements: [
      'Memlük Devleti\'ni yendi',
      'Mısır ve Hicaz\'ı fethetti',
      'Halifeliği İstanbul\'a taşıdı',
      'Osmanlı donanmasını güçlendirdi',
      'Çaldıran Zaferi (1514)',
    ],
    icon: Flag,
    color: '#DC2626',
  },
  {
    id: '6',
    name: 'Kanuni Sultan Süleyman',
    title: 'Osmanlı Padişahı',
    period: '1494 - 1566',
    category: 'savas',
    shortDesc: 'Osmanlı İmparatorluğu\'nun altın çağını yaşatan padişah.',
    fullDesc: 'Kanuni Sultan Süleyman, Osmanlı İmparatorluğu\'nun onuncu padişahıdır. 46 yıl süren hükümdarlığında imparatorluk en geniş sınırlarına ulaşmış, adaletiyle dünyaya örnek olmuştur. Avrupa\'da büyük zaferler kazanmış, Osmanlı\'yı dünya süper gücü haline getirmiştir.',
    achievements: [
      'Osmanlı İmparatorluğu\'nu zirveye taşıdı',
      'Kanuniler mevzuatını oluşturdu',
      'Avrupa\'da büyük zaferler kazandı',
      'Mimar Sinan\'ı destekledi',
      'Adaletiyle ün saldı',
    ],
    icon: Scale,
    color: '#DC2626',
  },
  
  // DEVLET ADAMLARI
  {
    id: '7',
    name: 'Bilge Kağan',
    title: 'Göktürk Kağanı',
    period: '683 - 734',
    category: 'devlet',
    shortDesc: 'Orhun Abideleri\'nin yazarı, bilge hükümdar.',
    fullDesc: 'Bilge Kağan, İkinci Göktürk Kağanlığı\'nın kurucularından ve en önemli hükümdarıdır. Orhun Abideleri\'nde yer alan sözleriyle Türk tarihinin en bilge liderlerinden biri olarak kabul edilir. Çin\'e karşı bağımsızlığı koruyarak Türk birliğini sağlamıştır.',
    achievements: [
      'İkinci Göktürk Kağanlığı\'nı kurdu',
      'Orhun Abideleri\'ni yazdırdı',
      'Türk birliğini sağladı',
      'Çin\'e karşı bağımsızlığı korudu',
      'Türkçenin ilk yazılı belgelerini oluşturdu',
    ],
    icon: Mountain,
    color: '#D97706',
  },
  {
    id: '8',
    name: 'Orhan Gazi',
    title: 'Osmanlı Beyi',
    period: '1281 - 1362',
    category: 'devlet',
    shortDesc: 'Bursa\'yı fethederek başkent yapan Osmanlı beyi.',
    fullDesc: 'Orhan Gazi, Osmanlı Beyliği\'nin ikinci beyidir. Babası Osman Gazi\'den devraldığı beylikleri genişleterek Bursa\'yı fethetmiş ve başkent yapmıştır. Osmanlı ordusunu düzenli bir yapıya kavuşturmuş, ilk Osmanlı parası olan akçeyi bastırmıştır.',
    achievements: [
      'Bursa\'yı fethetti ve başkent yaptı',
      'İznik ve İzmit\'i aldı',
      'Osmanlı ordusunu düzenledi',
      'İlk Osmanlı parasını bastırdı',
      'Devlet teşkilatını kurdu',
    ],
    icon: Building2,
    color: '#D97706',
  },
  {
    id: '9',
    name: 'Murat Hüdavendigar',
    title: 'Osmanlı Padişahı',
    period: '1326 - 1389',
    category: 'devlet',
    shortDesc: 'Osmanlı\'yı Balkanlara taşıyan hükümdar.',
    fullDesc: 'I. Murat, Osmanlı İmparatorluğu\'nun üçüncü hükümdarıdır. Babası Orhan Gazi\'den devraldığı beylikleri imparatorluğa dönüştürmüştür. Kosova Savaşı\'nda şehit düşmüştür. Devlet teşkilatını kurarak Osmanlı\'yı düzenli bir imparatorluk haline getirmiştir.',
    achievements: [
      'Osmanlı\'yı Balkanlara taşıdı',
      'Edirne\'yi fethetti',
      'Devlet teşkilatını kurdu',
      'Yeniçeri Ocağı\'nın temellerini attı',
      'Anadolu\'da birliği sağladı',
    ],
    icon: Globe,
    color: '#D97706',
  },
  
  // BİLİM İNSANLARI
  {
    id: '10',
    name: 'Piri Reis',
    title: 'Denizci ve Kartograf',
    period: '1465 - 1553',
    category: 'bilim',
    shortDesc: 'Kitab-ı Bahriye\'nin yazarı, büyük denizci.',
    fullDesc: 'Piri Reis, Osmanlı\'nın büyük denizcisidir. "Kitab-ı Bahriye" adlı eseriyle Akdeniz\'in en detaylı deniz atlasını oluşturmuş, Amerika kıtasının da yer aldığı ünlü haritasını çizmiştir. Osmanlı donanmasının gelişmesinde büyük rol oynamıştır.',
    achievements: [
      'Kitab-ı Bahriye\'yi yazdı',
      'Dünya haritası çizdi',
      'Osmanlı donanmasını geliştirdi',
      'Denizcilik bilimine katkıda bulundu',
      'Akdeniz\'in en detaylı atlasını oluşturdu',
    ],
    icon: Anchor,
    color: '#0891B2',
  },
  {
    id: '11',
    name: 'Mimar Sinan',
    title: 'Mimar',
    period: '1489 - 1588',
    category: 'bilim',
    shortDesc: 'Osmanlı mimarisinin ustası, dünyanın en büyük mimarlarından.',
    fullDesc: 'Mimar Sinan, Osmanlı İmparatorluğu\'nun başmimarıdır. Selimiye Camii, Süleymaniye Camii ve Şehzade Camii gibi eserleriyle dünya mimarlık tarihine adını altın harflerle yazdırmıştır. 300\'den fazla eser bırakmış, yapı mühendisliğinde çığır açmıştır.',
    achievements: [
      'Selimiye Camii\'ni inşa etti',
      'Süleymaniye Camii\'ni inşa etti',
      '300\'den fazla eser bıraktı',
      'Osmanlı mimarisini zirveye taşıdı',
      'Yapı mühendisliğinde çığır açtı',
    ],
    icon: Building2,
    color: '#0891B2',
  },
  {
    id: '12',
    name: 'Ali Kuşçu',
    title: 'Astronom ve Matematikçi',
    period: '1403 - 1474',
    category: 'bilim',
    shortDesc: 'Osmanlı\'nın ilk büyük astronomu.',
    fullDesc: 'Ali Kuşçu, Osmanlı İmparatorluğu\'nun ilk büyük astronomu ve matematikçisidir. Semerkand ve İstanbul\'da çalışmış, astronomi ve matematik alanlarında önemli eserler vermiştir. Ay\'ın hareketleri üzerine yaptığı çalışmalarla tanınır.',
    achievements: [
      'Osmanlı\'nın ilk büyük astronomu oldu',
      'Fethiye Camii\'ne gözlemevi kurdu',
      'Astronomi alanında önemli eserler verdi',
      'Matematik bilimine katkıda bulundu',
      'Ay\'ın hareketlerini inceledi',
    ],
    icon: Star,
    color: '#0891B2',
  },
  
  // KÜLTÜR ve SANAT
  {
    id: '13',
    name: 'Kaşgarlı Mahmut',
    title: 'Bilgin',
    period: '1005 - 1102',
    category: 'kultur',
    shortDesc: 'Divan-ı Lügat-it Türk\'ün yazarı, dil bilgini.',
    fullDesc: 'Kaşgarlı Mahmut, 11. yüzyılda yaşamış büyük Türk bilginidir. "Divan-ı Lügat-it Türk" adlı eseriyle Türk dilinin ilk kapsamlı sözlüğünü yazmış ve Türkçenin zenginliğini ortaya koymuştur. Türk lehçelerini kayda geçirerek büyük bir kültür hizmeti yapmıştır.',
    achievements: [
      'Divan-ı Lügat-it Türk\'ü yazdı',
      'Türk dilinin ilk sözlüğünü oluşturdu',
      'Türk lehçelerini kayda geçirdi',
      'Türk kültürünü tanıttı',
      'Türkçenin zenginliğini ortaya koydu',
    ],
    icon: BookOpen,
    color: '#7C3AED',
  },
  {
    id: '14',
    name: 'Yunus Emre',
    title: 'Şair ve Düşünür',
    period: '1240 - 1321',
    category: 'kultur',
    shortDesc: 'Türkçe\'nin ilk büyük şairi, halk ozanı.',
    fullDesc: 'Yunus Emre, Türk edebiyatının ve Tasavvufi düşüncenin en önemli isimlerinden biridir. Türkçe\'nin ilk büyük şairi olarak kabul edilir. "Yaratılanı severiz, Yaratandan ötürü" sözüyle tanınan Yunus Emre, sevgi ve hoşgörüyü esas alan şiirleriyle halkın gönlünde taht kurmuştur.',
    achievements: [
      'Türkçe\'nin ilk büyük şairi oldu',
      'Tasavvufi edebiyatın temellerini attı',
      'Halk ozanlığını başlattı',
      'Sevgi ve hoşgörüyü yaydı',
      'Türkçeyi edebi bir dil haline getirdi',
    ],
    icon: Zap,
    color: '#7C3AED',
  },
  {
    id: '15',
    name: 'Hacı Bektaş-ı Veli',
    title: 'Düşünür ve Yol Gösterici',
    period: '1209 - 1271',
    category: 'kultur',
    shortDesc: 'Anadolu\'da hoşgörü ve kardeşliğin sembolü.',
    fullDesc: 'Hacı Bektaş-ı Veli, Anadolu\'ya gelen büyük Türk düşünürüdür. "Bir olalım, iri olalım, diri olalım" sözüyle Anadolu\'da hoşgörü, kardeşlik ve birlik anlayışını yaymıştır. Bektaşi tarikatını kurmuş, Ahilik teşkilatını desteklemiştir.',
    achievements: [
      'Bektaşi tarikatını kurdu',
      'Anadolu\'da hoşgörüyü yaydı',
      'Ahilik teşkilatını destekledi',
      'Türk-İslam sentezini oluşturdu',
      'Anadolu kültürünü zenginleştirdi',
    ],
    icon: Flame,
    color: '#7C3AED',
  },
  {
    id: '16',
    name: 'Evliya Çelebi',
    title: 'Gezgin ve Yazar',
    period: '1611 - 1682',
    category: 'kultur',
    shortDesc: 'Seyahatname\'nin yazarı, dünyanın en büyük gezgini.',
    fullDesc: 'Evliya Çelebi, Osmanlı\'nın ünlü gezgini ve yazardır. "Seyahatname" adlı 10 ciltlik eseriyle Osmanlı coğrafyasının en detaylı kaydını bırakmıştır. 40 yıl boyunca seyahat ederek Balkanlar, Kafkasya, Ortadoğu ve Avrupa\'yı gezmiştir.',
    achievements: [
      'Seyahatname\'yi yazdı',
      'Osmanlı coğrafyasını kayda geçirdi',
      'Kültür ve gelenekleri tanıttı',
      'Dünya\'nın en büyük gezgini oldu',
      '10 ciltlik dev eser bıraktı',
    ],
    icon: Map,
    color: '#7C3AED',
  },
  
  // KEŞİF ve MACERA
  {
    id: '17',
    name: 'Ertuğrul Gazi',
    title: 'Kayı Beyi',
    period: '1191 - 1281',
    category: 'kesif',
    shortDesc: 'Osmanlı Beyliği\'nin temellerini atan lider.',
    fullDesc: 'Ertuğrul Gazi, Kayı boyunun beyi ve Osman Gazi\'nin babasıdır. Selçuklu Sultanı II. Alaeddin Keykubat\'tan Söğüt ve çevresini sınırlar olarak alarak Anadolu\'ya yerleşmiştir. Oğlu Osman Gazi\'ye bıraktığı bu topraklar, gelecekte Osmanlı İmparatorluğu\'nun temelini oluşturmuştur.',
    achievements: [
      'Kayı boyunu Anadolu\'ya getirdi',
      'Söğüt\'ü Türk yurdu yaptı',
      'Osmanlı Beyliği\'nin temellerini attı',
      'Bizans sınırında varlık gösterdi',
      'Geleceğin imparatorluğunu hazırladı',
    ],
    icon: Compass,
    color: '#059669',
  },
  {
    id: '18',
    name: 'Barbaros Hayreddin Paşa',
    title: 'Kaptan-ı Derya',
    period: '1478 - 1546',
    category: 'kesif',
    shortDesc: 'Osmanlı donanmasının efsanevi komutanı.',
    fullDesc: 'Barbaros Hayreddin Paşa, Osmanlı donanmasının en ünlü kaptanlarından biridir. Akdeniz\'de birçok zafer kazanmış, Osmanlı\'nın deniz üstünlüğünü sağlamıştır. Preveze Deniz Muharebesi\'nde büyük zafer kazanarak Osmanlı donanmasının gücünü tüm dünyaya göstermiştir.',
    achievements: [
      'Osmanlı donanmasının komutanı oldu',
      'Preveze Deniz Muharebesi\'ni kazandı',
      'Akdeniz\'de üstünlük sağladı',
      'Kaptan-ı Derya unvanını aldı',
      'Denizcilik tarihine adını yazdırdı',
    ],
    icon: Trophy,
    color: '#059669',
  },
];

const categories = [
  { value: 'all', label: 'Tümü', icon: Crown },
  { value: 'savas', label: 'Savaşçılar', icon: Sword },
  { value: 'devlet', label: 'Devlet Adamları', icon: Building2 },
  { value: 'bilim', label: 'Bilim İnsanları', icon: Star },
  { value: 'kultur', label: 'Kültür ve Sanat', icon: BookOpen },
  { value: 'kesif', label: 'Keşif ve Macera', icon: Compass },
];

export default function Heroes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredHeroes = heroes.filter((hero) => {
    const matchesSearch = 
      hero.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hero.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hero.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hero.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO
        title="Türk Kahramanları | Mete Han'dan Fatih'e Tarihimizin Efsaneleri"
        description="Türk tarihinin 18 büyük kahramanı: Mete Han, Fatih Sultan Mehmet, Bilge Kağan ve daha fazlası. Savaşçılar, devlet adamları, bilim insanları."
        keywords="Türk kahramanları, Mete Han, Fatih Sultan Mehmet, Bilge Kağan, Türk tarihi, Osmanlı padişahları"
        url="https://beyborudestanlari.com.tr/kahramanlar"
      />
    <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      {/* Hero */}
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              backgroundColor: 'rgba(139, 58, 58, 0.2)',
              border: '1px solid var(--beyboru-accent)',
            }}
          >
            <Shield className="w-4 h-4" style={{ color: 'var(--beyboru-accent-light)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--beyboru-accent-light)' }}>
              Tarihimizin Efsaneleri
            </span>
          </div>
          
          <h1 
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: 'var(--beyboru-text)' }}
          >
            Türk Kahramanları
          </h1>
          
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            Tarihimizin iz bırakan büyük isimlerini keşfedin
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
              style={{ color: 'var(--beyboru-text-muted)' }} 
            />
            <Input
              placeholder="Kahraman ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 beyboru-input"
            />
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 h-auto p-2" 
                      style={{ backgroundColor: 'var(--beyboru-surface)' }}>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat.value} value={cat.value}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHeroes.map((hero) => {
                    const HeroIcon = hero.icon;
                    return (
                      <Card
                        key={hero.id}
                        className="cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                        style={{ 
                          backgroundColor: 'var(--beyboru-surface)',
                          border: `1px solid var(--beyboru-border)`,
                        }}
                        onClick={() => setSelectedHero(hero)}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div 
                              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${hero.color}20` }}
                            >
                              <HeroIcon className="w-7 h-7" style={{ color: hero.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 
                                  className="font-playfair text-lg font-semibold truncate"
                                  style={{ color: 'var(--beyboru-text)' }}
                                >
                                  {hero.name}
                                </h3>
                              </div>
                              <p 
                                className="text-sm mb-2"
                                style={{ color: hero.color }}
                              >
                                {hero.title}
                              </p>
                              <p 
                                className="text-xs mb-2"
                                style={{ color: 'var(--beyboru-text-muted)' }}
                              >
                                {hero.period}
                              </p>
                              <p 
                                className="text-sm line-clamp-2"
                                style={{ color: 'var(--beyboru-text-muted)' }}
                              >
                                {hero.shortDesc}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filteredHeroes.length === 0 && (
                  <div className="text-center py-16">
                    <Shield 
                      className="w-16 h-16 mx-auto mb-4" 
                      style={{ color: 'var(--beyboru-text-subtle)' }} 
                    />
                    <h3 
                      className="font-playfair text-xl mb-2"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      Kahraman bulunamadı
                    </h3>
                    <p style={{ color: 'var(--beyboru-text-muted)' }}>
                      Arama kriterlerinize uygun sonuç yok
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Hero Detail Dialog */}
      <Dialog open={!!selectedHero} onOpenChange={() => setSelectedHero(null)}>
        <DialogContent 
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          style={{ 
            backgroundColor: 'var(--beyboru-surface)',
            border: '1px solid var(--beyboru-border)',
          }}
        >
          {selectedHero && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${selectedHero.color}20` }}
                  >
                    <selectedHero.icon className="w-8 h-8" style={{ color: selectedHero.color }} />
                  </div>
                  <div className="flex-1">
                    <DialogTitle 
                      className="font-playfair text-2xl mb-1"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      {selectedHero.name}
                    </DialogTitle>
                    <p style={{ color: selectedHero.color }}>
                      {selectedHero.title}
                    </p>
                    <p className="text-sm mt-1" style={{ color: 'var(--beyboru-text-muted)' }}>
                      {selectedHero.period}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 
                    className="font-semibold mb-2 flex items-center gap-2"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    <Scroll className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                    Hayatı
                  </h4>
                  <p style={{ color: 'var(--beyboru-text-muted)', lineHeight: '1.7' }}>
                    {selectedHero.fullDesc}
                  </p>
                </div>

                <div>
                  <h4 
                    className="font-semibold mb-3 flex items-center gap-2"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    <Trophy className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
                    Başarıları
                  </h4>
                  <ul className="space-y-2">
                    {selectedHero.achievements.map((achievement, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--beyboru-bg)' }}
                      >
                        <span 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                          style={{ 
                            backgroundColor: selectedHero.color,
                            color: 'white',
                          }}
                        >
                          {index + 1}
                        </span>
                        <span style={{ color: 'var(--beyboru-text-muted)' }}>
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}
