'use client';

import { useState } from 'react';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import { FiFilter } from 'react-icons/fi';

const categories = ['Tümü', 'Probiyotik', 'Prebiyotik', 'Enzim', 'Paket'];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = mockProducts
    .filter((p) => activeCategory === 'Tümü' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-10">
          <div className="badge-green mb-3">Ürünlerimiz</div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-forest-dark">
            Bağırsak Sağlığı <span className="text-gradient">Ürünleri</span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Bilimsel olarak formüle edilmiş, doğal içerikli takviye ürünlerimizi keşfedin.
          </p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Filtreler */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Kategori filtreleri */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sıralama */}
          <div className="flex items-center gap-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-400"
            >
              <option value="featured">Öne Çıkanlar</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="rating">En Yüksek Puan</option>
            </select>
          </div>
        </div>

        {/* Sonuç sayısı */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} ürün bulundu
        </p>

        {/* Ürün Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Bu kategoride ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
