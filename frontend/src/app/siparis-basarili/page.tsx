'use client';

import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiCheckCircle, FiPackage, FiMail, FiArrowRight } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || '';
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Başarı ikonu */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FiCheckCircle className="w-12 h-12 text-green-500" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold font-serif text-forest-dark mb-4">
        Siparişiniz Alındı! 🎉
      </h1>

      <p className="text-gray-600 text-lg mb-6">
        Siparişiniz başarıyla oluşturuldu. Ödemeniz onaylandıktan sonra
        kargo süreciniz başlayacaktır.
      </p>

      {orderNumber && (
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <p className="text-sm text-gray-500 mb-1">Sipariş Numaranız</p>
          <p className="text-2xl font-bold text-primary-600 font-mono">{orderNumber}</p>
        </div>
      )}

      {/* Sonraki adımlar */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 text-left">
        <h2 className="font-bold text-forest-dark mb-4">Sonraki Adımlar</h2>
        <div className="space-y-4">
          {[
            {
              icon: FiMail,
              title: 'E-posta Onayı',
              desc: 'Sipariş onay e-postanız kısa süre içinde e-posta adresinize iletilecek.',
            },
            {
              icon: FiPackage,
              title: 'Kargo Hazırlığı',
              desc: 'Ödemeniz onaylandıktan sonra ürünleriniz 1-2 iş günü içinde kargoya verilir.',
            },
            {
              icon: FiArrowRight,
              title: 'Teslimat',
              desc: 'Kargo takip numaranız e-posta ile bildirilecektir. Ortalama teslimat 2-4 iş günü.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-forest-dark text-sm">{title}</p>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aksiyonlar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/urunler" className="btn-primary">
          Alışverişe Devam Et
          <FiArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/blog" className="btn-outline">
          Blog Yazılarını Oku
        </Link>
      </div>

      {/* Güven mesajı */}
      <div className="mt-8 p-4 bg-primary-50 rounded-xl">
        <p className="text-sm text-primary-700">
          💚 Herhangi bir sorun yaşarsanız{' '}
          <a href="mailto:info@floravita.com.tr" className="font-semibold underline">
            info@floravita.com.tr
          </a>{' '}
          adresine yazabilirsiniz.
        </p>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-16">
      <div className="container-custom">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Sipariş detayları yükleniyor...</p>
          </div>
        }>
          <OrderSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}

