'use client';

import { useState } from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Gerçek entegrasyonda API çağrısı yapılır
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Bültene başarıyla abone oldunuz!');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-green">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center text-white">
          {/* İkon */}
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiMail className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Sağlık İpuçlarını
            <br />
            İlk Siz Öğrenin
          </h2>
          <p className="text-primary-100 text-base mb-8 max-w-md mx-auto">
            Bağırsak sağlığı, beslenme önerileri ve özel indirimler için 
            bültenimize abone olun. Haftalık içerik, spam yok.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              className="flex-1 px-5 py-3.5 rounded-xl text-gray-700 placeholder-gray-400 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-accent-500 hover:bg-accent-600 disabled:bg-accent-400 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Abone Ol
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-primary-200 text-xs mt-4">
            Gizliliğinize saygı duyuyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
          </p>

          {/* Güven ikonları */}
          <div className="flex justify-center gap-8 mt-10 pt-8 border-t border-white/10">
            {[
              { emoji: '👥', value: '10.000+', label: 'Abone' },
              { emoji: '📧', value: 'Haftalık', label: 'İçerik' },
              { emoji: '🔒', value: '100%', label: 'Güvenli' },
            ].map(({ emoji, value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-white font-bold text-sm">{value}</div>
                <div className="text-primary-200 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
