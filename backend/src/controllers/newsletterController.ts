import { Request, Response } from 'express';

const newsletterSubscribers: string[] = [];

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Geçerli bir e-posta adresi giriniz' });
    }

    if (!newsletterSubscribers.includes(email)) {
      newsletterSubscribers.push(email);
    }

    res.json({ success: true, message: 'Bültene başarıyla abone olundu' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Bülten aboneliği oluşturulamadı' });
  }
};
