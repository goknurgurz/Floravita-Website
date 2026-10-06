# 🌿 FloraVita - Bağırsak Sağlığı E-Ticaret & Blog Platformu

FloraVita, Türkiye'nin bağırsak sağlığı odaklı e-ticaret ve bilgi platformudur. Probiyotik, prebiyotik, sindirim enzimi ürün satışı, sepet yönetimi, PayTR ödeme entegrasyonu ve sağlık blogu sunar.

---

## 📸 Özellikler

- **🛒 E-Ticaret & Ürün Kataloğu**: Kategorilere göre filtreleme, ürün detay sayfaları, içerik/fayda bilgileri, puanlama ve stok takibi.
- **🛍️ Gelişmiş Sepet Yönetimi (Zustand)**: Anlık miktar güncelleme, indirim kuponu (`FLORA10`), hızlı sepet çekmecesi (Cart Drawer).
- **💳 PayTR Ödeme Entegrasyonu**: Güvenli iFrame tabanlı sanal POS altyapısı (Test & Canlı mod desteği).
- **📝 Sağlık Blogu**: Kategori ve etiket bazlı arama, tahmini okuma süresi, ilgili makaleler ve e-posta bülteni aboneliği.
- **🎨 Modern & Responsive Tasarım**: Orman yeşili ve krem tonlarında premium renk paleti, micro-animation'lar, tam mobil uyumluluk.

---

## 🏗️ Proje Mimarisi

```text
floravita/
├── frontend/                  # Next.js 16 (App Router) + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/               # Sayfa rotaları (Ürünler, Blog, Sepet, Ödeme vb.)
│   │   ├── components/        # UI ve Sayfa bileşenleri
│   │   ├── lib/               # API istemcisi ve mock veri yönetimi
│   │   ├── store/             # Zustand sepet state yönetimi
│   │   └── types/             # TypeScript tip tanımlamaları
│   └── public/                # Görseller ve statik varlıklar
│
└── backend/                   # Express.js + TypeScript REST API
    ├── src/
    │   ├── controllers/       # Ürün, Blog, Sipariş, Müşteri Yorumları ve PayTR mantığı
    │   ├── routes/            # Express rota tanımları
    │   └── index.ts           # Ana uygulama giriş noktası (Port 5001)
    └── prisma/                # Prisma ORM şeması (PostgreSQL hazırlığı)
```

---

## 🚀 Hızlı Başlangıç

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla takip edin.

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/kullanici/floravita.git
cd floravita
```

### 2. Backend Sunucusunu Başlatın

```bash
cd backend

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun (varsayılan olarak hazır port 5001)
cp .env.example .env

# Geliştirme sunucusunu başlatın
npm run dev
# → API Sunucusu: http://localhost:5001
```

### 3. Frontend Sunucusunu Başlatın

Yeni bir terminal penceresinde:

```bash
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
# → Web Uygulaması: http://localhost:3000
```

---

## 🌐 Sayfa Yapısı

| Sayfa | Rota | Açıklama |
|-------|------|----------|
| **Ana Sayfa** | `/` | Öne çıkan ürünler, faydalar, müşteri yorumları ve blog özeti |
| **Ürünler** | `/urunler` | Tüm ürün kataloğu ve filtreleme |
| **Ürün Detay** | `/urunler/[slug]` | Görsel galerisi, miktar seçimi, içerik ve fayda sekmesi |
| **Blog** | `/blog` | Tüm blog yazıları ve kategori filtresi |
| **Blog Detay** | `/blog/[slug]` | Makale içeriği, yazar bilgisi ve ilgili yazılar |
| **Hakkımızda** | `/hakkimizda` | Marka hikayesi, misyon ve kalite standartları |
| **Sepet** | `/sepet` | Detaylı sepet özeti ve kupon kodu kullanımı (`FLORA10`) |
| **Ödeme** | `/odeme` | Teslimat bilgileri formu ve PayTR ödeme ekranı |
| **Sipariş Onayı** | `/siparis-basarili` | Sipariş özet ekranı ve sonraki adımlar |

---

## 🔗 Backend API Endpoints

Sunucu **`http://localhost:5001`** üzerinde çalışmaktadır:

| Metot | Endpoint | Açıklama |
|-------|----------|----------|
| `GET` | `/health` | Sunucu sağlık kontrolü |
| `GET` | `/api/products` | Tüm ürünleri getirir |
| `GET` | `/api/products/featured` | Öne çıkan ürünleri getirir |
| `GET` | `/api/products/:slug` | Tekil ürün detayı getirir |
| `GET` | `/api/products/category/:category` | Kategoriye göre ürün getirir |
| `GET` | `/api/blog` | Tüm blog yazılarını getirir |
| `GET` | `/api/blog/:slug` | Tekil blog yazısını getirir |
| `GET` | `/api/testimonials` | Müşteri yorumlarını getirir |
| `POST` | `/api/newsletter` | E-posta bültenine kayıt olur |
| `POST` | `/api/orders` | Yeni sipariş oluşturur |
| `GET` | `/api/orders/:orderNumber` | Sipariş numarasına göre sipariş detayı |
| `POST` | `/api/paytr/create-token` | PayTR ödeme token'ı oluşturur |
| `POST` | `/api/paytr/callback` | PayTR bildirim URL callback'i |

---

## 💳 PayTR Entegrasyonu Kurulumu

1. [PayTR Mağaza Paneli](https://www.paytr.com)'nden bilgilerinizi alın.
2. `backend/.env` dosyasına bilgileri girin:
   ```env
   PAYTR_MERCHANT_ID=MAĞAZA_NO
   PAYTR_MERCHANT_KEY=MAĞAZA_ANAHTARI
   PAYTR_MERCHANT_SALT=MAĞAZA_TUZU
   ```
3. Test işlemleri için `NODE_ENV=development` modunda kalın. Production deployment öncesi `NODE_ENV=production` ayarlayabilirsiniz.

---

## 🛠️ Teknolojiler

- **Frontend**: Next.js 16 (React 18), TypeScript, Tailwind CSS, Zustand, React Icons, React Hot Toast
- **Backend**: Node.js, Express.js, TypeScript, Helmet, CORS, Morgan, Axios
- **Veritabanı Desteği**: Prisma ORM (In-memory mock hazır, PostgreSQL bağlantısına uygun)
