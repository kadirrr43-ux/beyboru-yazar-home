# GitHub'a Push Talimatları

## 1. GitHub Repo Oluştur

1. [GitHub](https://github.com)'a giriş yap
2. Sağ üstte "+" → "New repository"
3. Repository name: `beyboru-yazar-evi` (veya istediğin isim)
4. Public veya Private seç
5. "Create repository" butonuna tıkla

## 2. Yerel Projeyi GitHub'a Bağla

Terminali aç ve proje klasörüne git:

```bash
cd /mnt/okcomputer/output/app
```

Git reposu başlat:

```bash
git init
```

Tüm dosyaları ekle:

```bash
git add .
```

İlk commit:

```bash
git commit -m "Initial commit: Beyboru Yazar Evi"
```

GitHub repo URL'sini ekle (kendi kullanıcı adını yaz):

```bash
git remote add origin https://github.com/KULLANICIADI/beyboru-yazar-evi.git
```

Push et:

```bash
git push -u origin main
```

## 3. Güvenlik Kontrol Listesi

### ✅ .env Dosyası GitHub'a Gitmiyor

`.gitignore` dosyasında şunlar var:
```
.env
.env.local
.env.*.local
```

**Kontrol et:**
```bash
git status
```

`.env` dosyasının "untracked" veya "ignored" olduğundan emin ol.

### ✅ Supabase Anahtarları Güvende

- `VITE_SUPABASE_ANON_KEY` - Public anahtar, güvenli
- `VITE_SUPABASE_URL` - Public URL, güvenli
- **Service Role Key ASLA ekleme!**

### ✅ Admin Şifresi Repo'da Yok

Admin şifresi sadece Supabase'de saklanıyor.

## 4. GitHub Secrets (Opsiyonel - CI/CD için)

GitHub repo > Settings > Secrets and variables > Actions:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key
```

## 5. Deploy Seçenekleri

### Vercel (Önerilen)

1. [Vercel](https://vercel.com)'e giriş yap
2. "Add New Project"
3. GitHub repo'yu seç
4. Framework Preset: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Environment Variables ekle:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
8. Deploy

### Netlify

1. [Netlify](https://netlify.com)'e giriş yap
2. "Add new site" → "Import an existing project"
3. GitHub repo'yu seç
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Environment Variables ekle
6. Deploy

## 6. Sonraki Güncellemeler

Her değişiklikten sonra:

```bash
# Değişiklikleri gör
git status

# Ekle
git add .

# Commit
git commit -m "feat: Yeni özellik eklendi"

# Push
git push
```

## 7. Önemli Notlar

### ❌ Asla GitHub'a Push Etme:
- `.env` dosyası (şifreler, API anahtarları)
- `node_modules` klasörü
- Build çıktıları (`dist`)
- Log dosyaları
- IDE ayarları (`.vscode`, `.idea`)

### ✅ Her Zaman Push Et:
- Kaynak kodlar (`src/`)
- Public dosyalar (`public/`)
- Konfigürasyon dosyaları (`vite.config.ts`, `tsconfig.json`)
- README.md
- .gitignore

## 8. Sorun Giderme

### "fatal: not a git repository"
```bash
git init
```

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/KULLANICIADI/beyboru-yazar-evi.git
```

### ".env dosyası GitHub'a gitti!"
```bash
# .gitignore'ı kontrol et
cat .gitignore

# Git cache'ten kaldır
git rm --cached .env
git commit -m "Remove .env from repo"
git push
```

## 9. Repo Ayarları

GitHub repo > Settings:

- **General**:
  - Description: "Beybörü Yazar Evi - Kitap tanıtım ve yazar portfolyo platformu"
  - Website: Deploy URL'si
  - Topics: `react`, `typescript`, `supabase`, `vite`, `tailwindcss`

- **Branches**:
  - Default branch: `main`
  - Branch protection rules (isteğe bağlı)

## 10. Hazır Kod

Tüm bu adımları tek seferde yapmak için:

```bash
# 1. GitHub repo URL'sini değiştir
GITHUB_USER="kullaniciadi"
REPO_NAME="beyboru-yazar-evi"

# 2. Git init
git init

# 3. Add ve commit
git add .
git commit -m "🎉 Initial commit: Beyboru Yazar Evi"

# 4. Remote ekle
git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

# 5. Push
git push -u origin main

echo "✅ Repo başarıyla push edildi!"
```

---

**Başarılar!** 🚀
