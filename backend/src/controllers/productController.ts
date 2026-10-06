import { Request, Response } from 'express';

// Mock ürün verisi (DB bağlantısı olmadan çalışır)
const mockProducts = [
  {
    id: '1', slug: 'floravita-probiyotik-plus', name: 'FloraVita Probiyotik Plus',
    description: 'Bağırsak florasını destekleyen 10 milyar CFU probiyotik içeren takviye.',
    price: 299.90, originalPrice: 379.90, images: ['/products/probiyotik.jpg'],
    category: 'probiyotik', stock: 50, featured: true, rating: 4.8, reviewCount: 127,
    ingredients: 'Lactobacillus acidophilus, Bifidobacterium longum, İnülin',
    benefits: ['Sindirim sistemini destekler', 'Bağışıklık sistemini güçlendirir'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2', slug: 'floravita-prebiyotik-lif', name: 'FloraVita Prebiyotik Lif',
    description: 'Probiyotikleri besleyen, sindirim sağlığını destekleyen prebiyotik lif karışımı.',
    price: 199.90, originalPrice: 249.90, images: ['/products/prebiyotik.jpg'],
    category: 'prebiyotik', stock: 75, featured: true, rating: 4.7, reviewCount: 89,
    ingredients: 'İnülin, FOS (Fruktooligosakkaridler), Psyllium Husk',
    benefits: ['Düzenli sindirim sağlar', 'Kan şekerini dengeler'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3', slug: 'floravita-sindirim-enzimi', name: 'FloraVita Sindirim Enzimi',
    description: 'Besinlerin tam sindirimini destekleyen çok yönlü enzim kompleksi.',
    price: 249.90, originalPrice: 299.90, images: ['/products/enzim.jpg'],
    category: 'enzim', stock: 40, featured: true, rating: 4.9, reviewCount: 203,
    ingredients: 'Amilaz, Proteaz, Lipaz, Laktaz, Selülaz',
    benefits: ['Besin emilimini artırır', 'Gaz ve şişkinliği azaltır'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4', slug: 'floravita-detoks-karisimi', name: 'FloraVita Detoks Karışımı',
    description: 'Bağırsakları temizleyen ve toksinlerden arındıran bitkisel karışım.',
    price: 179.90, originalPrice: 229.90, images: ['/products/detoks.jpg'],
    category: 'detoks', stock: 60, featured: false, rating: 4.6, reviewCount: 54,
    ingredients: 'Zerdeçal, Zencefil, Limon Balsamı, Aloe Vera',
    benefits: ['Toksinleri uzaklaştırır', 'Karaciğer sağlığını destekler'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5', slug: 'floravita-bagisiklik-destek', name: 'FloraVita Bağışıklık Destek',
    description: 'Bağırsak kökenli bağışıklık sistemini güçlendiren vitamin-mineral kompleksi.',
    price: 329.90, originalPrice: 399.90, images: ['/products/bagisiklik.jpg'],
    category: 'vitamin', stock: 35, featured: true, rating: 4.8, reviewCount: 167,
    ingredients: 'Vitamin C, Vitamin D3, Çinko, Selenyum, Echinacea',
    benefits: ['Bağışıklığı güçlendirir', 'Yorgunluğu azaltır'],
    createdAt: new Date().toISOString(),
  },
];

// Tüm ürünleri getir
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    res.json({ success: true, data: mockProducts.filter(p => p.stock > 0) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ürünler getirilemedi' });
  }
};

// Slug ile ürün getir
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = mockProducts.find(p => p.slug === slug);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Ürün bulunamadı' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Ürün getirilemedi' });
  }
};

// Öne çıkan ürünleri getir
export const getFeaturedProducts = async (_req: Request, res: Response) => {
  try {
    const products = mockProducts.filter(p => p.featured && p.stock > 0).slice(0, 4);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Öne çıkan ürünler getirilemedi' });
  }
};

// Kategoriye göre ürünleri getir
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = mockProducts.filter(p => p.category === category && p.stock > 0);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Kategoriye göre ürünler getirilemedi' });
  }
};
