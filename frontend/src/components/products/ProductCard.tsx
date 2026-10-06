'use client';

import Link from 'next/link';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    openCart();
    toast.success(`${product.name} sepete eklendi!`);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <Link href={`/urunler/${product.slug}`} className="card group flex flex-col h-full">
      {/* Görsel */}
      <div className="relative overflow-hidden bg-primary-50 aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x400?text=FloraVita'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* İndirim rozeti */}
        {discount && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            %{discount} İndirim
          </div>
        )}

        {/* Öne çıkan rozeti */}
        {product.featured && !discount && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            Çok Satan
          </div>
        )}

        {/* Stok durumu */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            Son {product.stock}!
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="p-5 flex flex-col flex-1">
        {/* Kategori */}
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md w-fit mb-3">
          {product.category}
        </span>

        {/* İsim */}
        <h3 className="font-bold text-forest-dark text-sm leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Açıklama */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Puan */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Fiyat + Sepet */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-forest-dark">
              ₺{product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ₺{product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-10 h-10 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-all hover:shadow-hover"
            aria-label="Sepete Ekle"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-2 text-center">Stok Tükendi</p>
        )}
      </div>
    </Link>
  );
}
