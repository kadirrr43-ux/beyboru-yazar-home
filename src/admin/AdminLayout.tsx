import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Home,
  Palette,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/kitaplar', label: 'Kitaplar', icon: BookOpen },
  { path: '/admin/logo', label: 'Logo', icon: Image },
  { path: '/admin/ayarlar', label: 'Site Ayarları', icon: Settings },
  { path: '/admin/tema', label: 'Tema', icon: Palette },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
        style={{ 
          backgroundColor: 'var(--beyboru-surface)',
          borderRight: '1px solid var(--beyboru-border)'
        }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: 'var(--beyboru-border)' }}>
          <BookOpen className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--beyboru-gold)' }} />
          {sidebarOpen && (
            <span className="ml-3 font-playfair font-semibold text-lg" style={{ color: 'var(--beyboru-text)' }}>
              Beybörü
            </span>
          )}
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path));
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'font-medium' 
                    : 'hover:bg-white/5'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--beyboru-accent)' : 'transparent',
                  color: isActive ? 'var(--beyboru-text)' : 'var(--beyboru-text-muted)',
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="ml-3 flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: 'var(--beyboru-border)' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/5 mb-2"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3">Siteyi Görüntüle</span>}
          </a>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-red-500/10"
            style={{ color: 'var(--beyboru-accent-light)' }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3">Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header 
          className="h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30"
          style={{ 
            backgroundColor: 'var(--beyboru-bg)',
            borderBottom: '1px solid var(--beyboru-border)'
          }}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-playfair text-lg hidden sm:block" style={{ color: 'var(--beyboru-text)' }}>
              Yönetim Paneli
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:block" style={{ color: 'var(--beyboru-text-muted)' }}>
              Admin
            </span>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--beyboru-accent)' }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--beyboru-text)' }}>
                A
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
