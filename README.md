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

1. [Supabase](https://supabase.com) hesabı oluştur
2. Yeni proje oluştur
3. SQL Editor'ü aç
4. `supabase_schema.sql` dosyasını çalıştır
5. Storage > Buckets > `images` bucket'ını public yap

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
