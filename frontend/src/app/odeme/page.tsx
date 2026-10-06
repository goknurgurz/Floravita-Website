'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiShield, FiLock, FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { OrderForm } from '@/types';
import toast from 'react-hot-toast';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [paytrIframe, setPaytrIframe] = useState<string | null>(null);

  const [form, setForm] = useState<OrderForm>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    city: '',
    district: '',
    zipCode: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Sepetiniz boş!');
      return;
    }

    setLoading(true);

    try {
      // 1) Önce siparişi oluştur
      const orderPayload = {
        ...form,
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0],
        })),
        total: totalPrice(),
      };

      const orderRes = await axios.post(`${BACKEND_URL}/api/orders`, orderPayload);
      const order = orderRes.data.data;

      // 2) PayTR token al
      const paytrRes = await axios.post(`${BACKEND_URL}/api/paytr/create-token`, {
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        customerAddress: `${form.customerAddress}, ${form.district}, ${form.city}`,
        total: totalPrice(),
        items: items.map((item) => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        userIp: '127.0.0.1',
      });

      if (paytrRes.data.status === 'success') {
        setPaytrIframe(paytrRes.data.token);
      } else {
        throw new Error('PayTR token alınamadı');
      }
    } catch (err) {
      console.error(err);
      toast.error('Ödeme başlatılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // Sepet boşsa yönlendir
  if (items.length === 0 && !paytrIframe) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-forest-dark mb-2">Sepetiniz Boş</h2>
          <p className="text-gray-500 mb-6">Ödeme yapmak için önce ürün ekleyin.</p>
          <Link href="/urunler" className="btn-primary">
            Ürünleri Keşfet
          </Link>
        </div>
      </div>
    );
  }

  // PayTR iFrame aktif
  if (paytrIframe) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg">
          <div className="p-4 bg-primary-50 border-b border-primary-100 flex items-center gap-2">
            <FiLock className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Güvenli PayTR Ödeme Sayfası</span>
          </div>
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${paytrIframe}`}
            style={{ border: 'none', width: '100%', height: '600px' }}
            scrolling="no"
            title="PayTR Güvenli Ödeme"
          />
        </div>
        <button
          onClick={() => setPaytrIframe(null)}
          className="mt-4 text-white/70 hover:text-white text-sm transition-colors"
        >
          ← Ödeme formuna geri dön
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/urunler" className="btn-outline py-2">
            <FiArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-forest-dark font-serif">Ödeme</h1>
            <p className="text-sm text-gray-500">Teslimat bilgilerinizi girin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kişisel Bilgiler */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-bold text-forest-dark mb-5 flex items-center gap-2">
                  <FiUser className="w-5 h-5 text-primary-500" />
                  Kişisel Bilgiler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="form-label">Ad Soyad *</label>
                    <input
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                      placeholder="Ad Soyad"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      <FiMail className="inline w-3.5 h-3.5 mr-1" />
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={form.customerEmail}
                      onChange={handleChange}
                      required
                      placeholder="ornek@mail.com"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      <FiPhone className="inline w-3.5 h-3.5 mr-1" />
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={form.customerPhone}
                      onChange={handleChange}
                      required
                      placeholder="0532 123 45 67"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Adres Bilgileri */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-bold text-forest-dark mb-5 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-primary-500" />
                  Teslimat Adresi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Şehir *</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="İstanbul"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">İlçe *</label>
                    <input
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      required
                      placeholder="Kadıköy"
                      className="form-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Açık Adres *</label>
                    <textarea
                      name="customerAddress"
                      value={form.customerAddress}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Mahalle, cadde, sokak, kapı no, daire no..."
                      className="form-input resize-none"
                    />
                  </div>
                  <div>
                    <label className="form-label">Posta Kodu</label>
                    <input
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleChange}
                      placeholder="34000"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Sipariş Notu</label>
                    <input
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Özel notunuz..."
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Güven rozeti */}
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                <FiShield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-700">
                  Ödemeniz <strong>PayTR</strong> güvencesiyle 256-bit SSL şifrelemesiyle korunmaktadır.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full justify-center py-4 text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    İşleniyor...
                  </span>
                ) : (
                  <>
                    <FiLock className="w-5 h-5" />
                    Güvenli Ödemeye Geç — ₺{totalPrice().toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sipariş Özeti */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="font-bold text-forest-dark mb-5">Sipariş Özeti</h2>
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-primary-50 rounded-lg overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-forest-dark line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-forest-dark">
                      ₺{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Ara Toplam</span>
                  <span>₺{totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Kargo</span>
                  <span className={totalPrice() >= 150 ? 'text-green-600' : ''}>
                    {totalPrice() >= 150 ? 'Ücretsiz' : '₺29.90'}
                  </span>
                </div>
                {totalPrice() < 150 && (
                  <p className="text-xs text-primary-600 bg-primary-50 rounded-lg p-2">
                    ₺{(150 - totalPrice()).toFixed(2)} daha ekleyin, kargo ücretsiz!
                  </p>
                )}
                <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-forest-dark">
                  <span>Toplam</span>
                  <span className="text-lg">
                    ₺{(totalPrice() + (totalPrice() >= 150 ? 0 : 29.90)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Ödeme yöntemleri */}
            <div className="bg-white rounded-2xl shadow-soft p-4 text-center">
              <p className="text-xs text-gray-500 mb-3">Güvenli Ödeme Yöntemleri</p>
              <div className="flex justify-center gap-2">
                {['PayTR', 'VISA', 'Mastercard', 'Taksit'].map((m) => (
                  <span key={m} className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
