import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

// Tüm blog içerikleri
const blogPostsData: Record<string, {
  title: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  keywords: string[];
  relatedPosts: string[];
}> = {
  'osmanlica-nedir': {
    title: 'Osmanlıca Nedir? Tarihi ve Önemi',
    date: '10 Mart 2026',
    category: 'Dil Tarihi',
    author: 'Beybörü',
    readTime: '8 dk',
    keywords: ['Osmanlıca nedir', 'Osmanlıca tarihi', 'Osmanlı alfabesi', 'eski Türkçe', 'Osmanlıca çeviri'],
    relatedPosts: ['gokturkce-nedir', 'osmanlica-ceviri-nasil-yapilir', 'turk-edebiyati-roman'],
    content: `
      <h2>Osmanlıca Nedir?</h2>
      <p>Osmanlıca, Osmanlı İmparatorluğu döneminde kullanılan yazı dilidir. Arap alfabesiyle yazılan bu dil, Türkçenin tarihi bir biçimidir. 1299'dan 1922'ye kadar imparatorluğun resmi dili olarak kullanılmıştır.</p>
      
      <h2>Osmanlıca Alfabe</h2>
      <p>Osmanlıca, Arap alfabesinin 28 harfine ek olarak Farsça'dan alınan 4 harf (پ, چ, ژ, گ) ile birlikte toplam 32 harften oluşur. Bu harfler:</p>
      <ul>
        <li>ا (elif) - sesli harf</li>
        <li>ب (be) - b sesi</li>
        <li>پ (pe) - p sesi (Farsça)</li>
        <li>ت (te) - t sesi</li>
        <li>ث (se) - s sesi</li>
        <li>ج (cim) - c sesi</li>
        <li>چ (çim) - ç sesi (Farsça)</li>
        <li>ح (ha) - h sesi</li>
        <li>خ (hı) - h sesi</li>
        <li>د (dal) - d sesi</li>
        <li>ذ (zel) - z sesi</li>
        <li>ر (re) - r sesi</li>
        <li>ز (ze) - z sesi</li>
        <li>ژ (je) - j sesi (Farsça)</li>
        <li>س (sin) - s sesi</li>
        <li>ش (şın) - ş sesi</li>
        <li>ص (sad) - s sesi</li>
        <li>ض (dad) - d/z sesi</li>
        <li>ط (tı) - t sesi</li>
        <li>ظ (zı) - z sesi</li>
        <li>ع (ayn) - sesli harf</li>
        <li>غ (gayn) - g/ğ sesi</li>
        <li>ف (fe) - f sesi</li>
        <li>ق (kaf) - k sesi</li>
        <li>ک (kef) - k sesi</li>
        <li>گ (gef) - g sesi (Farsça)</li>
        <li>ل (lam) - l sesi</li>
        <li>م (mim) - m sesi</li>
        <li>ن (nun) - n sesi</li>
        <li>و (vav) - v/o/ö/u/ü sesi</li>
        <li>ه (he) - h/e sesi</li>
        <li>ی (ye) - y/i/ı sesi</li>
      </ul>

      <h2>Osmanlıca'nın Tarihi</h2>
      <p>Osmanlıca, 13. yüzyılda Anadolu'da gelişmeye başladı. Selçuklular döneminde temelleri atılan bu dil, Osmanlı İmparatorluğu'nun yükselişiyle birlikte zenginleşti ve gelişti.</p>
      
      <p>Osmanlıca'nın gelişimi üç döneme ayrılır:</p>
      <ol>
        <li><strong>Eski Osmanlıca (1300-1500):</strong> Türkçe ağırlıklı, sade bir dil</li>
        <li><strong>Orta Osmanlıca (1500-1800):</strong> Farsça ve Arapça kelimelerin artması</li>
        <li><strong>Yeni Osmanlıca (1800-1928):</strong> Batılılaşma hareketleriyle birlikte değişim</li>
      </ol>

      <h2>Osmanlıca ve Modern Türkçe Arasındaki Farklar</h2>
      <p>Osmanlıca ile modern Türkçe arasında önemli farklar vardır:</p>
      <ul>
        <li><strong>Yazı sistemi:</strong> Osmanlıca Arap alfabesiyle, modern Türkçe Latin alfabesiyle yazılır</li>
        <li><strong>Sözcük dağarcığı:</strong> Osmanlıca'da çok fazla Arapça ve Farsça kelime kullanılır</li>
        <li><strong>Dil yapısı:</strong> Osmanlıca daha karmaşık cümle yapılarına sahiptir</li>
        <li><strong>Okunuş:</strong> Osmanlıca'da harfler bağlı yazılır ve sağdan sola doğru okunur</li>
      </ul>

      <h2>Osmanlıca Neden Önemlidir?</h2>
      <p>Osmanlıca, Türk tarihinin ve kültürünün önemli bir parçasıdır:</p>
      <ul>
        <li>600 yıllık Osmanlı tarihinin belgeleri Osmanlıca yazılmıştır</li>
        <li>Osmanlı dönemi edebiyat eserleri bu dilde kaleme alınmıştır</li>
        <li>Tarihi araştırmalar için Osmanlıca bilgisi gereklidir</li>
        <li>Türkçenin gelişimini anlamak için önemlidir</li>
      </ul>

      <h2>Osmanlıca Öğrenme</h2>
      <p>Osmanlıca öğrenmek isteyenler için birkaç yol vardır:</p>
      <ul>
        <li>Üniversitelerin Osmanlıca bölümlerinde eğitim almak</li>
        <li>Online Osmanlıca kurslarına katılmak</li>
        <li>Osmanlıca gramer kitapları çalışmak</li>
        <li>Osmanlıca çeviri araçları kullanmak</li>
      </ul>

      <h2>Sonuç</h2>
      <p>Osmanlıca, Türk tarihinin ve kültürünün ayrılmaz bir parçasıdır. Bu kadim dili öğrenmek, geçmişimizi anlamamıza ve tarihi mirasımıza sahip çıkmamıza yardımcı olur. Beybörü Yazar Evi olarak, Osmanlıca çeviri hizmetlerimizle bu değerli mirası gelecek nesillere aktarmayı amaçlıyoruz.</p>
    `
  },
  'gokturkce-nedir': {
    title: 'Göktürkçe Nedir? Orhun Yazıtları',
    date: '8 Mart 2026',
    category: 'Dil Tarihi',
    author: 'Beybörü',
    readTime: '10 dk',
    keywords: ['Göktürkçe nedir', 'Orhun yazıtları', 'Göktürk alfabesi', 'runik yazı', 'eski Türkçe'],
    relatedPosts: ['osmanlica-nedir', 'turk-mitolojisi', 'ergenekon-destani'],
    content: `
      <h2>Göktürkçe Nedir?</h2>
      <p>Göktürkçe, eski Türklerin kullandığı runik yazı sistemidir. 7. yüzyıldan itibaren Göktürkler tarafından kullanılmış olan bu alfabe, Türk dilinin en eski yazılı belgelerini oluşturur.</p>

      <h2>Orhun Yazıtları</h2>
      <p>Orhun Yazıtları, Göktürkçe'nin en önemli örnekleridir. 732-735 yılları arasında dikilmiş olan bu yazıtlar, Moğolistan'daki Orhun Nehri vadisinde bulunmuştur.</p>
      
      <p>Ünlü Orhun Yazıtları şunlardır:</p>
      <ul>
        <li><strong>Bilge Kağan Yazıtı:</strong> Göktürk Devleti'nin tarihini anlatır</li>
        <li><strong>Kül Tigin Yazıtı:</strong> Kül Tigin'in yaşamını ve savaşlarını anlatır</li>
        <li><strong>Tonyukuk Yazıtı:</strong> Bilge Tonyukuk'un hayatını ve danışmanlığını anlatır</li>
      </ul>

      <h2>Göktürk Alfabesi</h2>
      <p>Göktürk alfabesi 38 harften oluşur. Bu harfler şu şekilde sınıflandırılır:</p>
      
      <h3>Ünlüler (8 adet)</h3>
      <ul>
        <li>𐰀 (a)</li>
        <li>𐰃 (ı/i)</li>
        <li>𐰆 (u/ü)</li>
        <li>𐰇 (o/ö)</li>
      </ul>

      <h3>Ünsüzler (30 adet)</h3>
      <ul>
        <li>𐰋 (b)</li>
        <li>𐰲 (ç)</li>
        <li>𐰑 (d)</li>
        <li>𐰏 (g)</li>
        <li>𐰴 (k)</li>
        <li>𐰞 (s)</li>
        <li>𐱃 (t)</li>
        <li>𐰖 (y)</li>
        <li>𐰔 (n)</li>
        <li>𐰢 (m)</li>
        <li>𐰺 (r)</li>
        <li>𐰞 (s)</li>
        <li>𐱁 (ş)</li>
        <li>𐰔 (z)</li>
      </ul>

      <h2>Göktürkçe'nin Özellikleri</h2>
      <p>Göktürkçe'nin dikkat çeken özellikleri şunlardır:</p>
      <ul>
        <li><strong>Sondan eklemeli dil:</strong> Ekler kelimenin sonuna eklenir</li>
        <li><strong>Ünlü uyumu:</strong> Kelimelerde düz veya yuvarlak ünlüler bir arada kullanılır</li>
        <li><strong>Çift sesli harfler:</strong> Bazı harfler sert ve yumuşak olmak üzere çift olarak kullanılır</li>
        <li><strong>Sağdan sola yazım:</strong> Yazılar sağdan sola doğru yazılır</li>
      </ul>

      <h2>Orhun Yazıtları'nın İçeriği</h2>
      <p>Orhun Yazıtları, Göktürk Devleti'nin tarihi, siyasi olayları ve kültürel yaşamı hakkında değerli bilgiler içerir. Yazıtlarda şu konular işlenir:</p>
      <ul>
        <li>Göktürk Devleti'nin kuruluşu ve gelişimi</li>
        <li>Çin ile olan ilişkiler ve savaşlar</li>
        <li>Kağanların yaşamları ve başarıları</li>
        <li>Türk milletinin birlik ve beraberlik çağrıları</li>
        <li>Dini inançlar ve töreler</li>
      </ul>

      <h2>Göktürkçe ve Türkçe İlişkisi</h2>
      <p>Göktürkçe, modern Türkçenin atasıdır. İki dil arasında önemli benzerlikler vardır:</p>
      <ul>
        <li>Kelime kökleri büyük ölçüde aynıdır</li>
        <li>Dil yapısı benzerdir</li>
        <li>Eklerin kullanımı benzerdir</li>
        <li>Ses sistemi benzerdir</li>
      </ul>

      <h2>Göktürkçe Nasıl Öğrenilir?</h2>
      <p>Göktürkçe öğrenmek için şu kaynaklardan yararlanabilirsiniz:</p>
      <ul>
        <li>Orhun Yazıtları'nın transkripsiyonları</li>
        <li>Göktürkçe gramer kitapları</li>
        <li>Online Göktürkçe çeviri araçları</li>
        <li>Akademik çalışmalar ve makaleler</li>
      </ul>

      <h2>Sonuç</h2>
      <p>Göktürkçe, Türk dilinin ve kültürünün en eski yazılı kaynaklarından biridir. Orhun Yazıtları sayesinde binlerce yıl önceki atalarımızın sesini duyabiliyoruz. Bu değerli mirası korumak ve gelecek nesillere aktarmak hepimizin görevidir.</p>
    `
  },
  'turk-mitolojisi': {
    title: 'Türk Mitolojisi: Efsaneler ve Kahramanlar',
    date: '5 Mart 2026',
    category: 'Mitoloji',
    author: 'Beybörü',
    readTime: '12 dk',
    keywords: ['Türk mitolojisi', 'Türk efsaneleri', 'Ergenekon efsanesi', 'Bozkurt mitolojisi', 'Asena'],
    relatedPosts: ['ergenekon-destani', 'gokturkce-nedir', 'turk-edebiyati-roman'],
    content: `
      <h2>Türk Mitolojisi Nedir?</h2>
      <p>Türk mitolojisi, kadim Türklerin inanç sistemini, efsanelerini, kahramanlarını ve mitolojik varlıklarını içeren zengin bir kültürel mirastır. İskitlerden Hunlara, Göktürklerden Osmanlılara kadar uzanan binlerce yıllık bir geleneği temsil eder.</p>

      <h2>Türk Mitolojisinin Temel Öğeleri</h2>
      
      <h3>1. Bozkurt Efsanesi</h3>
      <p>Bozkurt, Türk mitolojisinin en önemli sembollerinden biridir. Efsaneye göre, bir Bozkurt yaralı bir çocuğu bulur ve onu emzirir. Bu çocuk büyüyerek Türklerin atası olur.</p>
      <p>Bozkurt'un sembolik anlamları:</p>
      <ul>
        <li>Güç ve cesaret</li>
        <li>Liderlik ve rehberlik</li>
        <li>Milletin koruyucusu</li>
        <li>Özgürlük ve bağımsızlık</li>
      </ul>

      <h3>2. Ergenekon Destanı</h3>
      <p>Ergenekon Destanı, Türk milletinin demir dağlar arasından kurtuluşunu anlatan kadim bir efsanedir. Bu destan, Türklerin zorluklar karşısındaki direncini ve özgürlük mücadelesini sembolize eder.</p>
      <p>Destanın ana temaları:</p>
      <ul>
        <li>Demir dağların eritilmesi</li>
        <li>Özgürlük arayışı</li>
        <li>Birlik ve beraberlik</li>
        <li>Yeni bir başlangıç</li>
      </ul>

      <h3>3. Asena Efsanesi</h3>
      <p>Asena, Göktürklerin atası olarak bilinen efsanevi bir kurt dişisidir. Efsaneye göre, bir çocuk kurt sütüyle büyütülür ve bu çocuk Türk kağanlarının soyunu başlatır.</p>

      <h2>Türk Mitolojisindeki Önemli Varlıklar</h2>
      
      <h3>Tanrılar ve İlahlar</h3>
      <ul>
        <li><strong>Gök Tanrı (Tengri):</strong> Gökyüzü tanrısı, en yüce varlık</li>
        <li><strong>Umay:</strong> Bereket ve koruma tanrıçası</li>
        <li><strong>Erlik:</strong> Yer altı dünyasının hükümdarı</li>
        <li><strong>Kayra Han:</strong> Yaratıcı tanrı</li>
      </ul>

      <h3>Mitolojik Yaratıklar</h3>
      <ul>
        <li><strong>Şahmeran:</strong> Yılan vücutlu, insan başlı yaratık</li>
        <li><strong>Tulpar:</strong> Kanatlı at</li>
        <li><strong>Abra:</strong> Su perisi</li>
        <li><strong>Alkarısı:</strong> Kötü ruh</li>
        <li><strong>Tepegöz:</strong> Tek gözlü dev</li>
      </ul>

      <h2>Türk Mitolojisindeki Kahramanlar</h2>
      
      <h3>Alp Er Tunga</h3>
      <p>Alp Er Tunga, İran destanlarında da yer alan efsanevi bir Türk kahramanıdır. Güçlü, cesur ve adil bir lider olarak tasvir edilir.</p>

      <h3>Köroğlu</h3>
      <p>Köroğlu, halk edebiyatımızın en ünlü kahramanlarından biridir. Zalim beylerle mücadele eden, halkın yanında yer alan bir efsanevi kişiliktir.</p>

      <h3>Dede Korkut</h3>
      <p>Dede Korkut, Oğuz Türklerinin bilge dedesi ve hikaye anlatıcısıdır. Dede Korkut Kitabı'nda yer alan hikayeler, Türk kültürünün değerli kaynaklarındandır.</p>

      <h2>Türk Mitolojisi ve Doğa</h2>
      <p>Türk mitolojisinde doğa önemli bir yer tutar:</p>
      <ul>
        <li><strong>Ağaçlar:</strong> Kutsal sayılır, özellikle kayın ve söğüt</li>
        <li><strong>Dağlar:</strong> Tanrıların yurdu olarak kabul edilir</li>
        <li><strong>Sular:</strong> Arınma ve temizlenme sembolüdür</li>
        <li><strong>Ateş:</strong> Kutsal ve arındırıcı bir elementtir</li>
        <li><strong>Gök:</strong> Tanrıların ve ruhların alemi</li>
      </ul>

      <h2>Türk Mitolojisinin Günümüzdeki Önemi</h2>
      <p>Türk mitolojisi günümüzde de önemini korumaktadır:</p>
      <ul>
        <li>Edebiyat eserlerine ilham verir</li>
        <li>Sanatsal faaliyetlerde kullanılır</li>
        <li>Kültürel kimliğin korunmasına yardımcı olur</li>
        <li>Tarih bilincinin gelişimine katkı sağlar</li>
      </ul>

      <h2>Sonuç</h2>
      <p>Türk mitolojisi, binlerce yıllık bir kültürel birikimin ürünüdür. Bu zengin miras, Türk milletinin dünya görüşünü, değerlerini ve hayal gücünü yansıtır. Mitolojik hikayelerimizi okumak, anlamak ve gelecek nesillere aktarmak, kültürel kimliğimizin korunması açısından büyük önem taşır.</p>
    `
  },
  'osmanlica-ceviri-nasil-yapilir': {
    title: 'Osmanlıca Çeviri Nasıl Yapılır?',
    date: '1 Mart 2026',
    category: 'Rehber',
    author: 'Beybörü',
    readTime: '6 dk',
    keywords: ['Osmanlıca çeviri', 'Osmanlıca öğrenme', 'Arap alfabesi', 'online çeviri', 'Osmanlıca çevirmen'],
    relatedPosts: ['osmanlica-nedir', 'gokturkce-nedir', 'turk-edebiyati-roman'],
    content: `
      <h2>Osmanlıca Çeviri Nedir?</h2>
      <p>Osmanlıca çeviri, Arap alfabesiyle yazılmış Osmanlıca metinlerin modern Türkçeye aktarılması işlemidir. Bu işlem, sadece harflerin dönüştürülmesinden ibaret değildir; aynı zamanda dilin yapısının, kelimelerin anlamlarının ve bağlamın doğru şekilde aktarılmasını gerektirir.</p>

      <h2>Osmanlıca Çeviri Yöntemleri</h2>
      
      <h3>1. Manuel Çeviri</h3>
      <p>Manuel çeviri, Osmanlıca bilen bir kişinin metni kelime kelime okuyup anlamlandırarak çevirmesidir. Bu yöntem en doğru sonucu verir ancak zaman alıcıdır.</p>
      <p>Manuel çeviri adımları:</p>
      <ol>
        <li>Metni dikkatlice inceleyin</li>
        <li>Harfleri tanımlayın ve seslendirin</li>
        <li>Kelimeleri modern Türkçeye aktarın</li>
        <li>Cümle yapısını düzenleyin</li>
        <li>Anlam bütünlüğünü kontrol edin</li>
      </ol>

      <h3>2. Dijital Çeviri Araçları</h3>
      <p>Günümüzde birçok online araç Osmanlıca çeviri yapabilir. Bu araçlar, Arap harflerini Latin harflerine dönüştürür ve bazı temel kelimeleri çevirir.</p>
      <p>Avantajları:</p>
      <ul>
        <li>Hızlı sonuç</li>
        <li>Kolay kullanım</li>
        <li>Ücretsiz seçenekler</li>
      </ul>
      <p>Dezavantajları:</p>
      <ul>
        <li>Tam doğruluk garantisi yok</li>
        <li>Karmaşık cümlelerde zorlanma</li>
        <li>Arapça/Farsça kelimelerde hata</li>
      </ul>

      <h2>Osmanlıca Çeviri İçin Gerekli Bilgiler</h2>
      
      <h3>Alfabe Bilgisi</h3>
      <p>Osmanlıca çeviri yapabilmek için Arap alfabesinin 32 harfini tanımanız gerekir. Her harfin farklı yazım şekilleri (baş, orta, son, ayrık) vardır.</p>

      <h3>Dil Bilgisi</h3>
      <p>Osmanlıca metinlerde sıkça karşılaşılan yapılar:</p>
      <ul>
        <li>Arapça kökenli kelimeler ve ekler</li>
        <li>Farsça kelimeler ve deyimler</li>
        <li>Eski Türkçe sözcükler</li>
        <li>Karmaşık cümle yapıları</li>
      </ul>

      <h2>Osmanlıca Çeviri Zorlukları</h2>
      
      <h3>1. Harflerin Bağlı Yazımı</h3>
      <p>Osmanlıca'da harfler birbirine bağlı yazılır. Bu, harflerin ayrımını zorlaştırabilir.</p>

      <h3>2. Noktalama İşaretleri</h3>
      <p>Osmanlıca metinlerde noktalama işaretleri modern Türkçeden farklıdır veya hiç kullanılmayabilir.</p>

      <h3>3. Arapça ve Farsça Kelimeler</h3>
      <p>Osmanlıca metinlerde çok sayıda Arapça ve Farsça kelime bulunur. Bu kelimelerin Türkçe karşılıklarını bilmek gerekir.</p>

      <h3>4. El Yazısı Zorluğu</h3>
      <p>El yazısı Osmanlıca metinler okumayı ve çevirmeyi daha da zorlaştırır.</p>

      <h2>Profesyonel Osmanlıca Çeviri Hizmetleri</h2>
      <p>Önemli belgeler için profesyonel çeviri hizmetleri tercih edilmelidir. Beybörü Yazar Evi olarak, uzman kadromuzla Osmanlıca çeviri hizmeti sunmaktayız.</p>
      <p>Hizmetlerimiz:</p>
      <ul>
        <li>Tarihi belge çevirisi</li>
        <li>Vakıf kayıtları çevirisi</li>
        <li>Aile arşivi çevirisi</li>
        <li>Edebî metin çevirisi</li>
        <li>Tapu ve resmî evrak çevirisi</li>
      </ul>

      <h2>Osmanlıca Öğrenme İpuçları</h2>
      <p>Osmanlıca çeviri yapabilmek için dil öğrenmeniz faydalı olacaktır:</p>
      <ul>
        <li>Alfabe pratiği yapın</li>
        <li>Sade metinlerden başlayın</li>
        <li>Sözlük kullanın</li>
        <li>Çok okuyun ve pratik yapın</li>
        <li>Uzmanlardan destek alın</li>
      </ul>

      <h2>Sonuç</h2>
      <p>Osmanlıca çeviri, sabır ve dikkat gerektiren bir iştir. Doğru araçlar ve bilgi birikimiyle, bu kadim dili modern Türkçeye başarıyla aktarabilirsiniz. Profesyonel destek için bizimle iletişime geçebilirsiniz.</p>
    `
  },
  'turk-edebiyati-roman': {
    title: 'Türk Edebiyatında Tarihi Romanlar',
    date: '25 Şubat 2026',
    category: 'Edebiyat',
    author: 'Beybörü',
    readTime: '9 dk',
    keywords: ['Türk edebiyatı', 'tarihi roman', 'Türk romanı', 'edebiyat', 'tarih'],
    relatedPosts: ['ergenekon-destani', 'turk-mitolojisi', 'osmanlica-nedir'],
    content: `
      <h2>Türk Edebiyatında Tarihi Roman</h2>
      <p>Türk edebiyatında tarihi roman, geçmiş dönemleri, olayları ve kişileri konu alan önemli bir türdür. Tarih ve kurgunun harmanlandığı bu romanlar, okuyucuyu geçmişe götürerek hem eğlendirir hem de bilgilendirir.</p>

      <h2>Tarihi Romanın Özellikleri</h2>
      <p>Tarihi romanların temel özellikleri şunlardır:</p>
      <ul>
        <li><strong>Tarihsel bağlam:</strong> Belirli bir tarihsel dönemde geçer</li>
        <li><strong>Gerçek olaylar:</strong> Tarihsel olaylar romanın temelini oluşturur</li>
        <li><strong>Kurgu karakterler:</strong> Gerçek ve kurgu karakterler bir arada yer alır</li>
        <li><strong>Dönem detayları:</strong> Giyim, kuşam, yaşam tarzı gibi detaylar önemlidir</li>
        <li><strong>Dil kullanımı:</strong> Dönemin diline uygun ifadeler kullanılır</li>
      </ul>

      <h2>Türk Edebiyatının Önemli Tarihi Romanları</h2>

      <h3>1. Tarih-i Kadim (Namık Kemal)</h3>
      <p>Namık Kemal'in eseri, Osmanlı İmparatorluğu'nun yükseliş dönemini anlatır. Vatan sevgisi ve özgürlük temaları işlenir.</p>

      <h3>2. Çalıkuşu (Reşat Nuri Güntekin)</h3>
      <p>Reşat Nuri Güntekin'in başyapıtı, Cumhuriyet dönemi Türkiye'sini anlatan önemli bir romandır.</p>

      <h3>3. Kurt Kanunu (Yakup Kadri Karaosmanoğlu)</h3>
      <p>Cumhuriyet'in ilanı sonrası dönemi anlatan bu roman, toplumsal değişimleri ele alır.</p>

      <h3>4. Osmanlıcık (Kemal Tahir)</h3>
      <p>Kemal Tahir'in tarihi romanları, Osmanlı toplum yapısını derinlemesine inceler.</p>

      <h3>5. Diriliş (Tarık Buğra)</h3>
      <p>Malazgirt Savaşı'nı konu alan bu roman, Türklerin Anadolu'ya girişini anlatır.</p>

      <h2>Çağdaş Türk Edebiyatında Tarihi Roman</h2>
      <p>Günümüzde tarihi roman türü büyük ilgi görmektedir. Çağdaş yazarlar, farklı dönemleri ve olayları romanlarına konu etmektedir.</p>

      <h3>Beybörü'nün Eserleri</h3>
      <p>Beybörü Yazar Evi olarak, tarihi ve mitolojik temaları işleyen romanlar yazıyoruz:</p>
      <ul>
        <li><strong>Ergenekon:</strong> Göktürk dönemini ve Ergenekon destanını konu alan roman</li>
        <li><strong>Kudüs:</strong> Ortadoğu'nun kadim şehri üzerine bir hikaye</li>
        <li><strong>Zincirlerden Güneşe:</strong> Afrika'nın özgürlük mücadelesini anlatan roman</li>
      </ul>

      <h2>Tarihi Roman Yazmanın Zorlukları</h2>
      <p>Tarihi roman yazmak, büyük bir araştırma ve bilgi birikimi gerektirir:</p>
      <ul>
        <li>Detaylı tarih araştırması yapmak gerekir</li>
        <li>Dönemin sosyal yapısını doğru yansıtmak önemlidir</li>
        <li>Kurgu ve tarih arasında denge kurmak gerekir</li>
        <li>Dönem dilini doğru kullanmak zorunludur</li>
      </ul>

      <h2>Tarihi Romanın Önemi</h2>
      <p>Tarihi romanlar, geçmişi anlamamız ve geleceğe taşımamız açısından önemlidir:</p>
      <ul>
        <li>Tarih bilincini geliştirir</li>
        <li>Kültürel mirası korur</li>
        <li>Millî kimliği güçlendirir</li>
        <li>Eğlenceli bir şekilde bilgi verir</li>
      </ul>

      <h2>Sonuç</h2>
      <p>Türk edebiyatında tarihi roman, zengin bir geleneğe sahiptir. Geçmişi anlamak ve geleceğe taşımak için bu tür eserleri okumak ve yazmak büyük önem taşır. Beybörü Yazar Evi olarak, bu değerli geleneğe katkıda bulunmaya devam ediyoruz.</p>
    `
  },
  'ergenekon-destani': {
    title: 'Ergenekon Destanı ve Anlamı',
    date: '20 Şubat 2026',
    category: 'Mitoloji',
    author: 'Beybörü',
    readTime: '11 dk',
    keywords: ['Ergenekon destanı', 'Türk mitolojisi', 'demir dağlar', 'Türk efsanesi', 'Bozkurt'],
    relatedPosts: ['turk-mitolojisi', 'gokturkce-nedir', 'turk-edebiyati-roman'],
    content: `
      <h2>Ergenekon Destanı Nedir?</h2>
      <p>Ergenekon Destanı, Türk milletinin demir dağlar arasından kurtuluşunu anlatan kadim bir efsanedir. Bu destan, Türklerin özgürlük ve bağımsızlık mücadelesinin sembolü haline gelmiştir.</p>

      <h2>Destanın Hikayesi</h2>
      <p>Efsaneye göre, Türkler çok uzun zaman önce demir dağlarla çevrili bir vadiye sıkışmıştır. Bu vadi, dış dünyayla tüm bağlantıları kesmiştir. Türkler burada yıllarca yaşamak zorunda kalmıştır.</p>
      
      <p>Ancak Türkler, bu zorlu koşullara boyun eğmemiştir. Demir dağları eritmek için çalışmalar başlatmışlardır. Nihayetinde, demir dağlar erimiş ve Türkler vadiden çıkarak özgürlüklerine kavuşmuşlardır.</p>

      <h2>Destanın Sembolik Anlamı</h2>
      <p>Ergenekon Destanı, sadece bir çıkış hikayesi değil, aynı zamanda derin sembolik anlamlar taşır:</p>
      
      <h3>Demir Dağlar</h3>
      <p>Demir dağlar, Türk milletinin karşılaştığı zorlukları ve engelleri temsil eder. Bu dağlar, dış düşmanları, iç çatışmaları, doğal afetleri ve tüm olumsuz koşulları simgeler.</p>

      <h3>Vadi</h3>
      <p>Vadi, Türklerin zor zamanlardaki durumunu temsil eder. Daralan bir alan, kısıtlı imkanlar ve sınırlı özgürlük anlamına gelir.</p>

      <h3>Demiri Eritmek</h3>
      <p>Demiri eritmek, zorlukların aşılması için gösterilen çabayı ve azmi temsil eder. Türklerin birlik ve beraberlik içinde çalışması, sonunda engelleri aşmasını sağlar.</p>

      <h3>Özgürlüğe Çıkış</h3>
      <p>Vadiden çıkış, yeni bir başlangıcı ve özgürlüğü simgeler. Türk milletinin her zorluktan sonra daha güçlü bir şekilde yeniden doğuşu.</p>

      <h2>Ergenekon ve Bozkurt</h2>
      <p>Destanın bazı versiyonlarında, Türklere yol gösteren bir Bozkurt vardır. Bozkurt, Türklerin atası ve rehberi olarak kabul edilir. Bu bağlamda Ergenekon ve Bozkurt efsaneleri birbirine bağlıdır.</p>

      <h2>Destanın Tarihsel Arka Planı</h2>
      <p>Ergenekon Destanı'nın tarihsel bir temeli olduğu düşünülmektedir. Bazı araştırmacılar, destanın Göktürklerin Çinlilerden kurtuluşunu anlattığını savunmaktadır. Diğer bir görüşe göre, destan Hunlar dönemine kadar uzanmaktadır.</p>

      <p>Destanın tarihsel arka planı ne olursa olsun, sembolik anlamı ve millet için taşıdığı değer değişmemektedir.</p>

      <h2>Ergenekon Destanı ve Millî Kimlik</h2>
      <p>Ergenekon Destanı, Türk millî kimliğinin önemli bir parçasıdır:</p>
      <ul>
        <li>Birlik ve beraberlik duygusunu güçlendirir</li>
        <li>Zorluklar karşısında direnci artırır</li>
        <li>Özgürlük ve bağımsızlık aşkını canlı tutar</li>
        <li>Tarih bilincini geliştirir</li>
        <li>Kültürel kimliği korur</li>
      </ul>

      <h2>Ergenekon Günü</h2>
      <p>Türkiye'de her yıl 21 Mart'ta Nevruz Bayramı kutlanır. Bu bayram, aynı zamanda Ergenekon'dan çıkışın sembolik günü olarak da kabul edilir. Bu günde, Türk milletinin özgürlük ve bağımsızlık mücadelesi anılır.</p>

      <h2>Ergenekon Edebiyatta</h2>
      <p>Ergenekon Destanı, Türk edebiyatında birçok esere ilham vermiştir. Beybörü'nün "Ergenekon" romanı, bu destanı modern bir bakış açısıyla ele alır ve yeni nesillere aktarır.</p>

      <h2>Sonuç</h2>
      <p>Ergenekon Destanı, Türk milletinin ruhunu en iyi yansıtan efsanelerden biridir. Zorluklar karşısında yılmama, birlik ve beraberlik içinde çalışma, ve özgürlük uğruna mücadele etme ruhu, bu destanın temel mesajıdır. Bu değerli mirası korumak ve gelecek nesillere aktarmak hepimizin görevidir.</p>
    `
  }
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPostsData[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEO
        title={`${post.title} - Beybörü Blog`}
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        keywords={post.keywords.join(', ')}
        url={`https://beyborudestanlari.com.tr/blog/${id}`}
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
                <li><Link to="/blog" className="hover:text-[var(--beyboru-gold)]">Blog</Link></li>
                <li>/</li>
                <li style={{ color: 'var(--beyboru-text)' }}>{post.title}</li>
              </ol>
            </nav>

            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--beyboru-gold)',
              }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
                {post.category}
              </span>
            </div>
            
            <h1 
              className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: 'var(--beyboru-text)' }}
            >
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} okuma
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <article 
              className="prose prose-lg max-w-none blog-content"
              style={{ color: 'var(--beyboru-text)' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--beyboru-border)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span style={{ color: 'var(--beyboru-text-muted)' }}>Paylaş:</span>
                  <Button variant="ghost" size="icon" className="hover:bg-[var(--beyboru-accent)]">
                    <Share2 className="w-5 h-5" style={{ color: 'var(--beyboru-text)' }} />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-[var(--beyboru-accent)]">
                    <Bookmark className="w-5 h-5" style={{ color: 'var(--beyboru-text)' }} />
                  </Button>
                </div>
                <Link to="/blog">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    style={{ borderColor: 'var(--beyboru-border)', color: 'var(--beyboru-text)' }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Tüm Yazılar
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-12">
              <h3 
                className="font-playfair text-2xl font-semibold mb-6"
                style={{ color: 'var(--beyboru-text)' }}
              >
                İlgili Yazılar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.relatedPosts.map((relatedId) => {
                  const related = blogPostsData[relatedId];
                  if (!related) return null;
                  return (
                    <Link key={relatedId} to={`/blog/${relatedId}`}>
                      <div 
                        className="p-4 rounded-lg transition-all hover:scale-[1.02]"
                        style={{ 
                          backgroundColor: 'var(--beyboru-surface)',
                          border: '1px solid var(--beyboru-border)',
                        }}
                      >
                        <span 
                          className="text-xs px-2 py-1 rounded mb-2 inline-block"
                          style={{ backgroundColor: 'var(--beyboru-accent)', color: 'var(--beyboru-text)' }}
                        >
                          {related.category}
                        </span>
                        <h4 
                          className="font-semibold line-clamp-2"
                          style={{ color: 'var(--beyboru-text)' }}
                        >
                          {related.title}
                        </h4>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
