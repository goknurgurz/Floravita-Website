import Link from 'next/link';
import { FiArrowRight, FiPackage, FiRefreshCw, FiTruck } from 'react-icons/fi';

const guarantees = [
  {
    icon: FiTruck,
    title: 'Ücretsiz Kargo',
    desc: '150₺ üzeri tüm siparişlerde',
  },
  {
    icon: FiRefreshCw,
    title: '14 Gün İade',
    desc: 'Koşulsuz iade garantisi',
  },
  {
    icon: FiPackage,
    title: 'Orijinal Ürün',
    desc: 'GMP sertifikalı üretim',
  },
];

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        {/* Garantiler */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {guarantees.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-5 bg-cream-50 rounded-2xl border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-forest-dark">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ana CTA bloğu */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-forest-dark rounded-3xl p-10 md:p-16 text-white text-center">
          {/* Dekoratif daireler */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative">
            <span className="inline-block text-4xl mb-4">🌿</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Bağırsak Sağlığı Yolculuğunuza
              <br />
              Bugün Başlayın
            </h2>
            <p className="text-primary-100 text-base mb-8 max-w-xl mx-auto">
              Binlerce kişi FloraVita ile sağlıklı bir bağırsak florasına kavuştu. 
              Sıra sizde! İlk siparişinizde %10 indirim için{' '}
              <span className="font-bold text-white">FLORAVITA10</span> kodunu kullanın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/urunler" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg">
                Ürünleri Keşfet
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/blog" className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                Blog Yazılarını Oku
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
