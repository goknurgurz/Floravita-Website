import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { mockBlogPosts } from '@/lib/data';
import BlogCard from '@/components/blog/BlogCard';

export default function BlogPreview() {
  const posts = mockBlogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-cream-50">
      <div className="container-custom">
        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="badge-green mb-4">Blog & Bilgi</div>
            <h2 className="section-title">
              Bağırsak Sağlığı
              <br />
              <span className="text-gradient">Hakkında Her Şey</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-md text-sm">
              Uzman ekibimizin hazırladığı bilimsel içerikler, pratik ipuçları ve sağlıklı yaşam rehberleri.
            </p>
          </div>
          <Link href="/blog" className="btn-outline flex-shrink-0">
            Tüm Yazılar
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
