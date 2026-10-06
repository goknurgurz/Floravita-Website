'use client';

import Link from 'next/link';
import { FiArrowRight, FiStar, FiShield, FiHeart } from 'react-icons/fi';

const stats = [
  { value: '10.000+', label: 'Mutlu Müşteri' },
  { value: '%94', label: 'Müşteri Memnuniyeti' },
  { value: '4.8/5', label: 'Ortalama Puan' },
];

const badges = [
  { icon: FiShield, text: 'Doğal İçerik' },
  { icon: FiStar, text: 'Bilimsel Formül' },
  { icon: FiHeart, text: 'GMP Sertifikalı' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-pattern bg-cream-50 pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Dekoratif arka plan daireler */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-100 rounded-full translate-y-1/2 -translate-x-1/3 opacity-40 blur-3xl" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol: İçerik */}
          <div className="animate-fade-in">
            {/* Üst rozet */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Türkiye&apos;nin Bağırsak Sağlığı Uzmanı
            </div>

            {/* Başlık */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest-dark leading-tight mb-6">
              Bağırsak{' '}
              <span className="text-gradient">Sağlığınız</span>
              <br />
              Her Şeyin Temeli
            </h1>

            {/* Açıklama */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Probiyotik, prebiyotik ve sindirim enzimleriyle formüle edilmiş 
              doğal ürünlerimizle bağırsak floranızı dengeleyin, 
              enerjinizi artırın ve yaşam kalitenizi yükseltin.
            </p>

            {/* Aksiyonlar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/urunler" className="btn-accent text-base px-8 py-4">
                Ürünleri Keşfet
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/blog" className="btn-outline text-base px-8 py-4">
                Daha Fazla Öğren
              </Link>
            </div>

            {/* Rozetler */}
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-soft"
                >
                  <Icon className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            {/* İstatistikler */}
            <div className="flex gap-8">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-forest-dark">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Görsel */}
          <div className="relative hidden lg:block animate-slide-up">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Ana görsel alanı */}
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary-100 to-cream-200 flex items-center justify-center overflow-hidden shadow-hover">
                <div className="text-center p-8">
                  {/* Emoji görsel (gerçek ürün görseli ile değiştirilebilir) */}
                  <div className="text-8xl mb-4 animate-float">🌿</div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {['🦠', '💊', '🌱'].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-soft"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Yüzen kartlar */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-forest-dark">GMP Sertifikalı</p>
                  <p className="text-xs text-gray-400">Kalite Garantili</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-forest-dark">4.8 Puan</p>
                  <p className="text-xs text-gray-400">10.000+ Yorum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
