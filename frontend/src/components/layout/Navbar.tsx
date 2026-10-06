'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { FiShoppingCart, FiMenu, FiX, FiFeather } from 'react-icons/fi';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/urunler', label: 'Ürünler' },
  { href: '/blog', label: 'Blog' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-green rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-hover transition-shadow">
                <FiFeather className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-forest-dark">
                Flora<span className="text-primary-500">Vita</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: Cart + Mobile menu */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
                aria-label="Sepeti Aç"
              >
                <FiShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
                aria-label="Menü"
              >
                {isMobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/urunler"
                className="block w-full text-center btn-accent py-3 mt-2"
              >
                Ürünleri Keşfet
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16 md:h-20" />

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────

function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-forest-dark font-serif">Sepetim</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <FiShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Sepetiniz boş</p>
              <p className="text-gray-400 text-sm mt-1">Ürünleri keşfetmeye başlayın</p>
              <Link
                href="/urunler"
                onClick={closeCart}
                className="btn-primary mt-6 inline-flex"
              >
                Ürünleri Keşfet
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-cream-100 rounded-xl">
                <div className="w-16 h-16 bg-primary-50 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-forest-dark line-clamp-2">
                    {item.product.name}
                  </p>
                  <p className="text-primary-600 font-bold mt-1">
                    ₺{item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-all flex items-center justify-center text-lg font-medium"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-all flex items-center justify-center text-lg font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors self-start p-1"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Toplam</span>
              <span className="text-2xl font-bold text-forest-dark">
                ₺{totalPrice().toFixed(2)}
              </span>
            </div>
            <Link
              href="/odeme"
              onClick={closeCart}
              className="btn-accent w-full justify-center text-center py-4 text-base"
            >
              Ödemeye Geç
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Alışverişe Devam Et
            </button>
          </div>
        )}
      </div>
    </>
  );
}
