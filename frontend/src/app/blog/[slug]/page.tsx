import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiTag } from 'react-icons/fi';
import { mockBlogPosts } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const relatedPosts = mockBlogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container-custom py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-forest-dark font-medium line-clamp-1">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Ana makale */}
          <article className="lg:col-span-2">
            {/* Kapak görseli */}
            <div className="aspect-video bg-primary-50 rounded-2xl overflow-hidden mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage || 'https://placehold.co/800x450?text=FloraVita+Blog'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="badge-green">{post.category}</span>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <FiClock className="w-3.5 h-3.5" />
                <span>{post.readTime} dk okuma</span>
              </div>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 italic border-l-4 border-primary-300 pl-4">
              {post.excerpt}
            </p>

            {/* Yazar */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-700">FV</span>
              </div>
              <div>
                <p className="font-semibold text-forest-dark text-sm">{post.author}</p>
                <p className="text-xs text-gray-400">FloraVita Sağlık Editörü</p>
              </div>
            </div>

            {/* İçerik */}
            <div className="prose-content">
              {post.content ? (
                <div
                  className="text-gray-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                />
              ) : (
                <div className="text-gray-700 leading-relaxed space-y-6">
                  <p>
                    Bağırsak sağlığı, genel sağlığımızın temel taşlarından birini oluşturmaktadır.
                    Trilyonlarca mikroorganizmadan oluşan bağırsak mikrobiyotamız; sindirim, bağışıklık,
                    ruh hali ve hatta beyin fonksiyonlarını doğrudan etkiler.
                  </p>
                  <h2 className="text-xl font-bold text-forest-dark mt-8">Neden Önemli?</h2>
                  <p>
                    Modern yaşam tarzı, işlenmiş gıdalar, stres ve antibiyotik kullanımı bağırsak
                    floramızı olumsuz etkilemektedir. Bu dengesizlik (disbiyozis), sindirim sorunları,
                    bağışıklık problemleri ve kronik yorgunluğa yol açabilir.
                  </p>
                  <h2 className="text-xl font-bold text-forest-dark mt-8">Ne Yapabilirsiniz?</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Probiyotik açısından zengin fermente gıdalar tüketin</li>
                    <li>Lif tüketiminizi artırın (prebiyotik kaynak)</li>
                    <li>İşlenmiş gıda ve şeker tüketimini azaltın</li>
                    <li>Kaliteli uyku ve düzenli egzersiz yapın</li>
                    <li>Stresi yönetmeyi öğrenin</li>
                  </ul>
                  <h2 className="text-xl font-bold text-forest-dark mt-8">FloraVita ile Destek</h2>
                  <p>
                    Günlük beslenmenizi doğal takviyelerle desteklemek, bağırsak sağlığınızı
                    iyileştirmenin en etkili yollarından biridir. FloraVita&apos;nın bilimsel
                    formülleri bu yolculukta size destek olacaktır.
                  </p>
                </div>
              )}
            </div>

            {/* Etiketler */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <FiTag className="w-4 h-4 text-gray-400" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <Link href="/blog" className="btn-outline inline-flex">
                <FiArrowLeft className="w-4 h-4" />
                Tüm Yazılara Dön
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Ürün CTA */}
            <div className="bg-gradient-green rounded-2xl p-6 text-white text-center">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="font-bold font-serif text-lg mb-2">Ürünlerimizi Keşfedin</h3>
              <p className="text-primary-100 text-sm mb-4">
                Bağırsak sağlığınızı desteklemek için özel formüllerimizi inceleyin.
              </p>
              <Link href="/urunler" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all inline-block">
                Ürünleri Gör
              </Link>
            </div>

            {/* İlgili yazılar */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-bold text-forest-dark mb-4">İlgili Yazılar</h3>
                <div className="space-y-4">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="flex gap-3 group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-primary-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rp.coverImage || 'https://placehold.co/64x64?text=FV'}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-forest-dark group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                          {rp.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {rp.readTime} dk okuma
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-cream-100 border border-primary-100 rounded-2xl p-6">
              <h3 className="font-bold text-forest-dark mb-2">Bültenimize Abone Olun</h3>
              <p className="text-gray-500 text-sm mb-4">
                Yeni içeriklerden haberdar olmak için e-posta adresinizi bırakın.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400"
                />
                <button
                  type="submit"
                  className="w-full btn-primary py-2.5 text-sm justify-center"
                >
                  Abone Ol
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
