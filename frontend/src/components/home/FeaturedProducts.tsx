import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts() {
  const featured = mockProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="container-custom">
        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="badge-green mb-4">Öne Çıkan Ürünler</div>
            <h2 className="section-title">
              En Çok Tercih Edilen
              <br />
              <span className="text-gradient">Ürünlerimiz</span>
            </h2>
          </div>
          <Link href="/urunler" className="btn-outline flex-shrink-0">
            Tümünü Gör
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Alt CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            🚚 150₺ üzeri siparişlerde ücretsiz kargo &nbsp;|&nbsp; 🔒 Güvenli ödeme &nbsp;|&nbsp; ↩️ 14 gün iade garantisi
          </p>
        </div>
      </div>
    </section>
  );
}
