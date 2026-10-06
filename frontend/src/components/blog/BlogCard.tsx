import Link from 'next/link';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="card group flex flex-col h-full">
      {/* Görsel */}
      <div className="relative overflow-hidden aspect-video bg-primary-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage || 'https://via.placeholder.com/800x450?text=FloraVita+Blog'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Kategori rozeti */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* İçerik */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span>{formattedDate}</span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            <span>{post.readTime} dk okuma</span>
          </div>
        </div>

        {/* Başlık */}
        <h3 className="font-bold text-forest-dark text-base leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1">
          {post.title}
        </h3>

        {/* Özet */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Yazar + Devamını oku */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary-700">FV</span>
            </div>
            <span className="text-xs text-gray-500">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-primary-600 text-xs font-semibold group-hover:gap-2 transition-all">
            <span>Devamını Oku</span>
            <FiArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
