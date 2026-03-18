import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { useThemeStore, applyTheme } from '@/store';
import SEO from '@/components/SEO';

// Site Components - Lazy loaded
import Navbar from '@/site/Navbar';
import HeroSection from '@/site/HeroSection';
import BooksSection from '@/site/BooksSection';
import Footer from '@/site/Footer';

// Site Components - Lazy loaded
const BookDetail = lazy(() => import('@/site/BookDetail'));
const Heroes = lazy(() => import('@/site/Heroes'));
const Translator = lazy(() => import('@/site/Translator'));
const About = lazy(() => import('@/site/About'));
const Contact = lazy(() => import('@/site/Contact'));
const Blog = lazy(() => import('@/site/Blog'));
const Universe = lazy(() => import('@/site/Universe'));
const UniverseCharacters = lazy(() => import('@/site/UniverseCharacters'));
const UniverseConcepts = lazy(() => import('@/site/UniverseConcepts'));
const UniverseLocations = lazy(() => import('@/site/UniverseLocations'));
const UniverseTimeline = lazy(() => import('@/site/UniverseTimeline'));

// Admin Components - Lazy loaded
const Login = lazy(() => import('@/admin/Login'));
const AdminLayout = lazy(() => import('@/admin/AdminLayout'));
const Dashboard = lazy(() => import('@/admin/Dashboard'));
const BooksList = lazy(() => import('@/admin/BooksList'));
const BookForm = lazy(() => import('@/admin/BookForm'));
const Settings = lazy(() => import('@/admin/Settings'));
const ThemeSettings = lazy(() => import('@/admin/ThemeSettings'));
const LogoSettings = lazy(() => import('@/admin/LogoSettings'));
const CharactersManager = lazy(() => import('@/admin/CharactersManager'));
const LocationsManager = lazy(() => import('@/admin/LocationsManager'));
const ConceptsManager = lazy(() => import('@/admin/ConceptsManager'));
const TimelineManager = lazy(() => import('@/admin/TimelineManager'));
const ReviewsManager = lazy(() => import('@/admin/ReviewsManager'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  </div>
);

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
    <HelmetProvider>
    <Router>
      <SEO />
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
      <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Site Routes */}
        <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
        <Route path="/kitaplar" element={<SiteLayout><BooksPage /></SiteLayout>} />
        <Route path="/kitap/:slug" element={<SiteLayout><BookDetail /></SiteLayout>} />
        <Route path="/kahramanlar" element={<SiteLayout><Heroes /></SiteLayout>} />
        <Route path="/ceviri" element={<SiteLayout><Translator /></SiteLayout>} />
        <Route path="/hakkimda" element={<SiteLayout><About /></SiteLayout>} />
        <Route path="/iletisim" element={<SiteLayout><Contact /></SiteLayout>} />
        <Route path="/blog" element={<SiteLayout><Blog /></SiteLayout>} />
        
        {/* Universe Routes */}
        <Route path="/evren" element={<SiteLayout><Universe /></SiteLayout>} />
        <Route path="/evren/karakterler" element={<SiteLayout><UniverseCharacters /></SiteLayout>} />
        <Route path="/evren/kavramlar" element={<SiteLayout><UniverseConcepts /></SiteLayout>} />
        <Route path="/evren/lokasyonlar" element={<SiteLayout><UniverseLocations /></SiteLayout>} />
        <Route path="/evren/zaman-cizelgesi" element={<SiteLayout><UniverseTimeline /></SiteLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="kitaplar" element={<BooksList />} />
          <Route path="kitaplar/yeni" element={<BookForm />} />
          <Route path="kitaplar/:id" element={<BookForm />} />
          <Route path="karakterler" element={<CharactersManager />} />
          <Route path="lokasyonlar" element={<LocationsManager />} />
          <Route path="kavramlar" element={<ConceptsManager />} />
          <Route path="zaman-cizelgesi" element={<TimelineManager />} />
          <Route path="yorumlar" element={<ReviewsManager />} />
          <Route path="logo" element={<LogoSettings />} />
          <Route path="ayarlar" element={<Settings />} />
          <Route path="tema" element={<ThemeSettings />} />
        </Route>

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </Router>
    </HelmetProvider>
  );
}

export default App;
