-- BEYBÖRÜ YAZAR EVİ - TAM DATABASE ŞEMASI
-- ESKİ TÜM TABLOLARI SİLİP YENİDEN OLUŞTURUR
-- DİKKAT: Bu script tüm verileri siler!

-- ============================================
-- 0. TEMİZLİK - ESKİ HER ŞEYİ SİL
-- ============================================
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Updates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Deletes" ON storage.objects;

DROP FUNCTION IF EXISTS increment_book_view(TEXT);

DROP INDEX IF EXISTS idx_books_status;
DROP INDEX IF EXISTS idx_books_slug;
DROP INDEX IF EXISTS idx_books_featured;
DROP INDEX IF EXISTS idx_characters_book_id;
DROP INDEX IF EXISTS idx_locations_book_id;
DROP INDEX IF EXISTS idx_concepts_book_id;
DROP INDEX IF EXISTS idx_timeline_book_id;

DROP TABLE IF EXISTS timeline_events CASCADE;
DROP TABLE IF EXISTS concepts CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS daily_stats CASCADE;

DELETE FROM storage.buckets WHERE id = 'images';

-- ============================================
-- 1. KİTAPLAR TABLOSU
-- ============================================
CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL DEFAULT '',
  full_description TEXT,
  cover_image TEXT NOT NULL DEFAULT '',
  back_cover_image TEXT,
  preview_images TEXT[] DEFAULT '{}',
  kdy_link TEXT,
  kdy_book_id TEXT,
  price DECIMAL(10,2),
  page_count INTEGER,
  isbn TEXT,
  publish_date DATE,
  category TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT true,
  
  -- Kitap sayfası için ek alanlar
  first_chapter TEXT,
  first_chapter_title TEXT DEFAULT 'İlk Bölümden Bir Alıntı',
  
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. KARAKTERLER TABLOSU (Admin Kontrollü)
-- ============================================
CREATE TABLE characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('protagonist', 'antagonist', 'supporting', 'minor')),
  short_description TEXT NOT NULL DEFAULT '',
  full_description TEXT,
  traits TEXT[] DEFAULT '{}',
  appears_in TEXT[] DEFAULT '{}',
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, slug)
);

-- ============================================
-- 3. LOKASYONLAR TABLOSU (Admin Kontrollü)
-- ============================================
CREATE TABLE locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('city', 'country', 'landmark', 'mystery', 'region', 'building')),
  region TEXT,
  short_description TEXT NOT NULL DEFAULT '',
  full_description TEXT,
  significance TEXT,
  coordinates JSONB,
  image_url TEXT,
  related_books TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, slug)
);

-- ============================================
-- 4. KAVRAMLAR TABLOSU (Admin Kontrollü)
-- ============================================
CREATE TABLE concepts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('power', 'organization', 'artifact', 'mystery', 'technology', 'culture')),
  short_description TEXT NOT NULL DEFAULT '',
  full_description TEXT,
  related_books TEXT[] DEFAULT '{}',
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, slug)
);

-- ============================================
-- 5. ZAMAN ÇİZELGESİ TABLOSU (Admin Kontrollü)
-- ============================================
CREATE TABLE timeline_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  era TEXT NOT NULL CHECK (era IN ('ancient', 'medieval', 'modern', 'future')),
  related_books TEXT[] DEFAULT '{}',
  related_characters TEXT[] DEFAULT '{}',
  related_locations TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. YORUMLAR TABLOSU (Admin Kontrollü)
-- ============================================
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. AYARlar TABLOSU
-- ============================================
CREATE TABLE settings (
  id TEXT PRIMARY KEY DEFAULT '1',
  site_title TEXT DEFAULT 'Beybörü Yazar Evi',
  site_description TEXT DEFAULT 'Türk edebiyatının yeni sesi',
  hero_title TEXT DEFAULT 'Beybörü Yazar Evi',
  hero_subtitle TEXT DEFAULT 'Kelimelerin izinde, hikayelerin peşinde...',
  about_title TEXT DEFAULT 'Hakkımda',
  about_content TEXT DEFAULT 'Beybörü, Türk edebiyatına yeni bir soluk getiren bir yazar.',
  contact_email TEXT DEFAULT 'gokboru43official@gmail.com',
  contact_phone TEXT,
  social_twitter TEXT,
  social_instagram TEXT,
  social_youtube TEXT,
  seo_default_title TEXT DEFAULT 'Beybörü Yazar Evi',
  seo_default_description TEXT DEFAULT 'Beybörü - Türk edebiyatının yeni sesi',
  theme TEXT DEFAULT 'dark',
  primary_color TEXT DEFAULT '#8B3A3A',
  accent_color TEXT DEFAULT '#D4AF37',
  logo_url TEXT,
  favicon_url TEXT,
  
  -- İstatistik ayarları
  show_visitor_count BOOLEAN DEFAULT true,
  show_book_count BOOLEAN DEFAULT true,
  show_hero_count BOOLEAN DEFAULT true,
  show_language_count BOOLEAN DEFAULT true,
  
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. GÜNLÜK İSTATİSTİKLER TABLOSU
-- ============================================
CREATE TABLE daily_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  visitor_count INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. STORAGE BUCKET
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- ============================================
-- 10. STORAGE POLICY'LERİ
-- ============================================
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated Uploads" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated Updates" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'images');

CREATE POLICY "Authenticated Deletes" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'images');

-- ============================================
-- 11. İNDEKSLER
-- ============================================
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_books_slug ON books(slug);
CREATE INDEX idx_books_featured ON books(is_featured) WHERE is_featured = true;
CREATE INDEX idx_characters_book_id ON characters(book_id);
CREATE INDEX idx_characters_active ON characters(is_active) WHERE is_active = true;
CREATE INDEX idx_locations_book_id ON locations(book_id);
CREATE INDEX idx_locations_active ON locations(is_active) WHERE is_active = true;
CREATE INDEX idx_concepts_book_id ON concepts(book_id);
CREATE INDEX idx_concepts_active ON concepts(is_active) WHERE is_active = true;
CREATE INDEX idx_timeline_book_id ON timeline_events(book_id);
CREATE INDEX idx_timeline_active ON timeline_events(is_active) WHERE is_active = true;
CREATE INDEX idx_reviews_book_id ON reviews(book_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;

-- ============================================
-- 12. FONKSİYONLAR
-- ============================================
CREATE OR REPLACE FUNCTION increment_book_view(book_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE books 
  SET view_count = view_count + 1 
  WHERE slug = book_slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_daily_visitor()
RETURNS VOID AS $$
BEGIN
  INSERT INTO daily_stats (date, visitor_count)
  VALUES (CURRENT_DATE, 1)
  ON CONFLICT (date)
  DO UPDATE SET visitor_count = daily_stats.visitor_count + 1;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 13. VARSAYILAN VERİLER
-- ============================================

-- Settings
INSERT INTO settings (id) VALUES ('1');

-- Kitaplar
INSERT INTO books (
  slug, title, subtitle, description, full_description, 
  cover_image, price, page_count, isbn, publish_date,
  category, tags, status, is_featured, is_new,
  first_chapter, first_chapter_title,
  seo_title, seo_description, seo_keywords
) VALUES 
(
  'ergenekod',
  'ERGENEKOD: GÖKTEKİ MİRAS',
  '',
  'Göktürk tamgalarıyla korunan kadim bir gemi, modern Ankara''da gün yüzüne çıkar.',
  'Profesör Aras Soykan, 1970''lerde Moğolistan''da kaybolan bir jeolog ekibine ait gizemli dosyayı inceler. "Proje: Demirdağ" koduyla mühürlenmiş bu dosya, ekibi Orhun Vadisi''ndeki devasa bir yeraltı labirentine götürür. Burada keşfedilen Ergenekon Gemisi, Göktürk tamgalarıyla korunan tuzaklarla dolu, binlerce yıllık bir arşivdir. Selin Karaca, babasının bilincinin bir kopyasıyla karşılaşır ve insanlığından vazgeçerek geminin dijital rehberi olur.',
  'https://img.kitapyurdu.com/v1/getImage/fn:12177399/wi:800/wh:25a239bd7',
  119.00,
  84,
  '9786258662054',
  '2026-02-10',
  ARRAY['tarih', 'macera', 'bilim-kurgu'],
  ARRAY['ergenekon', 'türk mitolojisi', 'bozkurt', 'göktürk', 'arkeoloji'],
  'published',
  true,
  true,
  'İstanbul''un sisli bir kasım sabahında, Dr. Aydın Yılmaz Üniversite kütüphanesinin bodrum katındaki tozlu raflar arasında kaybolmuştu. Elindeki eski harita, dedesinden kalma bir mirasın parçasıydı...',
  'İlk Bölümden Bir Alıntı',
  'Ergenekod: Gökteki Miras | Beybörü | Türk Mitolojisi Romanı',
  'Göktürk tamgalarıyla korunan kadim bir gemi, modern Ankara''da gün yüzüne çıkar. Arkeoloji, mitoloji ve bilim kurgunun harmanlandığı epik bir macera.',
  ARRAY['ergenekod', 'beybörü', 'türk mitolojisi', 'göktürk', 'arkeoloji']
),
(
  'kudus',
  'KUDÜS',
  'Küllerden Doğan Umut',
  'Savaşın yarattığı yıkımın ortasında, Kudüs''lüler dayanışma ve umutla hayata tutunmaya çalışır.',
  'Hikâye, günümüzde savaşın ağır izlerini taşıyan Kudüs''te geçer. Bombardımanlardan sonra evlerin yıkıldığı, sokakların sessizliğe büründüğü bir zamanda insanlar hayatta kalmaya ve yeniden umut bulmaya çalışmaktadır. Yıkılmış evinin önünde duran Yusuf, küçük oğlu Hasan ile birlikte hayatlarını yeniden kurmaya çalışır. Mahallede yaşayan Zeynep Ana, insanlara sabretmeleri ve birbirlerine destek olmaları gerektiğini hatırlatarak herkes için moral kaynağı olur.',
  'https://img.kitapyurdu.com/v1/getImage/fn:12177398/wi:800/wh:d760b5716',
  159.00,
  148,
  '9786258662122',
  '2026-02-10',
  ARRAY['edebiyat', 'roman', 'dram'],
  ARRAY['kudüs', 'umut', 'direniş', 'savaş', 'dayanışma'],
  'published',
  true,
  true,
  'Siren sesleri yine gökyüzünü delip geçti. Umut, enkazların arasından süzülen ışık huzmesine bakarken, elindeki son ekmeği küçük kız kardeşine uzattı...',
  'İlk Bölümden Bir Alıntı',
  'Kudüs | Beybörü | Küllerden Doğan Umut',
  'Savaşın yarattığı yıkımın ortasında, Kudüs''lüler dayanışma ve umutla hayata tutunmaya çalışır. Yıkımdan doğan umut hikayesi.',
  ARRAY['kudüs', 'beybörü', 'umut', 'direniş', 'filistin']
),
(
  'zincirlerden-gunese',
  'Zincirlerden Güneşe',
  'Kara Güneş Doğuyor',
  'Afrika kıtasında doğan özgürlük hareketi, dünyayı sarsan bir direnişe dönüşür.',
  'Roman, Afrika kıtasının farklı bölgelerinde geçen bir direniş hareketinin doğuşunu anlatır. Yeraltındaki maden ocaklarında ve gizli toplantı noktalarında başlayan hareket, kısa sürede "Kara Güneş" adı verilen bir özgürlük direnişine dönüşür. Nijerya''dan Kenya''ya, Kongo''dan Güney Afrika''ya kadar yayılan bu hareket, "Duruş Günü" ile dünya ekonomisini sarsar.',
  'https://img.kitapyurdu.com/v1/getImage/fn:12177401/wi:800/wh:1a186d974',
  119.00,
  94,
  '9786258669992',
  '2026-02-10',
  ARRAY['edebiyat', 'roman', 'tarih'],
  ARRAY['özgürlük', 'direniş', 'afrika', 'kara güneş', 'sömürü'],
  'published',
  true,
  true,
  'Kara Güneş ilk kez doğduğunda, Afrika''nın toprakları titredi. Yüzyılların zincirleri, bu yeni güneşin ışığıyla çatırdamaya başladı...',
  'İlk Bölümden Bir Alıntı',
  'Zincirlerden Güneşe | Beybörü | Kara Güneş Doğuyor',
  'Afrika kıtasında doğan özgürlük hareketi, dünyayı sarsan bir direnişe dönüşür. Zincirlerin kırıldığı, güneşin yeniden doğduğu özgürlük hikayesi.',
  ARRAY['zincirlerden güneşe', 'beybörü', 'özgürlük', 'afrika', 'kara güneş']
);

-- ============================================
-- 14. KARAKTERLER (Gerçek Kitap Verileri)
-- ============================================

-- ERGENEKOD Karakterleri
INSERT INTO characters (book_id, name, slug, role, short_description, full_description, traits, appears_in, order_index) VALUES
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Prof. Aras Soykan', 'prof-aras-soykan', 'protagonist', 'Dil ve Tarih-Coğrafya Fakültesi profesörü, gizemli dosyanın izini süren bilim insanı.', 'Ankara Dil ve Tarih-Coğrafya Fakültesi''nin loş odasında 1970''lerde kaybolan jeolog ekibine ait gizemli dosyayı inceleyen profesör. Proje: Demirdağ''ın sırlarını çözmeye çalışır.', ARRAY['bilge', 'meraklı', 'kararlı'], ARRAY['Ergenekod'], 1),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Selin Karaca', 'selin-karaca', 'protagonist', 'Arkeolog, dosyada babasının izini keşfeder.', 'Arkeolog ve Profesör Aras''ın eski öğrencisi. Gizemli dosyada babasının izine rastlar. Ergenekon Gemisi''nde babasının bilincinin kopyasıyla karşılaşır ve sonunda geminin dijital rehberi olur.', ARRAY['cesur', 'fedakar', 'zeki'], ARRAY['Ergenekod'], 2),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Kerem Aksoy', 'kerem-aksoy', 'supporting', 'Savunma sanayi mühendisi, devlet adına gizli görevle gelir.', 'Savunma sanayi mühendisi ve devlet adına gizli bir görevle araştırmaya katılır. Sonunda Bozkurt Muhafızları''nı oluşturur.', ARRAY['güvenilir', 'teknoloji uzmanı', 'sadık'], ARRAY['Ergenekod'], 3),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Selin''in Babası', 'selin-babasi', 'supporting', '1970''te Ergenekon''a giren jeolog, geminin bekçisi olur.', '1970''lerde Ergenekon''a giren jeolog ekibinden biri. Aegis tarafından esir alınır ve geminin bekçisi olarak kalır. Bilincinin kopyası kızı Selin ile buluşur.', ARRAY['fedakar', 'bilim insanı', 'koruyucu'], ARRAY['Ergenekod'], 4),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Aegis', 'aegis', 'antagonist', 'Paramiliter örgüt, Ergenekon''un sırlarını ele geçirmeye çalışır.', 'Proje: Demirdağ''ın sırlarını ele geçirmeye çalışan gizli paramiliter örgüt. Gölge Filosu ile Ergenekon Gemisi''ne saldırır.', ARRAY['tehlikeli', 'gizemli', 'güçlü'], ARRAY['Ergenekod'], 5),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Umay', 'umay', 'supporting', 'Direnişçi, Bozkurt Muhafızları''nın kurucularından.', 'Kerem ile birlikte Bozkurt Muhafızları''nı oluşturan direnişçi. Geminin korunmasında önemli rol oynar.', ARRAY['savaşçı', 'sadık', 'cesur'], ARRAY['Ergenekod'], 6);

-- KUDÜS Karakterleri
INSERT INTO characters (book_id, name, slug, role, short_description, full_description, traits, appears_in, order_index) VALUES
((SELECT id FROM books WHERE slug = 'kudus'), 'Yusuf', 'yusuf', 'protagonist', 'Yıkılmış evinin önünde duran baba, oğlu Hasan ile hayatı yeniden kurmaya çalışır.', 'Savaş sonrası yıkılmış evinin önünde duran baba. Küçük oğlu Hasan ile birlikte hayatlarını yeniden kurmaya çalışır.', ARRAY['sabırlı', 'baba', 'umutlu'], ARRAY['Kudüs'], 1),
((SELECT id FROM books WHERE slug = 'kudus'), 'Hasan', 'hasan', 'supporting', 'Yusuf''un küçük oğlu, savaşın ortasında büyüyen çocuk.', 'Yusuf''un küçük oğlu. Savaşın ortasında büyüyen, yıkılmış mahallede hayata tutunmaya çalışan çocuk.', ARRAY['masum', 'umutlu', 'dayanıklı'], ARRAY['Kudüs'], 2),
((SELECT id FROM books WHERE slug = 'kudus'), 'Zeynep Ana', 'zeynep-ana', 'supporting', 'Mahallenin moral kaynağı, sabır ve dayanışmayı hatırlatan bilge kadın.', 'Mahallede yaşayan bilge kadın. İnsanlara sabretmeleri ve birbirlerine destek olmaları gerektiğini hatırlatarak herkes için moral kaynağı olur.', ARRAY['bilge', 'şefkatli', 'lider'], ARRAY['Kudüs'], 3),
((SELECT id FROM books WHERE slug = 'kudus'), 'Meryem', 'meryem', 'supporting', 'Yetim kız, bulduğu ekmeği paylaşarak dayanışmaya örnek olur.', 'Yetim bir kız. Bulduğu ekmeği Fatıma ile paylaşarak insanların birbirine yardım etmesine örnek olur.', ARRAY['cömert', 'dayanıklı', 'iyiliksever'], ARRAY['Kudüs'], 4),
((SELECT id FROM books WHERE slug = 'kudus'), 'Hanzala', 'hanzala', 'supporting', 'Çocukların lideri, taşlardan duvar örerek umudun simgesi olur.', 'Çocukların liderliğini yapan çocuk. Yıkılmış sokakta taşlardan küçük bir duvar örerek yeniden kurulan umudun simgesi haline gelir.', ARRAY['lider', 'yaratıcı', 'umutlu'], ARRAY['Kudüs'], 5),
((SELECT id FROM books WHERE slug = 'kudus'), 'Fatıma', 'fatima', 'minor', 'Meryem''in ekmeği paylaştığı kadın.', 'Meryem''in bulduğu ekmeği paylaştığı kadın. Mahalledeki dayanışmanın bir parçası.', ARRAY['minnettar', 'dayanışmacı'], ARRAY['Kudüs'], 6);

-- ZİNCİRLERDEN GÜNEŞE Karakterleri
INSERT INTO characters (book_id, name, slug, role, short_description, full_description, traits, appears_in, order_index) VALUES
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'A. (Lider)', 'a-lider', 'protagonist', 'Kara Güneş hareketinin lideri, Afrika''nın özgürlük mücadelesinin öncüsü.', 'Kara Güneş hareketinin gizli lideri. Nairobi''deki gizli buluşmaları örgütleyen, kıta genelindeki direnişin mimarı.', ARRAY['lider', 'vizyoner', 'karizmatik'], ARRAY['Zincirlerden Güneşe'], 1),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Mosi', 'mosi', 'supporting', 'Cephede savaşan direnişçi.', 'Kara Güneş hareketinin cephede savaşan aktivistlerinden biri. Fiziksel direnişin öncülerinden.', ARRAY['savaşçı', 'cesur', 'kararlı'], ARRAY['Zincirlerden Güneşe'], 2),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Kerem', 'kerem-afrika', 'supporting', 'Hareket içinde yer alan aktivist.', 'Kara Güneş hareketi içinde önemli rol üstlenen aktivist. Organizasyon ve lojistik işlerde çalışır.', ARRAY['organize', 'sadık', 'çalışkan'], ARRAY['Zincirlerden Güneşe'], 3),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'David Levi', 'david-levi', 'antagonist', 'Hareket içine sızan ajan.', 'Kara Güneş hareketi içine sızan gizli ajan. Gerçek kimliği sonradan ortaya çıkar.', ARRAY['gizemli', 'hilekar', 'ajan'], ARRAY['Zincirlerden Güneşe'], 4);

-- ============================================
-- 15. LOKASYONLAR (Gerçek Kitap Verileri)
-- ============================================

-- ERGENEKOD Lokasyonları
INSERT INTO locations (book_id, name, slug, type, region, short_description, full_description, significance, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Ankara', 'ankara', 'city', 'Türkiye', 'Dil ve Tarih-Coğrafya Fakültesi''nin bulunduğu başkent.', 'Profesör Aras Soykan''ın çalıştığı Dil ve Tarih-Coğrafya Fakültesi''nin bulunduğu şehir. Araştırmanın başladığı yer.', 'Araştırmanın başladığı yer', ARRAY['Ergenekod'], 1),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Orhun Vadisi', 'orhun-vadisi', 'region', 'Moğolistan', 'TİKA kisvesiyle gidilen, yeraltındaki gizemli bölge.', 'Moğolistan''da Altay Dağları''nda bulunan tarihi vadi. TİKA kisvesiyle yapılan kazılarda yeraltındaki devasa metal kütlesi keşfedilir.', 'Ergenekon Gemisi''nin keşfedildiği yer', ARRAY['Ergenekod'], 2),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Ergenekon Gemisi', 'ergenekon-gemisi', 'mystery', 'Moğolistan (Yeraltı)', 'Göktürk tamgalarıyla korunan devasa yeraltı labirenti ve gemi.', 'Binlerce yıllık mekanik bir yapı. Göktürk tamgalarıyla işlenmiş tuzaklarla dolu. Kristal tüplerle dolu arşiv salonları ve Altun Yaruk yaşam kaynağı bulunur.', 'Hikayenin ana mekanı, kadim bilginin merkezi', ARRAY['Ergenekod'], 3),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Altun Yaruk', 'altun-yaruk', 'mystery', 'Ergenekon Gemisi', 'Yaşam kaynağı, bilincin kopyalanabildiği mistik yer.', 'Ergenekon Gemisi''nin içinde bulunan yaşam kaynağı. Burada bilincin kopyalanması ve aktarılması mümkündür.', 'Selin''in babasının bilincinin kurtarıldığı yer', ARRAY['Ergenekod'], 4);

-- KUDÜS Lokasyonları
INSERT INTO locations (book_id, name, slug, type, region, short_description, full_description, significance, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'kudus'), 'Kudüs Eski Şehir', 'kudus-eski-sehir', 'city', 'Filistin', 'Savaş sonrası yıkılmış mahallelerin bulunduğu kutsal şehir.', 'Savaşın ağır izlerini taşıyan, bombardımanlardan sonra evlerin yıkıldığı, sokakların sessizliğe büründüğü kutsal şehir.', 'Hikayenin ana mekanı', ARRAY['Kudüs'], 1),
((SELECT id FROM books WHERE slug = 'kudus'), 'Yıkılmış Mahalle', 'yikilmis-mahalle', 'landmark', 'Kudüs', 'Yusuf ve komşularının yaşadığı yıkık bölge.', 'Yusuf, Hasan, Zeynep Ana ve diğer komşuların yaşadığı, savaşta büyük hasar görmüş mahalle.', 'Dayanışma ve umut hikayesinin geçtiği yer', ARRAY['Kudüs'], 2);

-- ZİNCİRLERDEN GÜNEŞE Lokasyonları
INSERT INTO locations (book_id, name, slug, type, region, short_description, full_description, significance, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Nairobi', 'nairobi', 'city', 'Kenya', 'Gizli buluşmaların yapıldığı başkent.', 'Kenya''nın başkenti. Kara Güneş hareketinin gizli buluşmalarının yapıldığı, yeraltı meclislerinin kurulduğu şehir.', 'Hareketin örgütlendiği merkez', ARRAY['Zincirlerden Güneşe'], 1),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Nijerya Petrol Sahaları', 'nijerya-petrol-sahalari', 'region', 'Nijerya', 'İşçilerin sömürüldüğü petrol bölgeleri.', 'Nijerya''daki petrol sahaları. İşçilerin ağır koşullarda çalıştırıldığı, sömürünün yoğun olduğu bölge.', 'Direnişin başladığı yerlerden biri', ARRAY['Zincirlerden Güneşe'], 2),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Kongo Yerleşimleri', 'kongo-yerlesimleri', 'region', 'Kongo', 'Köylülerin yaşadığı, direnişe katılan bölge.', 'Kongo''daki küçük yerleşimler. Köylülerin Kara Güneş hareketine katıldığı bölge.', 'Kırsal direnişin merkezi', ARRAY['Zincirlerden Güneşe'], 3),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Güney Afrika Madenleri', 'guney-afrika-madenleri', 'landmark', 'Güney Afrika', 'Yeraltındaki maden ocakları.', 'Güney Afrika''daki madenler. İşçilerin yeraltında örgütlendiği, gizli toplantıların yapıldığı yer.', 'Yeraltı direnişinin başladığı yer', ARRAY['Zincirlerden Güneşe'], 4);

-- ============================================
-- 16. KAVRAMLAR (Gerçek Kitap Verileri)
-- ============================================

-- ERGENEKOD Kavramları
INSERT INTO concepts (book_id, name, slug, category, short_description, full_description, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Proje: Demirdağ', 'proje-demirdag', 'mystery', '1970''lerde mühürlenmiş gizemli proje kodu.', '1970''lerde Moğolistan''da kaybolan jeolog ekibine ait gizemli dosyanın kodu. Ergenekon''un sırlarını barındırır.', ARRAY['Ergenekod'], 1),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Ergenekon Gemisi', 'ergenekon-gemisi-kavram', 'artifact', 'Göktürk tamgalarıyla korunan devasa kadim gemi.', 'Binlerce yıllık mekanik bir yapı. Göktürk tamgalarıyla işlenmiş tuzaklarla dolu, kristal tüplerle dolu arşiv salonları ve Altun Yaruk yaşam kaynağı içerir.', ARRAY['Ergenekod'], 2),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Göktürk Tamgaları', 'gokturk-tamgaları', 'mystery', 'Kadim Türk yazısı ve sembolleri.', 'Göktürklerin kullandığı runik yazı sistemi ve semboller. Ergenekon Gemisi''nin tuzaklarını ve sırlarını korur.', ARRAY['Ergenekod'], 3),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Altun Yaruk', 'altun-yaruk-kavram', 'mystery', 'Yaşam kaynağı, bilincin kopyalanabildiği mistik yer.', 'Ergenekon Gemisi''nin içinde bulunan yaşam kaynağı. Bilincin kopyalanması ve aktarılması mümkündür.', ARRAY['Ergenekod'], 4),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Aegis', 'aegis-kavram', 'organization', 'Ergenekon''un sırlarını ele geçirmeye çalışan paramiliter örgüt.', 'Proje: Demirdağ''ın sırlarını ele geçirmeye çalışan gizli paramiliter örgüt. Gölge Filosu ile saldırılar düzenler.', ARRAY['Ergenekod'], 5),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Bozkurt Muhafızları', 'bozkurt-muhafizlari', 'organization', 'Ergenekon Gemisi''ni koruyan özel birim.', 'Kerem ve Umay tarafından kurulan, Ergenekon Gemisi''ni ve kadim bilgiyi koruyan özel muhafız birliği.', ARRAY['Ergenekod'], 6);

-- KUDÜS Kavramları
INSERT INTO concepts (book_id, name, slug, category, short_description, full_description, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'kudus'), 'Dayanışma', 'dayanisma', 'culture', 'Savaşın ortasında birbirine yardım etme.', 'Savaşın yarattığı yoksulluk ve acıya rağmen mahallede devam eden yardımlaşma ve birlikte hareket etme kültürü.', ARRAY['Kudüs'], 1),
((SELECT id FROM books WHERE slug = 'kudus'), 'Sabır', 'sabir', 'culture', 'Zorluklara karşı direnç ve tahammül.', 'Zeynep Ana''nın insanlara hatırlattığı, savaşın ortasında ayakta kalmanın anahtarı olan sabır ve tahammül gücü.', ARRAY['Kudüs'], 2),
((SELECT id FROM books WHERE slug = 'kudus'), 'Umut', 'umut', 'culture', 'Yıkımdan sonra yeniden inşa etme arzusu.', 'Hanzala''nın taş duvarıyla ve Yusuf''un oğlu Hasan''la temsil edilen, savaşın ortasında bile tükenmeyen yaşama bağlılık.', ARRAY['Kudüs'], 3);

-- ZİNCİRLERDEN GÜNEŞE Kavramları
INSERT INTO concepts (book_id, name, slug, category, short_description, full_description, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Kara Güneş', 'kara-gunes', 'mystery', 'Özgürlük direnişinin sembolü.', 'Afrika''da doğan özgürlük hareketinin adı ve sembolü. Yüzyılların sömürüsüne karşı kalkan halkın direnişinin simgesi.', ARRAY['Zincirlerden Güneşe'], 1),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Yeraltı Meclisleri', 'yeralti-meclisleri', 'organization', 'Gizli toplantı noktalarında örgütlenme.', 'Nairobi ve diğer şehirlerdeki gizli buluşma noktalarında yapılan, hareketin örgütlendiği toplantılar.', ARRAY['Zincirlerden Güneşe'], 2),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Duruş Günü', 'durus-gunu', 'mystery', 'Afrika''nın bir günlüğüne durduğu eylem günü.', 'Afrika''nın şehirleri, madenleri ve fabrikalarının bir günlüğüne tamamen durduğu gün. Batı ekonomisini sarsan ve direnişi küreselleştiren dönüm noktası.', ARRAY['Zincirlerden Güneşe'], 3),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Gizli Mesajlar', 'gizli-mesajlar', 'technology', 'İşçilerin iletişim kurduğu şifreli sistem.', 'İşçiler, öğrenciler ve köylülerin gizli mesajlar, şarkılar ve semboller aracılığıyla birbirleriyle iletişim kurduğu sistem.', ARRAY['Zincirlerden Güneşe'], 4);

-- ============================================
-- 17. ZAMAN ÇİZELGESİ (Gerçek Kitap Verileri)
-- ============================================

-- ERGENEKOD Zaman Çizelgesi
INSERT INTO timeline_events (book_id, year, title, description, era, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'ergenekod'), 'MÖ 209', 'Ergenekon''dan Kurtuluş', 'Türkler demir dağlar arasından kurtularak özgürlüğüne kavuşur.', 'ancient', ARRAY['Ergenekod'], 1),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'MS 552', 'Göktürk İmparatorluğu', 'Bumin Kağan liderliğinde Göktürk Kağanlığı kurulur.', 'medieval', ARRAY['Ergenekod'], 2),
((SELECT id FROM books WHERE slug = 'ergenekod'), '1970', 'Proje: Demirdağ', 'Moğolistan''da jeolog ekibi kaybolur, dosya mühürlenir.', 'modern', ARRAY['Ergenekod'], 3),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Günümüz', 'Dosyanın Keşfi', 'Prof. Aras Soykan gizemli dosyayı inceler.', 'future', ARRAY['Ergenekod'], 4),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Yirmi Yıl Sonra', 'Selin''in Dönüşümü', 'Selin Karaca geminin dijital rehberi olur.', 'future', ARRAY['Ergenekod'], 5);

-- KUDÜS Zaman Çizelgesi
INSERT INTO timeline_events (book_id, year, title, description, era, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'kudus'), '1948', 'Kudüs''ün İşgali', 'Kudüs ve Filistin toprakları işgal edilir.', 'modern', ARRAY['Kudüs'], 1),
((SELECT id FROM books WHERE slug = 'kudus'), 'Günümüz', 'Savaş ve Yıkım', 'Bombardımanlar sonrası evler yıkılır.', 'future', ARRAY['Kudüs'], 2),
((SELECT id FROM books WHERE slug = 'kudus'), 'Günümüz', 'Dayanışma', 'Yusuf, Zeynep Ana ve komşular birbirlerine destek olur.', 'future', ARRAY['Kudüs'], 3);

-- ZİNCİRLERDEN GÜNEŞE Zaman Çizelgesi
INSERT INTO timeline_events (book_id, year, title, description, era, related_books, order_index) VALUES
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), '1600-1900', 'Sömürü Dönemi', 'Afrika halkları yüzyıllar boyunca sömürülür.', 'medieval', ARRAY['Zincirlerden Güneşe'], 1),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), '1960', 'Kara Güneş''in Doğuşu', 'Nairobi''de gizli buluşmalar başlar.', 'modern', ARRAY['Zincirlerden Güneşe'], 2),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Günümüz', 'Kıta Genelinde Yayılım', 'Hareket Nijerya, Kenya, Kongo ve Güney Afrika''ya yayılır.', 'future', ARRAY['Zincirlerden Güneşe'], 3),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Günümüz', 'Duruş Günü', 'Afrika bir günlüğüne durur, dünya sarsılır.', 'future', ARRAY['Zincirlerden Güneşe'], 4);

-- ============================================
-- 18. YORUMLAR (Örnek Veriler)
-- ============================================
INSERT INTO reviews (book_id, reviewer_name, rating, comment, is_approved, is_featured) VALUES
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Ahmet Y.', 5, 'Muhteşem bir hikaye! Türk mitolojisini bu kadar güçlü işleyen başka bir roman okumadım.', true, true),
((SELECT id FROM books WHERE slug = 'ergenekod'), 'Zeynep K.', 5, 'Karakterler çok iyi işlenmiş, okurken kendimi olayların içinde hissettim.', true, true),
((SELECT id FROM books WHERE slug = 'kudus'), 'Mehmet S.', 5, 'Gözyaşları içinde okudum. Çok etkileyici bir hikaye.', true, true),
((SELECT id FROM books WHERE slug = 'zincirlerden-gunese'), 'Ayşe D.', 4, 'Afrika''yı bu gözle ilk kez görüyorum. Çok güçlü bir anlatım.', true, true);

-- ============================================
-- KURULUM TAMAMLANDI
-- ============================================
SELECT 'Tam Database Şeması başarıyla oluşturuldu!' as status;
