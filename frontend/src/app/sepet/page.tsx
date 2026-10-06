'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';

export default function SepetPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = totalPrice() >= 150 ? 0 : 29.90;
  const discount = couponApplied ? totalPrice() * 0.10 : 0;
  const grandTotal = totalPrice() - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'FLORA10') {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-forest-dark font-serif mb-3">
            Sepetiniz Boş
          </h1>
          <p className="text-gray-500 mb-8">
            Bağırsak sağlığınızı desteklemek için ürünlerimize göz atın.
          </p>
          <Link href="/urunler" className="btn-primary">
            Ürünlere Git
            <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-forest-dark font-serif mb-2">Sepetim</h1>
          <p className="text-gray-500">{items.length} ürün</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="card p-5">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-primary-50 rounded-xl flex-shrink-0 overflow-hidden">
                    {item.product.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🌿</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/urunler/${item.product.slug}`}
                          className="font-semibold text-forest-dark hover:text-primary-600 transition-colors line-clamp-2 text-sm md:text-base"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-gray-400 mt-0.5 capitalize">{item.product.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                        aria-label="Ürünü kaldır"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                          aria-label="Azalt"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-forest-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                          aria-label="Artır"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-bold text-forest-dark">
                          {(item.product.price * item.quantity).toFixed(2)} ₺
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-gray-400">{item.product.price.toFixed(2)} ₺ / adet</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              Sepeti Temizle
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-bold text-forest-dark font-serif mb-5">
                Sipariş Özeti
              </h2>

              {/* Coupon */}
              <div className="mb-5">
                <label className="form-label">İndirim Kodu</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="FLORA10"
                    className="form-input flex-1"
                    disabled={couponApplied}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied || !coupon}
                    className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {couponApplied ? '✓' : 'Uygula'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-primary-600 mt-1.5">🎉 %10 indirim uygulandı!</p>
                )}
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ara Toplam</span>
                  <span className="font-medium text-forest-dark">{totalPrice().toFixed(2)} ₺</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">İndirim (-10%)</span>
                    <span className="font-medium text-green-600">-{discount.toFixed(2)} ₺</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kargo</span>
                  {shipping === 0 ? (
                    <span className="font-medium text-green-600">Ücretsiz 🎉</span>
                  ) : (
                    <span className="font-medium text-forest-dark">{shipping.toFixed(2)} ₺</span>
                  )}
                </div>
                {shipping > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-700">
                    {(150 - totalPrice()).toFixed(2)} ₺ daha ekleyin, kargo ücretsiz olsun!
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3">
                  <span className="text-forest-dark">Toplam</span>
                  <span className="text-primary-600">{grandTotal.toFixed(2)} ₺</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/odeme"
                className="btn-accent w-full justify-center mt-6 text-base"
              >
                Ödemeye Geç
                <FiArrowRight />
              </Link>

              {/* Trust badges */}
              <div className="mt-5 space-y-2">
                {[
                  { icon: FiShield, text: 'SSL Güvenli Ödeme' },
                  { icon: FiTruck, text: '150₺ Üzeri Ücretsiz Kargo' },
                  { icon: FiRefreshCw, text: '14 Gün İade Garantisi' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                    <Icon className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-10 text-center">
          <Link href="/urunler" className="btn-outline">
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  );
}
