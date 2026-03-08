# Beybörü Yazar Evi

Kişisel kitap tanıtım ve yazar portfolyo platformu. KDY (Kitap Yurdu Doğrudan Yayıncılık) entegrasyonlu, admin kontrollü, çok temalı web uygulaması.

![Beybörü Logo](public/logo-preview.png)

## Özellikler

- 🐺 **Bozkurt Logo** - Göktürkçe "TÜRK" yazılı özel tasarım
- 🎨 **4 Farklı Tema** - Koyu, Açık, Altın, Gece Mavisi
- 📚 **Kitap Yönetimi** - Ekleme, düzenleme, silme
- 🌍 **Çeviri Aracı** - Türkçe ↔ Osmanlıca ↔ Göktürkçe (sayı çevirisi dahil)
- 👥 **Türk Kahramanları** - 18 tarihi şahsiyet
- ⚙️ **Admin Panel** - Site ayarları, logo yükleme, tema değiştirme
- 🖼️ **Görsel Yükleme** - Supabase Storage entegrasyonu
- 📱 **Responsive** - Mobil uyumlu tasarım
- 🔍 **SEO** - Meta başlıklar ve açıklamalar

## Teknolojiler

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL + Auth + Storage)
- Zustand (State Management)

## Kurulum

### 1. Projeyi Klonla

```bash
git clone https://github.com/kullaniciadi/beyboru-yazar-evi.git
cd beyboru-yazar-evi
```

### 2. Bağımlılıkları Yükle

```bash
npm install
```

### 3. Çevre Değişkenlerini Ayarla

`.env` dosyası oluştur:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Site URL
VITE_SITE_URL=http://localhost:5173
```

### 4. Supabase Yapılandırması

#### 4.1 Veritabanı Tablolarını Oluştur

1. [Supabase](https://supabase.com) hesabı oluştur
2. Yeni proje oluştur
3. SQL Editor'ü aç
4. `supabase_schema.sql` dosyasını çalıştır

#### 4.2 Storage Bucket Yapılandırması (ÖNEMLİ!)

Logo yükleme için Storage bucket'ını manuel olarak oluşturmanız gerekir:

1. **Supabase Dashboard** → **Storage** → **New Bucket**
2. **Bucket Name:** `images`
3. **Public bucket:** ✅ İşaretli olsun
4. **Create bucket** butonuna tıklayın

**Storage Policies Ekleme:**

Bucket oluşturduktan sonra policies ekleyin:

1. `images` bucket'ına tıklayın
2. **Policies** sekmesine geçin
3. **New Policy** → **For Select (Get)** → **Allow read access**
4. **New Policy** → **For Insert (Create)** → **Allow insert access**
5. **New Policy** → **For Update** → **Allow update access**
6. **New Policy** → **For Delete** → **Allow delete access**

**Hâlâ hata alırsanız:** Logo base64 olarak veritabanına kaydedilecektir (fallback mekanizması).

### 5. Admin Hesabı Oluştur

Supabase Dashboard > Authentication > Users > New User

**Önerilen hesap:**
- Email: `admin@beyboru.com`
- Şifre: `Beyboru2024!`

### 6. Geliştirme Sunucusu

```bash
npm run dev
```

### 7. Build

```bash
npm run build
```

## Admin Panel

Admin paneline `/admin/login` adresinden erişebilirsiniz.

### Admin Menüsü

- **Dashboard** - İstatistikler ve genel bakış
- **Kitaplar** - Kitap ekleme/düzenleme/silme
- **Logo** - Site logosu yükleme
- **Site Ayarları** - Başlık, açıklama, iletişim bilgileri
- **Tema** - Tema değiştirme

## Sayfalar

| Sayfa | URL | Açıklama |
|-------|-----|----------|
| Ana Sayfa | `/` | Hero section ve kitaplar |
| Kitaplar | `/kitaplar` | Tüm kitaplar listesi |
| Kitap Detay | `/kitap/:slug` | Kitap detay sayfası |
| Türk Kahramanları | `/kahramanlar` | 18 tarihi şahsiyet |
| Çeviri Aracı | `/ceviri` | Dil çeviri aracı |
| Hakkımda | `/hakkimda` | Yazar hakkında |
| İletişim | `/iletisim` | İletişim formu |
| Admin Login | `/admin/login` | Admin girişi |

## Çeviri Fonksiyonu

Türkçe, Osmanlıca ve Göktürkçe arasında çeviri yapabilirsiniz:

- Harf çevirisi
- Sayı çevirisi (örn: 123 → ١٢٣)
- Sesli okuma desteği
- Geçmiş kaydı

## Türk Kahramanları

18 tarihi şahsiyet:

### Savaşçılar
- Mete Han
- Atilla
- Alparslan
- Fatih Sultan Mehmet
- Yavuz Sultan Selim
- Kanuni Sultan Süleyman

### Devlet Adamları
- Bilge Kağan
- Orhan Gazi
- Murat Hüdavendigar

### Bilim İnsanları
- Piri Reis
- Mimar Sinan
- Ali Kuşçu

### Kültür ve Sanat
- Kaşgarlı Mahmut
- Yunus Emre
- Hacı Bektaş-ı Veli
- Evliya Çelebi

### Keşif ve Macera
- Ertuğrul Gazi
- Barbaros Hayreddin Paşa

## Dosya Yapısı

```
src/
├── admin/              # Admin panel bileşenleri
│   ├── Login.tsx
│   ├── AdminLayout.tsx
│   ├── Dashboard.tsx
│   ├── BooksList.tsx
│   ├── BookForm.tsx
│   ├── LogoSettings.tsx
│   ├── Settings.tsx
│   └── ThemeSettings.tsx
├── site/               # Site önyüz bileşenleri
│   ├── Navbar.tsx
│   ├── WolfLogo.tsx
│   ├── HeroSection.tsx
│   ├── BookCard.tsx
│   ├── BooksSection.tsx
│   ├── BookDetail.tsx
│   ├── Heroes.tsx
│   ├── Translator.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── components/         # shadcn/ui bileşenleri
├── lib/                # Yardımcı fonksiyonlar
│   ├── supabase.ts
│   ├── translator.ts
│   └── kdy.ts
├── store/              # Zustand store
├── types/              # TypeScript tipleri
└── App.tsx             # Ana uygulama
```

## SEO Optimizasyonu

### Google Search Console Kurulumu

1. [Google Search Console](https://search.google.com/search-console) açın
2. "Add Property" → `beyborudestanlari.com.tr` ekleyin
3. Doğrulama yöntemi: **DNS** veya **HTML tag**
4. Sitemap URL: `https://beyborudestanlari.com.tr/sitemap.xml`

### Otomatik SEO Özellikleri

- ✅ **Sitemap.xml** - Tüm sayfalar otomatik indeksleniyor
- ✅ **robots.txt** - Arama motorlarına yönlendirme
- ✅ **Meta etiketleri** - Dinamik başlık ve açıklamalar
- ✅ **Open Graph** - Sosyal medya paylaşımları
- ✅ **Schema.org** - Kitaplar için yapısal veri
- ✅ **Canonical URL** - Yinelenen içerik önleme

### SEO Bileşeni Kullanımı

```tsx
import SEO from '@/components/SEO';

// Sayfada kullanım
<SEO
  title="Sayfa Başlığı"
  description="Sayfa açıklaması"
  keywords="anahtar, kelimeler"
  image="https://site.com/gorsel.jpg"
  url="https://site.com/sayfa"
  type="website" // veya "book", "article"
/>
```

### Kitap Sayfası SEO (Schema.org)

```tsx
<SEO
  title="Ergenekod | Beybörü"
  description="Kitap açıklaması"
  type="book"
  bookData={{
    name: "Ergenekod",
    isbn: "9786258662054",
    price: 119.00,
    pageCount: 84,
    publishDate: "2026-02-10",
    image: "https://..."
  }}
/>
```

## Email (İletişim Formu) Kurulumu

Ziyaretçilerin size email gönderebilmesi için **@emailjs/browser** kullanıyoruz:

### 1. EmailJS Hesabı Oluştur
1. [emailjs.com](https://www.emailjs.com/) adresine git
2. Ücretsiz hesap oluştur

### 2. Email Service Ekle
1. **Email Services** → **Add New Service**
2. **Gmail** seç
3. Gmail hesabını bağla (`gokboru43official@gmail.com`)
4. Service ID'yi not al (örn: `service_beyboru`)

### 3. Email Template Oluştur
1. **Email Templates** → **Create New Template**
2. Template adı: `template_contact`
3. Template içeriği:

```html
Yeni Mesaj!

Gönderen: {{from_name}}
Email: {{from_email}}
Konu: {{subject}}

Mesaj:
{{message}}
```

### 4. Public Key Al
1. **Account** → **General**
2. Public Key'i not al

### 5. Contact.tsx Güncelle
`src/site/Contact.tsx` dosyasını aç ve şu satırları güncelle:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_beyboru', // Senin Service ID'n
  TEMPLATE_ID: 'template_contact', // Senin Template ID'n
  PUBLIC_KEY: 'XXXXXXXXXXXXXXX', // Senin Public Key'in
};
```

### 6. Test Et
İletişim formunu doldur ve gönder. Email'in geldiğini kontrol et.

## Katkıda Bulunma

1. Fork yap
2. Feature branch oluştur (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit et (`git commit -m 'feat: Add amazing feature'`)
4. Branch'e push et (`git push origin feature/amazing-feature`)
5. Pull Request aç

## Lisans

MIT License - [LICENSE](LICENSE) dosyasına bakın.

## İletişim

- Website: [beyboru.com](https://beyboru.com)
- Email: iletisim@beyboru.com

---

**Not:** Bu proje [Kimi](https://kimi.moonshot.cn) yapay zeka asistanı ile geliştirilmiştir.
