import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, SiteSettings } from '@/types';

// Theme Type
export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    surface: string;
    surfaceLight: string;
    accent: string;
    accentLight: string;
    gold: string;
    goldLight: string;
    text: string;
    textMuted: string;
    textSubtle: string;
    border: string;
    glow: string;
  };
}

// Theme Constants
export const THEMES: Theme[] = [
  {
    id: 'dark',
    name: 'Karanlık',
    colors: {
      background: '#0a0a0c',
      surface: '#141418',
      surfaceLight: '#1c1c22',
      accent: '#8B3A3A',
      accentLight: '#A85A5A',
      gold: '#D4AF37',
      goldLight: '#E8C96A',
      text: '#f5f5f5',
      textMuted: '#a0a0a0',
      textSubtle: '#6a6a6a',
      border: 'rgba(212, 175, 55, 0.15)',
      glow: 'rgba(212, 175, 55, 0.3)',
    },
  },
  {
    id: 'light',
    name: 'Aydınlık',
    colors: {
      background: '#f8f6f3',
      surface: '#ffffff',
      surfaceLight: '#f0eeeb',
      accent: '#8B3A3A',
      accentLight: '#A85A5A',
      gold: '#B8941F',
      goldLight: '#D4AF37',
      text: '#1a1a1a',
      textMuted: '#5a5a5a',
      textSubtle: '#9a9a9a',
      border: 'rgba(0, 0, 0, 0.1)',
      glow: 'rgba(184, 148, 31, 0.2)',
    },
  },
  {
    id: 'gold',
    name: 'Altın',
    colors: {
      background: '#1a1612',
      surface: '#242019',
      surfaceLight: '#2e2820',
      accent: '#8B6914',
      accentLight: '#A67C1A',
      gold: '#FFD700',
      goldLight: '#FFE55C',
      text: '#FFF8E7',
      textMuted: '#D4C4A8',
      textSubtle: '#8B7D6B',
      border: 'rgba(255, 215, 0, 0.2)',
      glow: 'rgba(255, 215, 0, 0.4)',
    },
  },
  {
    id: 'blue',
    name: 'Mavi',
    colors: {
      background: '#0c1220',
      surface: '#141b2d',
      surfaceLight: '#1e2740',
      accent: '#2E4A7A',
      accentLight: '#4A6FA5',
      gold: '#C9A227',
      goldLight: '#E0B83A',
      text: '#e8eef5',
      textMuted: '#9ab0c9',
      textSubtle: '#5a7090',
      border: 'rgba(201, 162, 39, 0.15)',
      glow: 'rgba(201, 162, 39, 0.3)',
    },
  },
];

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
