import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, SiteSettings, Theme } from '@/types';
import { THEMES } from '@/types';

// Auth Store
interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; id: string } | null;
  setAuth: (user: { email: string; id: string } | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (user) => set({ isAuthenticated: !!user, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

// Theme Store
interface ThemeState {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: THEMES[0],
      setTheme: (themeId) => {
        const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
        set({ currentTheme: theme });
        applyTheme(theme);
      },
    }),
    { name: 'beyboru-theme' }
  )
);

// Apply theme to CSS variables
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const c = theme.colors;
  
  root.style.setProperty('--beyboru-bg', c.background);
  root.style.setProperty('--beyboru-surface', c.surface);
  root.style.setProperty('--beyboru-surface-light', c.surfaceLight);
  root.style.setProperty('--beyboru-accent', c.accent);
  root.style.setProperty('--beyboru-accent-light', c.accentLight);
  root.style.setProperty('--beyboru-gold', c.gold);
  root.style.setProperty('--beyboru-gold-light', c.goldLight);
  root.style.setProperty('--beyboru-text', c.text);
  root.style.setProperty('--beyboru-text-muted', c.textMuted);
  root.style.setProperty('--beyboru-text-subtle', c.textSubtle);
  root.style.setProperty('--beyboru-border', c.border);
  root.style.setProperty('--beyboru-glow', c.glow);
}

// Books Store
interface BooksState {
  books: Book[];
  featuredBooks: Book[];
  loading: boolean;
  setBooks: (books: Book[]) => void;
  setFeaturedBooks: (books: Book[]) => void;
  setLoading: (loading: boolean) => void;
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
}

export const useBooksStore = create<BooksState>((set) => ({
  books: [],
  featuredBooks: [],
  loading: false,
  setBooks: (books) => set({ books }),
  setFeaturedBooks: (books) => set({ featuredBooks: books }),
  setLoading: (loading) => set({ loading }),
  addBook: (book) => set((state) => ({ books: [book, ...state.books] })),
  updateBook: (book) =>
    set((state) => ({
      books: state.books.map((b) => (b.id === book.id ? book : b)),
    })),
  deleteBook: (id) =>
    set((state) => ({
      books: state.books.filter((b) => b.id !== id),
    })),
}));

// Settings Store
interface SettingsState {
  settings: SiteSettings | null;
  loading: boolean;
  setSettings: (settings: SiteSettings) => void;
  setLoading: (loading: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  loading: false,
  setSettings: (settings) => set({ settings }),
  setLoading: (loading) => set({ loading }),
}));

// UI Store
interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  setToast: (toast: { message: string; type: 'success' | 'error' | 'info' } | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toast: null,
  setToast: (toast) => set({ toast }),
}));

// Stats Store - Dinamik istatistikler
interface StatsState {
  dailyVisitors: number;
  lastResetDate: string;
  incrementVisitor: () => void;
  resetIfNeeded: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      dailyVisitors: 0,
      lastResetDate: new Date().toDateString(),
      incrementVisitor: () => {
        get().resetIfNeeded();
        set((state) => ({ dailyVisitors: state.dailyVisitors + 1 }));
      },
      resetIfNeeded: () => {
        const today = new Date().toDateString();
        if (get().lastResetDate !== today) {
          set({ dailyVisitors: 1, lastResetDate: today });
        }
      },
    }),
    { name: 'beyboru-stats' }
  )
);
