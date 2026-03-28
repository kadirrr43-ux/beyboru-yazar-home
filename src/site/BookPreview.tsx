import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, User, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';

// Kitap ön okuma içerikleri
const bookPreviews: Record<string, {
  title: string;
  subtitle?: string;
  author: string;
  cover: string;
  description: string;
  publishDate: string;
  pages: number;
  genre: string;
  chapters: { title: string; content: string }[];
}> = {
  'ergenekon': {
    title: 'Ergenekon',
    author: 'Beybörü',
    cover: '/images/books/ergenekon.jpg',
    description: 'Göktürk dönemini ve Ergenekon destanını konu alan tarihi roman. Demir dağların arasından kurtuluşun hikayesi.',
    publishDate: 'Şubat 2026',
    pages: 320,
    genre: 'Tarihi Roman',
    chapters: [
      {
        title: 'Bölüm 1: Kadim Dosya',
        content: `Ankara'nın gri sabahlarından biriydi. Profesör Aras Soykan, Dil ve Tarih-Coğrafya Fakültesi'ndeki loş odasında, elli yıldır kimsenin dokunmadığı tozlu bir dosyanın önünde oturuyordu. Aras, ellili yaşlarının başında, hayatını ölü dillere ve unutulmuş tamgalara adamış bir epigrafistti. Akademik çevrede "imkânsızın peşindeki adam" olarak bilinirdi; çünkü o, Göktürk yazıtlarının sadece birer zafer anıtı değil, aynı zamanda çok daha eski bir medeniyetin teknolojik mirasını gizleyen birer "kullanım kılavuzu" olduğuna inanıyordu.

Masasındaki dosya, 1970'lerde Moğolistan'da kaybolan bir Türk jeolog ekibine aitti. Devletin tozlu arşivlerinden çıkan bu dosya, sadece iki kelimeyle mühürlenmişti: "Proje: Demirdağ".

Odanın kapısı sertçe açıldı. İçeri giren, Aras'ın eski öğrencisi ve şimdi ekibinin saha sorumlusu olan Dr. Selin Karaca'ydı. Selin, otuzlu yaşlarının ortasında, hırslı bir arkeolog ve aynı zamanda profesyonel bir dağcıydı. Babasını yıllar önce bir kazıda kaybettiğinden beri, yerin altındaki dünyayı yerin üstündekinden daha güvenli buluyordu.

"Hocam, ödenek onaylandı," dedi Selin heyecanla. "Ama bir şartları var. Ekibe dışarıdan birini dahil etmemizi istiyorlar."

Aras gözlüğünü düzeltti. "Kim?"

"Kerem Aksoy. Savunma sanayisinden bir makine mühendisi. Jeofizik üzerine de uzmanlığı var. Adamın işi, yerin altındaki metal yoğunluklarını ve antik mekanizmaları analiz etmek."

Aras, dosyanın kapağını kapattı. Gözleri parladı. "Demek Demirdağ gerçek."

"Belki de sadece bir efsanedir. Ama eğer gerçekse..." Selin cümlesini tamamlamadı. İkisi de biliyordu: Eğer Demirdağ gerçekse, Türk tarihinin yeniden yazılması gerekecekti.`
      },
      {
        title: 'Bölüm 2: Bozkırdaki Gölgeler',
        content: `Moğolistan steplerinde hava durumu bir dost değil, her an ihanet etmeye hazır bir düşmandır. Kampın ikinci gecesinde, barometre hızla düşerken gökyüzü alışılmadık bir mor renge bürünmüştü. Ancak ekibi asıl korkutan, ufukta yaklaşan "Kara Fırtına" (Moğolların deyimiyle Zud) değildi.

Kerem, yüksek frekanslı sinyal tarayıcısının başında kaşlarını çatmış, ekranındaki kırmızı noktalara bakıyordu.

"Hocam, bir sorunumuz var," dedi sesi rüzgârın uğultusuna karışırken. "Yalnız değiliz."

Aras ve Selin hızla Kerem'in yanına geldi. Termal ekranda, yaklaşık iki kilometre batıda, vadinin sırtına yerleşmiş dört farklı ısı kaynağı görünüyordu. Bunlar doğal birer kaynak değildi; hareket ediyorlardı ve askeri bir disiplinle vadiyi izliyorlardı.

"Kaçak kazıcılar mı?" diye sordu Selin, eli istemsizce belindeki telsize giderek.

"Hayır," dedi Kerem. "Kullandıkları sinyal bozucular (jammer) bizim ana merkezle iletişimimizi kesti bile. Bu kadar profesyonel bir ekip buraya tesadüfen gelmez. Bizim bulduğumuz şeyi, yani o 'metal yoğunluğunu' biliyorlar."

Zamana Karşı Yarış

Selin, babasının not defterindeki bir cümleyi hatırladı: "Dağın kalbi attığında, gökyüzü kararır ve rüzgâr, taşların dilinde konuşur."

O ana kadar bunu bir metafor sanmıştı. Şimdi, barometrenin ibresinin deli gibi döndüğünü görünce, bir metafor değil, bir uyarı olduğunu anladı. Bu fırtına doğal değildi; sığınağın nabzının atışıyla senkronize olmuştu.

O sırada gökyüzü adeta yarıldı. Dolu yağışı kampı dövmeye başladı. Görüş mesafesi birkaç metreye kadar düşmüştü. Bu fırtına normal bir doğa olayı değil gibiydi; rüzgârın sesi, yerin altındaki o metalik tıkırtıyla tuhaf bir senkronizasyon içindeydi.

"Fırtına bizi burada savunmasız bırakacak," dedi Aras kararlılıkla. "Eğer o tepeye yerleşenler fırtınanın bitmesini bekliyorsa, bizim onlardan önce içeri girmemiz lazım. Burayı bulacaklar Selin, kaçış yok. Ama mühürlü kapının arkasına biz geçersek, avantaj bizde olur."`
      }
    ]
  },
  'kudus': {
    title: 'Kudüs',
    subtitle: 'Küllerden Doğan Umut',
    author: 'Beybörü',
    cover: '/images/books/kudus.jpg',
    description: 'Kudüs\'ün taşlarının ve sokaklarının taşıdığı derin acıları ve küllerin içinden doğan umudu dile getiren etkileyici roman.',
    publishDate: 'Şubat 2026',
    pages: 280,
    genre: 'Roman',
    chapters: [
      {
        title: 'Bölüm 1: Küllerin İçinde Umut',
        content: `Gökyüzü kül rengiydi. Gece boyunca yağan bombaların dumanı, şafağın ışığını boğuyor, güneşi hasta sarısı bir lekeye çeviriyordu. Sokaklar, taze çatlaklarla bezenmiş taşlarla doluydu. Her taşın üzerinde mermi izleri, bir gece öncesinin hikâyesini anlatıyor gibiydi.

Yusuf, evinin artık olmadığı yerdeydi. Bir yığın kırık tahta, eğri demir ve parçalanmış kiremitti karşısındaki. Ayakta duran tek şey, çatlamış bir duvarın üst köşesiydi; orada, bir zamanlar ailesinin fotoğrafının asılı olduğu çivi hâlâ duruyordu.

Elleriyle kazmaya başladı. Parmakları sıyrıldı, tırnakları kırıldı. Toz, ciğerlerine doldu. Neyi aradığını tam bilmiyordu. Belki bir fotoğraf, bir kitap, oğlunun okul defteri... Bir parça hayat.

Sonunda, siyaha dönmüş, kenarları közlenmiş bir kâğıt buldu. Bir Mushaf sayfasıydı. Dokunduğunda, sayfanın ortasındaki birkaç satır hâlâ okunabiliyordu: "...Sabredenlere müjdele." Elleri öyle şiddetle titriyordu ki, yazılar dans ediyor gibiydi. Sayfayı alnına götürdü, gözlerini kapadı.

"Baba..."

Yusuf irkildi. Arkasında, küçük oğlu Hasan duruyordu. Pijamasının üstü toz içindeydi, bir elinde su dolu çatlak bir fincan, diğer elinde küçük, yassı bir taş vardı.

"Hasan," diye boğuk bir ses çıkardı Yusuf. Ses telleri tozdan doluydu.

"Abi nerede?" diye sordu Hasan. Gözleri kocaman, boşluğa bakıyordu.

Yusuf, yanık sayfayı yavaşça cebine koydu. Oğlunun yanına çömeldi. Ona sarılmak, "burada" demek istedi. Ama kolları taş gibi ağırdı. Boğazında bir yumru vardı.

"Gitti, oğlum," diye fısıldayabildi sonunda. Sesini duyurmak için tüm gücünü toplaması gerekiyordu. "Abin gitti."

Hasan'ın yüzünde hiçbir şey değişmedi. Sadece elindeki taşı daha sıkı kavradı. "Nereye gitti?"

Yusuf cevap veremedi. Başını çevirdi. Sokakta, diğerleri de kendi enkazlarını elleriyle kazıyordu. Bir kadın, yanık bir battaniyeye sarılı küçük bir bedeni sallıyor, mırıldanıyordu. Yaşlı bir adam, bir baston parçasına tutunarak, yıkıntıların üzerinde sessizce ağlıyordu.`
      },
      {
        title: 'Bölüm 2: Sessiz Çığlıklar',
        content: `Sabah, Kudüs'e acıyla indi. Gece, duman ve sessizlik perdesini kaldırmış, gün ise kaybın tüm çıplaklığını ortaya sermişti. Güneş, toz bulutlarının arasından sızarak enkazı solgun bir altın rengine boyuyordu. Sanki şehir, yarasına bakan bir doktorun ışığını istemiyor gibiydi.

Yusuf, tahta bir tabutun ön tarafını omuzluyordu. Ahşap, omzuna batıyordu. Her adımda, tabutun içindeki ağırlık sadece oğlunun bedeni değil, kendi nefesinin bir parçası, geleceğinin bir yarısı gibi geliyordu. Yanında, Hasan'ın küçük eli, babasının eteğini koparacak kadar sıkı tutuyordu.

Mezarlık yolunda, yıkıntılar arasından geçiyorlardı. Taşlar, daha dün evlerin duvarıyken, şimdi mezarların komşusu olmuştu. Toprak, tazeydi. Daha önce açılmamış gibiydi.

İmamın sesi, rüzgârda kayboluyordu: "Allah için namaza..."

Sözler havada asılı kaldı. Kalplerdeki boşluk, o sözleri içine çekip yok ediyordu.

Zeynep Ana, önde duruyordu. Sırtı daha da bükülmüştü. Dudakları kıpırdıyor, ama bir şey duyulmuyordu. Elleri, bir zamanlar yemek yaptığı, çocuklarını okşadığı eller, şimdi havada titriyordu. Bir dua mıydı, yoksa bir isyan mı? Belli değildi.

Hasan, Yusuf'un eteğini çekti. "Baba."

"Efendim oğlum?"

"Abim...orada üşüyecek mi?"

Yusuf, nefesini tuttu. Boğazına bıçak saplanmış gibi oldu. Dizlerinin üzerine çöktü, Hasan'la aynı hizaya geldi.

"Üşümeyecek," dedi, sesi kırık bir düdük gibi çıktı. "Hiç üşümez orası."

"Ama karanlık," diye ısrar etti Hasan. Gözleri, babasının yüzünde cevap arıyordu.

Yusuf, oğlunun yanağını okşadı. Parmakları, Hasan'ın gözünden süzülen yaşa değdi. "Orada ışık var, oğlum. Bizim göremediğimiz bir ışık. Sıcak... çok sıcak."

İçinden bir şey koptu. Bu sözler, Hasan'ı mı teselli ediyordu, yoksa kendisini mi kandırıyordu? Bilmiyordu. Sadece konuşması gerekiyordu.`
      }
    ]
  },
  'zincirlerden-gunese': {
    title: 'Zincirlerden Güneşe',
    subtitle: 'Kara Güneş Doğuyor',
    author: 'Beybörü',
    cover: '/images/books/zincirlerden-gunese.jpg',
    description: 'Afrika\'nın özgürlük mücadelesini anlatan destansı roman. Zincirlerin kırılışının ve umudun doğuşunun hikayesi.',
    publishDate: 'Şubat 2026',
    pages: 350,
    genre: 'Roman',
    chapters: [
      {
        title: 'Bölüm 1: Karanlıkta Doğan Işık',
        content: `Yeraltındaki maden ocağı, uzun yıllar boyunca yalnızca karanlığı ve zincirlerin şakırtısını saklamıştı. Şimdi ise o paslı tünellerin içinde bambaşka bir şey doğuyordu: Umut.

Duvarlardan damlayan sular karanlığa çarpıp yankılanıyor, sanki yerin kendisi konuşuyordu. Pas, ter ve kömür kokusu havayı dolduruyordu ama bu gece bu kokuların içinde farklı bir koku daha vardı: Özgürlüğün ilk nefesi.

Küçük bir ateş yakılmıştı. Zayıf ama inatçı bir alevdi. Ateş, etrafına toplanan beş kişinin yüzünü aydınlatıyordu. Gözlerinde korku ile cesaret aynı anda parlıyordu.

Genç bir adam, kömür karası ellerini ateşe doğru uzattı. Sesi titremiyordu, gözleri yanıyordu:

"Kardeşlerim... Yüzyıllardır bize topraklarımızda zincir vurdular. Altınımızı, elmasımızı, petrolümüzü çaldılar. Ama en çok da ruhumuzu çaldılar. Artık yeter! Bugün burada, bu ateşin önünde yeni bir yemin edeceğiz."

Yanında oturan yaşlı adam, derin çizgilerle dolu yüzünü ateşe çevirdi. Sesi, yerin altından gelen uğultu gibi ağırdı:

"Batı bize yalnızca açlık ve gözyaşı bıraktı. Çocuklarımızın rüyalarını çaldılar. Ama unuttukları bir şey var: Afrika susmaz. Biz, toprak kadar kadim, güneş kadar inatçıyız. Zincirleri kıracağız!"

O sırada genç bir kadın öne çıktı. Saçları alnına yapışmış, gözleri alev gibi parlıyordu. Sesi bir şarkıyı andırıyordu; yumuşak ama kararlı:

"Benim annem, ninnilerimi yabancı dillerle söylemek zorunda kaldı. Benim kardeşlerim açlıktan toprağa düştü. Onlar susturuldu. Ama biz susmayacağız. Bugün bu ateş yalnızca bizi değil, torunlarımızı da aydınlatacak."

Bir diğer adam yumruğunu ateşe doğru kaldırdı. Sesinde öfke vardı, gözlerinde ise umudun ilk kıvılcımları:

"Bugün azız... ama yarın milyon olacağız! Onların tüfekleri var, evet. Ama bizim kalplerimiz yanıyor. Bizim şarkımız, bizim haykırışımız onların kurşunlarından daha güçlü olacak!"`
      },
      {
        title: 'Bölüm 2: Kıvılcımın Yayıldığı Geceler',
        content: `Yeraltında yakılan küçük ateşin dumanı, görünmez bir el tarafından taşınmış gibi Afrika'nın damarlarına karıştı. Nasıl olduğunu kimse tam anlayamadı ama ertesi sabah köylerde, kasabalarda, hatta şehirlerde bile aynı söz fısıldanıyordu:

"Kara Güneş doğuyor..."

Bu söz önce fısıltıyla yayıldı. Bir köyde yaşlı bir kadın, torununa uyumadan önce söylediği ninniye gizlice ekledi. Bir çoban, sürüsünü güderken mırıldandı. Bir işçi, şafakta arkadaşının kulağına eğilip fısıldadı. Kısa zamanda bu cümle, kıtanın en büyük sırrına dönüştü.

Gizli Mesajlar

Özgürlük hücreleri haberleşmek için çeşitli yollar seçmişti:

Şarkılar: Halk türkülerinin dizeleri içine gizlenmiş parolalar. Dinleyen herkes sıradan bir ezgi zannederdi ama bilenler, o sözlerin yeni çağrıyı işaret ettiğini anlardı.

Mektuplar: Limon suyuyla yazılmış satırlar. Kâğıt normalde boş görünürdü, ateşe tutulduğunda ise "Kara Güneş" kelimeleri ortaya çıkardı.

Semboller: Kapı eşiklerine kömürle çizilmiş küçük bir daire ve ortasında üç çizgi. Sıradan biri anlamazdı ama inananlar bilirdi: "Burada kardeşler var."

Birinci gizli mektup Nijerya'daki işçilerden Gana'daki bir köye gönderildi. Ateşe tutulunca şu satırlar belirdi:

"Bu topraklarda güneş yeniden doğacak. Bizim ellerimiz kara olabilir, ama yüreğimiz ateşle yanıyor. Kardeşim, hazır ol: Kara Güneş geliyor."

İlk Meclislerin Doğuşu

Nijerya'da bir petrol işçisi, gizlice on arkadaşını topladı. Ellerinde silah yoktu ama umut vardı. İlk küçük "Özgürlük Meclisi" böyle doğdu.

Kongo'da bir öğretmen, öğrencilerine tarih dersinde gizlice Kara Güneş'in hikâyesini işledi. Çocuklar gözleri parlayarak dinledi.

Kenya'da bir çiftçi, köy meydanında davul çaldı. Her vuruş, Kara Güneş'in kalp atışları gibi yankılandı. O gece köyün en yaşlı kadını, uzak diyarlardaki bir akrabasına gizlice şu satırları yazdı:

"Yüzyıllardır sustuk. Şimdi şarkımız yeniden söyleniyor. Kara Güneş yükseliyor, çocuklarımızın gözlerinde ışık var."`
      }
    ]
  }
};

export default function BookPreview() {
  const { slug } = useParams<{ slug: string }>();
  const book = slug ? bookPreviews[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!book) {
    return <Navigate to="/kitaplar" replace />;
  }

  return (
    <>
      <SEO
        title={`${book.title} - Ücretsiz Ön Okuma | Beybörü`}
        description={`${book.title} kitabından ücretsiz ön okuma. ${book.description}`}
        keywords={`${book.title}, ${book.author}, ücretsiz kitap oku, ön okuma, ${book.genre}`}
        url={`https://beyborudestanlari.com.tr/kitap/${slug}/on-okuma`}
        type="article"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Hero */}
        <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                <li><Link to="/" className="hover:text-[var(--beyboru-gold)]">Ana Sayfa</Link></li>
                <li>/</li>
                <li><Link to="/kitaplar" className="hover:text-[var(--beyboru-gold)]">Kitaplar</Link></li>
                <li>/</li>
                <li><Link to={`/kitap/${slug}`} className="hover:text-[var(--beyboru-gold)]">{book.title}</Link></li>
                <li>/</li>
                <li style={{ color: 'var(--beyboru-text)' }}>Ön Okuma</li>
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Book Cover Placeholder */}
              <div 
                className="w-48 h-72 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: 'var(--beyboru-accent)' }}
              >
                <BookOpen className="w-16 h-16" style={{ color: 'var(--beyboru-text-muted)' }} />
              </div>

              <div className="flex-1">
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                  style={{ 
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--beyboru-gold)',
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
                    {book.genre}
                  </span>
                </div>

                <h1 
                  className="font-playfair text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: 'var(--beyboru-text)' }}
                >
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p 
                    className="text-lg mb-4"
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {book.subtitle}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm mb-4" style={{ color: 'var(--beyboru-text-muted)' }}>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {book.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {book.publishDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {book.pages} sayfa
                  </div>
                </div>

                <p 
                  className="mb-6"
                  style={{ color: 'var(--beyboru-text-muted)' }}
                >
                  {book.description}
                </p>

                <div className="flex gap-3">
                  <Link to={`/kitap/${slug}`}>
                    <Button 
                      className="gap-2"
                      style={{ backgroundColor: 'var(--beyboru-gold)', color: '#000' }}
                    >
                      <BookOpen className="w-4 h-4" />
                      Kitap Detayı
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    className="gap-2"
                    style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                  >
                    <Heart className="w-4 h-4" />
                    Favorilere Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div 
              className="flex items-center gap-3 mb-8 pb-4 border-b"
              style={{ borderColor: 'var(--beyboru-border)' }}
            >
              <BookOpen className="w-6 h-6" style={{ color: 'var(--beyboru-gold)' }} />
              <h2 
                className="font-playfair text-2xl font-semibold"
                style={{ color: 'var(--beyboru-text)' }}
              >
                Ücretsiz Ön Okuma
              </h2>
            </div>

            <div className="space-y-8">
              {book.chapters.map((chapter, index) => (
                <Card 
                  key={index}
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                >
                  <CardContent className="p-6 sm:p-8">
                    <h3 
                      className="font-playfair text-xl sm:text-2xl font-semibold mb-6"
                      style={{ color: 'var(--beyboru-gold)' }}
                    >
                      {chapter.title}
                    </h3>
                    <div 
                      className="prose prose-lg max-w-none preview-content"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      {chapter.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div 
              className="mt-12 p-8 rounded-xl text-center"
              style={{ 
                backgroundColor: 'var(--beyboru-surface)',
                border: '1px solid var(--beyboru-border)',
              }}
            >
              <h3 
                className="font-playfair text-2xl font-semibold mb-4"
                style={{ color: 'var(--beyboru-text)' }}
              >
                Devamını Okumak İster misiniz?
              </h3>
              <p 
                className="mb-6 max-w-xl mx-auto"
                style={{ color: 'var(--beyboru-text-muted)' }}
              >
                {book.title} kitabının tamamını okumak için kitabı satın alabilir veya 
                kütüphanenize ekleyebilirsiniz.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to={`/kitap/${slug}`}>
                  <Button 
                    className="gap-2"
                    style={{ backgroundColor: 'var(--beyboru-gold)', color: '#000' }}
                  >
                    <BookOpen className="w-4 h-4" />
                    Kitabı İncele
                  </Button>
                </Link>
                <Link to="/iletisim">
                  <Button 
                    variant="outline"
                    style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                  >
                    Satın Al
                  </Button>
                </Link>
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-8 text-center">
              <Link to="/kitaplar">
                <Button 
                  variant="ghost" 
                  className="gap-2"
                  style={{ color: 'var(--beyboru-text-muted)' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tüm Kitaplara Dön
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
