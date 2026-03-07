import { useEffect, useState } from 'react';
import { Mail, Phone, Send, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useSettingsStore } from '@/store';

export default function Contact() {
  const { settings } = useSettingsStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSending(false);
    setSent(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSent(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'E-posta',
      value: settings?.contact_email || 'gokboru43official@gmail.com',
      href: `mailto:${settings?.contact_email || 'gokboru43official@gmail.com'}`,
    },
    ...(settings?.contact_phone ? [{
      icon: Phone,
      label: 'Telefon',
      value: settings.contact_phone,
      href: `tel:${settings.contact_phone}`,
    }] : []),
  ];

  const socialLinks = [
    ...(settings?.social_twitter ? [{
      icon: Twitter,
      label: 'Twitter',
      href: settings.social_twitter,
    }] : []),
    ...(settings?.social_instagram ? [{
      icon: Instagram,
      label: 'Instagram',
      href: settings.social_instagram,
    }] : []),
    ...(settings?.social_youtube ? [{
      icon: Youtube,
      label: 'YouTube',
      href: settings.social_youtube,
    }] : []),
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      {/* Hero */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid var(--beyboru-gold)',
            }}
          >
            <Mail className="w-4 h-4" style={{ color: 'var(--beyboru-gold)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--beyboru-gold)' }}>
              İletişim
            </span>
          </div>
          
          <h1 
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--beyboru-text)' }}
          >
            Benimle İletişime Geçin
          </h1>
          
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--beyboru-text-muted)' }}
          >
            Sorularınız, önerileriniz veya işbirliği talepleriniz için bana ulaşabilirsiniz.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-8">
                  <h2 
                    className="font-playfair text-2xl font-semibold mb-6"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    Mesaj Gönder
                  </h2>

                  {sent ? (
                    <div 
                      className="p-6 rounded-xl text-center"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}
                    >
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                      >
                        <Send className="w-8 h-8" style={{ color: '#22c55e' }} />
                      </div>
                      <h3 className="font-playfair text-xl mb-2" style={{ color: '#22c55e' }}>
                        Mesajınız Gönderildi!
                      </h3>
                      <p style={{ color: 'var(--beyboru-text-muted)' }}>
                        En kısa sürede size dönüş yapacağım.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label style={{ color: 'var(--beyboru-text)' }}>Adınız</Label>
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ahmet Yılmaz"
                            required
                            className="beyboru-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label style={{ color: 'var(--beyboru-text)' }}>E-posta</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="ahmet@example.com"
                            required
                            className="beyboru-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label style={{ color: 'var(--beyboru-text)' }}>Konu</Label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Mesajınızın konusu..."
                          required
                          className="beyboru-input"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label style={{ color: 'var(--beyboru-text)' }}>Mesajınız</Label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Mesajınızı buraya yazın..."
                          required
                          rows={6}
                          className="beyboru-input resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={sending}
                        className="w-full beyboru-button"
                      >
                        {sending ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Gönderiliyor...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Mesaj Gönder
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-6">
                  <h3 
                    className="font-playfair text-lg font-semibold mb-4"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    İletişim Bilgileri
                  </h3>
                  
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={index}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-white/5"
                          style={{ backgroundColor: 'var(--beyboru-bg)' }}
                        >
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'var(--beyboru-accent)' }}
                          >
                            <Icon className="w-5 h-5" style={{ color: 'var(--beyboru-text)' }} />
                          </div>
                          <div>
                            <p className="text-xs" style={{ color: 'var(--beyboru-text-muted)' }}>
                              {item.label}
                            </p>
                            <p className="text-sm font-medium" style={{ color: 'var(--beyboru-text)' }}>
                              {item.value}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                  <CardContent className="p-6">
                    <h3 
                      className="font-playfair text-lg font-semibold mb-4"
                      style={{ color: 'var(--beyboru-text)' }}
                    >
                      Sosyal Medya
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'var(--beyboru-bg)' }}
                            title={item.label}
                          >
                            <Icon className="w-5 h-5" style={{ color: 'var(--beyboru-gold)' }} />
                          </a>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
