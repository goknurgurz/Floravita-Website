'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  FiShoppingCart, FiArrowLeft, FiStar,
  FiCheck, FiTruck, FiRefreshCw, FiShield,
} from 'react-icons/fi';
import { mockProducts } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import ProductCard from '@/components/products/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const product = mockProducts.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients'>('benefits');

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!product) return notFound();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    openCart();
    toast.success(`${product.name} sepete eklendi!`);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container-custom py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/urunler" className="hover:text-primary-600 transition-colors">Ürünler</Link>
          <span>/</span>
          <span className="text-forest-dark font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Ana içerik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Sol: Görseller */}
          <div>
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-soft mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImage] || 'https://placehold.co/600x600?text=FloraVita'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-primary-500' : 'border-gray-100 hover:border-primary-200'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ: Ürün bilgisi */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-green">{product.category}</span>
              {product.featured && (
                <span className="bg-accent-100 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Çok Satan
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mb-4">
              {product.name}
            </h1>

            {/* Puan */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-forest-dark">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} değerlendirme)</span>
            </div>

            {/* Fiyat */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-forest-dark">
                ₺{product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₺{product.oldPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-lg">
                    %{discount} İndirim
                  </span>
                </>
              )}
            </div>

            {/* Kısa açıklama */}
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Miktar + Sepet */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-medium"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-forest-dark">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl font-medium"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-accent py-3.5 text-base"
              >
                <FiShoppingCart className="w-5 h-5" />
                {product.stock === 0 ? 'Stok Tükendi' : 'Sepete Ekle'}
              </button>
            </div>

            {/* Stok uyarısı */}
            {product.stock > 0 && product.stock <= 10 && (
              <p className="text-orange-600 text-sm mb-4">
                ⚠️ Son {product.stock} adet kaldı!
              </p>
            )}

            {/* Garantiler */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white space-y-3">
              {[
                { icon: FiTruck, text: '150₺ üzeri ücretsiz kargo' },
                { icon: FiRefreshCw, text: '14 gün koşulsuz iade garantisi' },
                { icon: FiShield, text: 'GMP sertifikalı, orijinal ürün' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon className="w-4 h-4 text-primary-500" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detay sekmeleri */}
        <div className="mt-14 bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="flex border-b border-gray-100">
            {(['benefits', 'ingredients'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-500 bg-primary-50/50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'benefits' ? 'Faydaları' : 'İçerikler'}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'benefits' && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <FiCheck className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'ingredients' && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mt-1.5 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* İlgili Ürünler */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-forest-dark font-serif mb-8">
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Geri dön */}
        <div className="mt-12">
          <Link href="/urunler" className="btn-outline inline-flex">
            <FiArrowLeft className="w-4 h-4" />
            Tüm Ürünlere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
