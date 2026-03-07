import { useEffect } from 'react';
import { BookOpen, Pen, Heart, Sparkles } from 'lucide-react';
import { useSettingsStore } from '@/store';

export default function About() {
  const { settings } = useSettingsStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
      {/* Hero */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              backgroundColor: 'rgba(139, 58, 58, 0.2)',
              border: '1px solid var(--beyboru-accent)',
            }}
          >
            <Heart className="w-4 h-4" style={{ color: 'var(--beyboru-accent-light)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--beyboru-accent-light)' }}>
              Hakkımda
            </span>
          </div>
          
          <h1 
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: 'var(--beyboru-text)' }}
          >
            {settings?.about_title || 'Hakkımda'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Main Content */}
          <div 
            className="p-8 rounded-2xl mb-12"
            style={{ 
              backgroundColor: 'var(--beyboru-surface)',
              border: '1px solid var(--beyboru-border)',
            }}
          >
            <div 
              className="prose prose-invert prose-lg max-w-none leading-relaxed"
              style={{ color: 'var(--beyboru-text-muted)' }}
            >
              {settings?.about_content ? (
                <div className="whitespace-pre-line">{settings.about_content}</div>
              ) : (
                <>
                  <p className="mb-6">
                    Beybörü, Türk edebiyatına yeni bir soluk getiren bir yazar. Eserlerinde tarih, 
                    mitoloji ve modern dünyanın kesişim noktalarını keşfediyor.
                  </p>
                  <p className="mb-6">
                    Yazılarında Anadolu'nun kadim hikayelerini, Türk mitolojisinin derinliklerini 
                    ve insan ruhunun evrensel temalarını bir araya getiriyor. Her kitap, 
                    okuyucuyu farklı bir dünyaya, farklı bir zamana götüren bir yolculuk.
                  </p>
                  <p>
                    "Kelimelerin izinde, hikayelerin peşinde..." mottosuyla çıkılan bu yolculukta, 
                    her sayfa yeni bir keşif, her cümle yeni bir anlam sunuyor.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Edebiyat',
                description: 'Türk edebiyatına katkıda bulunmak ve yeni nesil yazarlar yetiştirmek.',
              },
              {
                icon: Pen,
                title: 'Özgün İçerik',
                description: 'Her eser özgün, her hikaye kendine özgü bir dünya kuruyor.',
              },
              {
                icon: Sparkles,
                title: 'İlham',
                description: 'Okuyuculara ilham vermek ve düşünmeye teşvik etmek.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl text-center"
                  style={{ 
                    backgroundColor: 'var(--beyboru-surface)',
                    border: '1px solid var(--beyboru-border)',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'var(--beyboru-accent)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--beyboru-text)' }} />
                  </div>
                  <h3 
                    className="font-playfair text-lg font-semibold mb-2"
                    style={{ color: 'var(--beyboru-text)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
