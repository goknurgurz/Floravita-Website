import { Request, Response } from 'express';

const mockTestimonials = [
  {
    id: '1',
    name: 'Ayşe K.',
    location: 'İstanbul',
    rating: 5,
    comment: '3 aydır FloraVita Probiyotik Plus kullanıyorum. Şişkinlik sorunum tamamen geçti, enerjim arttı. Kesinlikle tavsiye ederim!',
    product: 'FloraVita Probiyotik Plus',
    verified: true,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mehmet T.',
    location: 'Ankara',
    rating: 5,
    comment: 'Gut Reset Paketi hayatımı değiştirdi. 2 haftada farkı hissettim. Uyku düzenim de düzeldi, inanılmaz!',
    product: 'FloraVita Gut Reset Paketi',
    verified: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Fatma S.',
    location: 'İzmir',
    rating: 5,
    comment: 'Uzun süredir IBS sorunu yaşıyordum. Doktorumun önerisiyle FloraVita kullanmaya başladım. Çok memnunum.',
    product: 'FloraVita Sindirim Enzimi',
    verified: true,
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '4',
    name: 'Ali R.',
    location: 'Bursa',
    rating: 4,
    comment: 'Prebiyotik Lif gerçekten çok etkili. İlk hafta biraz gaz yaptı ama sonra harika hissettim.',
    product: 'FloraVita Prebiyotik Lif',
    verified: true,
    createdAt: '2024-01-25T00:00:00Z',
  },
  {
    id: '5',
    name: 'Zeynep A.',
    location: 'Antalya',
    rating: 5,
    comment: 'Kargo çok hızlı geldi, ürün kaliteli ambalajda. Aloe Vera Jeli çok beğeniyorum, hafif ve etkili.',
    product: 'FloraVita Aloe Vera Jel',
    verified: true,
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Burak D.',
    location: 'Adana',
    rating: 5,
    comment: 'Yıllardır devam eden reflü problemim ciddi anlamda azaldı. FloraVita ekibine teşekkürler!',
    product: 'FloraVita Gut Reset Paketi',
    verified: true,
    createdAt: '2024-02-05T00:00:00Z',
  },
];

export const getTestimonials = async (_req: Request, res: Response) => {
  try {
    res.json({ success: true, data: mockTestimonials });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Yorumlar getirilemedi' });
  }
};
