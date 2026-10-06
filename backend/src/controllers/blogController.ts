import { Request, Response } from 'express';

// Mock blog verisi (DB bağlantısı olmadan çalışır)
const mockPosts = [
  {
    id: '1',
    title: 'Bağırsakta Probiyotiklerin Rolü',
    slug: 'bagirsakta-probiyotiklerin-rolu',
    excerpt: 'Probiyotikler bağırsak sağlığında nasıl rol oynar? Bilimsel araştırmalar ne söylüyor?',
    content: `<h2>Probiyotikler Nedir?</h2>
<p>Probiyotikler, yeterli miktarda alındığında sağlığa fayda sağlayan canlı mikroorganizmalardır. Bağırsak floranızı destekler ve sindirim sisteminizi güçlendirir.</p>
<h2>Bağırsak Sağlığına Etkileri</h2>
<p>Düzenli probiyotik kullanımı; gaz, şişkinlik ve kabızlık gibi sorunları azaltır. Ayrıca bağışıklık sistemini %70 oranında destekleyen bağırsak lenfoid dokusunu güçlendirir.</p>
<h2>Hangi Probiyotikler Kullanılmalı?</h2>
<p>Lactobacillus acidophilus ve Bifidobacterium longum en çok araştırılan ve kanıtlanmış probiyotik suşlarıdır.</p>`,
    coverImage: '/blog/probiyotik.jpg',
    category: 'probiyotik',
    tags: ['probiyotik', 'bağırsak sağlığı', 'sindirim'],
    author: 'Dr. Ayşe Kaya',
    readTime: 5,
    published: true,
    publishedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Probiyotik ve Prebiyotik Arasındaki Fark',
    slug: 'probiyotik-prebiyotik-fark',
    excerpt: 'Probiyotik ve prebiyotiği karıştırıyor musunuz? İşte aralarındaki temel farklar.',
    content: `<h2>Probiyotik mi, Prebiyotik mi?</h2>
<p>Probiyotikler canlı faydalı bakteriler iken, prebiyotikler bu bakterilerin beslenmesini sağlayan lif türleridir.</p>
<h2>Sinbiyotik Kavramı</h2>
<p>Probiyotik ve prebiyotiği birlikte kullanmak "sinbiyotik" yaklaşım olarak bilinir ve en etkili sonuçları verir.</p>`,
    coverImage: '/blog/prebiyotik.jpg',
    category: 'beslenme',
    tags: ['prebiyotik', 'probiyotik', 'sinbiyotik'],
    author: 'Uzm. Dyt. Mehmet Yılmaz',
    readTime: 4,
    published: true,
    publishedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    title: '7 Günde Bağırsak Sağlığı Programı',
    slug: '7-gunde-bagirsak-sagligi-programi',
    excerpt: '7 günlük pratik bir program ile bağırsak floranızı sıfırlayın ve yeniden dengeleyin.',
    content: `<h2>7 Günlük Program</h2>
<p>Bağırsak sağlığınızı iyileştirmek için 7 günlük bu programı uygulayın:</p>
<h3>1-2. Gün: Detoks</h3>
<p>İşlenmiş gıdaları kesin, bol su için ve fermente gıdalar tüketin.</p>
<h3>3-5. Gün: Yeniden Yapılanma</h3>
<p>Probiyotik takviyeye başlayın, lif alımını artırın.</p>
<h3>6-7. Gün: Pekiştirme</h3>
<p>Düzenli uyku ve stresten uzak durmak bağırsak florasını destekler.</p>`,
    coverImage: '/blog/program.jpg',
    category: 'program',
    tags: ['detoks', 'program', 'bağırsak'],
    author: 'Dr. Ayşe Kaya',
    readTime: 7,
    published: true,
    publishedAt: '2024-01-25T10:00:00Z',
  },
  {
    id: '4',
    title: 'Bağırsak-Beyin Bağlantısı: Mikrobiyom ve Ruh Sağlığı',
    slug: 'bagirsak-beyin-baglantisi',
    excerpt: 'Bağırsak ve beyin arasındaki güçlü bağlantı neden bu kadar önemli?',
    content: `<h2>Bağırsak-Beyin Ekseni</h2>
<p>Bağırsak "ikinci beyin" olarak adlandırılır. Serotoninin %95'i bağırsakta üretilir.</p>
<h2>Mikrobiyom ve Anksiyete</h2>
<p>Bağırsak mikrobiyomunun dengesi doğrudan ruh halinizi, anksiyete ve depresyon riskinizi etkiler.</p>`,
    coverImage: '/blog/beyin.jpg',
    category: 'bilim',
    tags: ['beyin', 'ruh sağlığı', 'mikrobiyom', 'serotonin'],
    author: 'Prof. Dr. Ali Demir',
    readTime: 6,
    published: true,
    publishedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '5',
    title: 'Sindirim Sorunlarına Doğal Çözümler',
    slug: 'sindirim-sorunlarina-dogal-cozumler',
    excerpt: 'Gaz, şişkinlik, kabızlık gibi sindirim sorunlarına karşı etkili doğal yöntemler.',
    content: `<h2>Yaygın Sindirim Sorunları</h2>
<p>Gaz, şişkinlik, kabızlık ve IBS modern yaşamın yaygın sorunları haline geldi.</p>
<h2>Doğal Çözümler</h2>
<p>Zencefil çayı, aloe vera, nane yağı ve probiyotik takviye bu sorunları önemli ölçüde azaltır.</p>`,
    coverImage: '/blog/sindirim.jpg',
    category: 'saglik',
    tags: ['sindirim', 'doğal', 'şişkinlik', 'kabızlık'],
    author: 'Uzm. Dyt. Fatma Şahin',
    readTime: 5,
    published: true,
    publishedAt: '2024-02-10T10:00:00Z',
  },
];

// Tüm blog yazılarını getir
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = mockPosts
      .filter(p => p.published)
      .map(({ content: _c, ...rest }) => rest); // content'i liste görünümünde gizle
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Blog yazıları getirilemedi' });
  }
};

// Slug ile blog yazısı getir
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = mockPosts.find(p => p.slug === slug);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Blog yazısı bulunamadı' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Blog yazısı getirilemedi' });
  }
};

// Kategoriye göre blog yazıları getir
export const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const posts = mockPosts
      .filter(p => p.category === category && p.published)
      .map(({ content: _c, ...rest }) => rest);
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Blog yazıları getirilemedi' });
  }
};
