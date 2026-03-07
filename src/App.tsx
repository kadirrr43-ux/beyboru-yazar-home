import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useThemeStore, applyTheme } from '@/store';

// Site Components
import Navbar from '@/site/Navbar';
import HeroSection from '@/site/HeroSection';
import BooksSection from '@/site/BooksSection';
import BookDetail from '@/site/BookDetail';
import Heroes from '@/site/Heroes';
import Translator from '@/site/Translator';
import About from '@/site/About';
import Contact from '@/site/Contact';
import Footer from '@/site/Footer';

// Admin Components
import Login from '@/admin/Login';
import AdminLayout from '@/admin/AdminLayout';
import Dashboard from '@/admin/Dashboard';
import BooksList from '@/admin/BooksList';
import BookForm from '@/admin/BookForm';
import Settings from '@/admin/Settings';
import ThemeSettings from '@/admin/ThemeSettings';
import LogoSettings from '@/admin/LogoSettings';

// Pages
function HomePage() {
  return (
    <>
      <HeroSection />
      <BooksSection />
    </>
  );
}

function BooksPage() {
  return (
    <div className="pt-24">
      <BooksSection />
    </div>
  );
}

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--beyboru-surface)',
            color: 'var(--beyboru-text)',
            border: '1px solid var(--beyboru-border)',
          },
        }}
      />
      <Routes>
        {/* Site Routes */}
        <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
        <Route path="/kitaplar" element={<SiteLayout><BooksPage /></SiteLayout>} />
        <Route path="/kitap/:slug" element={<SiteLayout><BookDetail /></SiteLayout>} />
        <Route path="/kahramanlar" element={<SiteLayout><Heroes /></SiteLayout>} />
        <Route path="/ceviri" element={<SiteLayout><Translator /></SiteLayout>} />
        <Route path="/hakkimda" element={<SiteLayout><About /></SiteLayout>} />
        <Route path="/iletisim" element={<SiteLayout><Contact /></SiteLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="kitaplar" element={<BooksList />} />
          <Route path="kitaplar/yeni" element={<BookForm />} />
          <Route path="kitaplar/:id" element={<BookForm />} />
          <Route path="logo" element={<LogoSettings />} />
          <Route path="ayarlar" element={<Settings />} />
          <Route path="tema" element={<ThemeSettings />} />
        </Route>

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
