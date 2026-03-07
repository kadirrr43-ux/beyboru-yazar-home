import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setAuth({ email: data.user.email!, id: data.user.id });
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' 
        ? 'E-posta veya şifre hatalı' 
        : 'Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" 
               style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
            <BookOpen className="w-8 h-8" style={{ color: 'var(--beyboru-gold)' }} />
          </div>
          <h1 className="text-3xl font-playfair font-bold mb-2" style={{ color: 'var(--beyboru-text)' }}>
            Beybörü Yazar Evi
          </h1>
          <p style={{ color: 'var(--beyboru-text-muted)' }}>
            Yönetim Paneli
          </p>
        </div>

        <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
          <CardHeader>
            <CardTitle className="font-playfair" style={{ color: 'var(--beyboru-text)' }}>
              Giriş Yap
            </CardTitle>
            <CardDescription style={{ color: 'var(--beyboru-text-muted)' }}>
              Admin hesabınızla giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: 'var(--beyboru-text)' }}>
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@beyboru.com"
                  required
                  className="beyboru-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" style={{ color: 'var(--beyboru-text)' }}>
                  Şifre
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="beyboru-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--beyboru-text-muted)' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg text-sm" 
                     style={{ backgroundColor: 'rgba(139, 58, 58, 0.2)', color: 'var(--beyboru-accent-light)' }}>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full beyboru-button"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Giriş yapılıyor...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Giriş Yap
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-sm hover:underline"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            Siteye Dön →
          </a>
        </div>
      </div>
    </div>
  );
}
