'use client';

import { useState } from 'react';
import { mockBlogPosts } from '@/lib/data';
import BlogCard from '@/components/blog/BlogCard';

const categories = ['Tümü', 'Probiyotik', 'Beslenme', 'Sindirim', 'Yaşam Tarzı', 'Tarifler'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filtered = mockBlogPosts.filter(
    (p) => activeCategory === 'Tümü' || p.category === activeCategory,
  );

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-12">
          <div className="badge-green mb-3">FloraVita Blog</div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-forest-dark">
            Bağırsak Sağlığı <span className="text-gradient">Rehberi</span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Uzman ekibimizin hazırladığı bilimsel içerikler, beslenme önerileri ve sağlıklı yaşam ipuçları.
          </p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Kategori filtreleri */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Blog Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Bu kategoride yazı bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
