import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// In-memory sipariş deposu (DB bağlantısı olmadan çalışır)
const orders: Record<string, object> = {};

// Sipariş oluştur
export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      city,
      district,
      zipCode,
      notes,
      items,
      total,
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !items?.length) {
      return res.status(400).json({ success: false, error: 'Gerekli alanlar eksik' });
    }

    const orderNumber = `FV-${Date.now()}-${uuidv4().substring(0, 6).toUpperCase()}`;
    const order = {
      id: uuidv4(),
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      city,
      district,
      zipCode,
      notes,
      total: total || items.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0),
      status: 'PENDING',
      items,
      createdAt: new Date().toISOString(),
    };

    orders[orderNumber] = order;
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('Sipariş oluşturulamadı:', error);
    res.status(500).json({ success: false, error: 'Sipariş oluşturulamadı' });
  }
};

// Sipariş numarasına göre getir
export const getOrderByNumber = async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    const order = orders[orderNumber];
    if (!order) {
      return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Sipariş getirilemedi:', error);
    res.status(500).json({ success: false, error: 'Sipariş getirilemedi' });
  }
};
