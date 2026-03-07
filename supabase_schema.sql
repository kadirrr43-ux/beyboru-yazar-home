-- Beyboru Yazar Evi - Supabase Schema

-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables

-- 1. Books Table
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
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
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT '1',
  site_title TEXT DEFAULT 'Beybörü Yazar Evi',
  site_description TEXT DEFAULT 'Türk edebiyatının yeni sesi',
  hero_title TEXT DEFAULT 'Beybörü Yazar Evi',
  hero_subtitle TEXT DEFAULT 'Kelimelerin izinde, hikayelerin peşinde...',
  about_title TEXT DEFAULT 'Hakkımda',
  about_content TEXT DEFAULT 'Beybörü, Türk edebiyatına yeni bir soluk getiren bir yazar.',
  contact_email TEXT DEFAULT 'iletisim@beyboru.com',
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
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Storage Bucket for Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for storage
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated Uploads" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated Updates" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'images');

CREATE POLICY "Authenticated Deletes" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'images');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_books_slug ON books(slug);
CREATE INDEX IF NOT EXISTS idx_books_featured ON books(is_featured) WHERE is_featured = true;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_book_view(book_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE books 
  SET view_count = view_count + 1 
  WHERE slug = book_slug;
END;
$$ LANGUAGE plpgsql;

-- Insert default settings
INSERT INTO settings (id) VALUES ('1')
ON CONFLICT (id) DO NOTHING;

-- Insert sample books
INSERT INTO books (
  slug, title, subtitle, description, full_description, 
  cover_image, price, page_count, isbn, publish_date,
  category, tags, status, is_featured, is_new,
  seo_title, seo_description, seo_keywords
) VALUES 
(
  'ergenekod',
  'Ergenekod',
  '',
  'ERGENEKOD, Ergenekon Destanı''nı bildiğinizi sandığınız her şeyden yeniden yazıyor.',
  'ERGENEKOD, Ergenekon Destanı''nı bildiğinizi sandığınız her şeyden yeniden yazıyor.

Akademik bir keşif gibi başlayan yolculuk; kadim teknolojiler, gizli devlet dosyaları ve bin yıldır uykuda bekleyen bir mirasla karanlık bir gerilime dönüşüyor. Göktürk tamgaları, mekanik labirentler ve "Bozkurt" efsanesinin ardındaki gerçek, modern dünyanın tam ortasında yeniden canlanıyor.

Bu roman;
– Tarih ve bilimi,
– Mitoloji ve teknolojiyi,
– İnanç ve güç savaşını
aynı potada eritiyor.

ERGENEKOD, sadece bir macera romanı değil;
"Bilgi kime aittir?" sorusunu okurun vicdanına bırakan güçlü bir anlatı.

Eğer kadim sırların modern dünyayı tehdit ettiği hikâyeleri seviyorsan,
bu kitap seni içine çekecek…
ve kolay kolay bırakmayacak.',
  'https://img.kitapyurdu.com/v1/getImage/fn:12177399/wi:800/wh:25a239bd7',
  119.00,
  84,
  '9786258662054',
  '2026-02-10',
  ARRAY['tarih', 'macera', 'bilim-kurgu'],
  ARRAY['ergenekon', 'türk mitolojisi', 'bozkurt'],
  'published',
  true,
  true,
  'Ergenekod | Beybörü | Türk Mitolojisi Romanı',
  'Ergenekon Destanı''nı yeniden yazan, tarih ve teknolojiyi birleştiren gerilim romanı.',
  ARRAY['ergenekod', 'beybörü', 'türk mitolojisi']
),
(
  'kudus',
  'Kudüs',
  'Küllerden Doğan Umut',
  'Bu kitap, bir şehrin yıkıntıları arasından yükselen sessiz ama sarsıcı bir direnişin hikâyesidir.',
  'Bu kitap, bir şehrin yıkıntıları arasından yükselen sessiz ama sarsıcı bir direnişin hikâyesidir. 

Kudüs''ün taşlarında biriken acıyı, kayıpların ortasında filizlenen umudu ve insan kalbinin vazgeçmeyen tarafını anlatır. 

Bombaların gölgesinde büyüyen çocuklar, bir lokma ekmeği paylaşan eller, harfleri öğrenirken hayata tutunan küçük yürekler… Her bölümde, savaşın sert yüzüyle birlikte sabrın, merhametin ve imanın direnci yan yana durur. 

Bu satırlar, yalnızca Kudüs''ün değil, insanlığın ortak vicdanına seslenir. Küllerden Doğan Umut, yıkımın ortasında bile umudun nasıl yeşerdiğini, en karanlık gecelerde bile bir ışığın nasıl var olabildiğini hatırlatır. 

Bu kitap; suskun çığlıkları duymak, sabrı anlamak ve umudu yeniden düşünmek isteyen herkes için kaleme alındı. 

Çünkü bazen bir şehir yıkılır, ama umut asla.',
  'https://img.kitapyurdu.com/v1/getImage/fn:12177398/wi:800/wh:d760b5716',
  159.00,
  148,
  '9786258662122',
  '2026-02-10',
  ARRAY['edebiyat', 'roman'],
  ARRAY['kudüs', 'umut', 'direniş'],
  'published',
  true,
  true,
  'Kudüs | Beybörü | Küllerden Doğan Umut',
  'Kudüs''ün yıkıntılarından yükselen umut ve direnişin hikayesi.',
  ARRAY['kudüs', 'beybörü', 'umut']
),
(
  'zincirlerden-gunese',
  'Zincirlerden Güneşe',
  'Kara Güneş Doğuyor',
  'Zincirler kırıldığında, güneş yeniden doğar.',
  'Zincirler kırıldığında, güneş yeniden doğar. 

Yüzyıllar boyunca sömürülen, susturulan ve yok sayılan bir kıta… Ama her karanlığın içinde, mutlaka bir kıvılcım vardır. 

Kara Güneş Doğuyor, Afrika''nın kalbinde filizlenen sessiz bir direnişin, zamanla küresel bir uyanışa dönüşmesini anlatıyor. Farklı halklar, diller ve inançlar; ortak bir kaderde buluşur. 

Zincirlerle kurulan düzen, artık sorgulanmaktadır. Bu roman; yalnızca bir isyan hikâyesi değil, birlik olmanın, bedel ödemenin ve özgürlüğün gerçek anlamını hatırlatan güçlü bir çağrıdır. 

Kara Güneş bir semboldür. Ve bir kez doğdu mu, hiçbir güç onu yeniden karanlığa gömemez.',
  'https://img.kitapyurdu.com/v1/getImage/fn:12177401/wi:800/wh:1a186d974',
  119.00,
  94,
  '9786258669992',
  '2026-02-10',
  ARRAY['edebiyat', 'roman', 'tarih'],
  ARRAY['özgürlük', 'direniş', 'afrika'],
  'published',
  true,
  true,
  'Zincirlerden Güneşe | Beybörü | Kara Güneş Doğuyor',
  'Zincirlerin kırıldığı, güneşin yeniden doğduğu özgürlük hikayesi.',
  ARRAY['zincirlerden güneşe', 'beybörü', 'özgürlük']
)
ON CONFLICT (slug) DO NOTHING;
