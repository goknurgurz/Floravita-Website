import { Request, Response } from 'express';
import crypto from 'crypto';
import axios from 'axios';

// In-memory ödeme durumu deposu
const paymentStatuses: Record<string, string> = {};

const PAYTR_MERCHANT_ID = process.env.PAYTR_MERCHANT_ID || '';
const PAYTR_MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY || '';
const PAYTR_MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT || '';
const PAYTR_TEST_MODE = process.env.NODE_ENV !== 'production' ? '1' : '0';

// PayTR ödeme token oluştur
export const createPaymentToken = async (req: Request, res: Response) => {
  try {
    const {
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      city,
      items,
      total,
      userIp,
    } = req.body;

    if (!orderNumber || !customerEmail || !items) {
      return res.status(400).json({ success: false, error: 'Gerekli alanlar eksik' });
    }

    // Sepet içeriği (PayTR formatında)
    // [[urun_adi, fiyat, adet], ...]
    const basketItems = items.map((item: { name: string; price: number; quantity: number }) => [
      item.name,
      String(Math.round(item.price * 100)), // kuruş cinsinden
      String(item.quantity),
    ]);
    const userBasket = Buffer.from(JSON.stringify(basketItems)).toString('base64');

    const merchantOid = orderNumber;
    const paymentAmount = String(Math.round(total * 100)); // kuruş cinsinden
    const currency = 'TL';
    const noInstallment = '0';
    const maxInstallment = '0';
    const lang = 'tr';

    const successUrl = process.env.PAYTR_SUCCESS_URL || 'http://localhost:3000/siparis-basarili';
    const failUrl = process.env.PAYTR_FAIL_URL || 'http://localhost:3000/odeme?error=1';

    // Hash oluştur
    const hashStr = `${PAYTR_MERCHANT_ID}${userIp}${merchantOid}${customerEmail}${paymentAmount}${userBasket}${noInstallment}${maxInstallment}${currency}${PAYTR_TEST_MODE}`;
    const paytrToken = crypto
      .createHmac('sha256', `${PAYTR_MERCHANT_KEY}${PAYTR_MERCHANT_SALT}`)
      .update(hashStr)
      .digest('base64');

    // PayTR API'ye istek gönder
    const params = new URLSearchParams({
      merchant_id: PAYTR_MERCHANT_ID,
      user_ip: userIp,
      merchant_oid: merchantOid,
      email: customerEmail,
      payment_amount: paymentAmount,
      paytr_token: paytrToken,
      user_basket: userBasket,
      debug_on: PAYTR_TEST_MODE,
      no_installment: noInstallment,
      max_installment: maxInstallment,
      user_name: customerName,
      user_address: customerAddress,
      user_phone: customerPhone,
      merchant_ok_url: successUrl,
      merchant_fail_url: failUrl,
      timeout_limit: '30',
      currency,
      test_mode: PAYTR_TEST_MODE,
      lang,
    });

    const response = await axios.post('https://www.paytr.com/odeme/api/get-token', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (response.data.status === 'success') {
      // Token'ı in-memory olarak sakla
      paymentStatuses[orderNumber] = 'TOKEN_CREATED';
      res.json({ success: true, token: response.data.token });
    } else {
      console.error('PayTR token hatası:', response.data.reason);
      res.status(400).json({ success: false, error: response.data.reason || 'Ödeme başlatılamadı' });
    }
  } catch (error) {
    console.error('PayTR token oluşturulamadı:', error);
    res.status(500).json({ success: false, error: 'Ödeme başlatılamadı' });
  }
};

// PayTR callback (bildirim URL)
export const handleCallback = async (req: Request, res: Response) => {
  try {
    const { merchant_oid, status, total_amount, hash } = req.body;

    // Hash doğrulama
    const hashStr = `${merchant_oid}${PAYTR_MERCHANT_SALT}${status}${total_amount}`;
    const expectedHash = crypto
      .createHmac('sha256', PAYTR_MERCHANT_KEY)
      .update(hashStr)
      .digest('base64');

    if (hash !== expectedHash) {
      console.error('PayTR hash doğrulaması başarısız');
      return res.send('PAYTR_HASH_MISMATCH');
    }

    // Sipariş durumunu in-memory güncelle
    const orderStatus = status === 'success' ? 'PAID' : 'CANCELLED';
    paymentStatuses[merchant_oid] = orderStatus;
    console.log(`Sipariş ${merchant_oid} durumu: ${orderStatus}`);

    // PayTR'ın beklediği yanıt
    res.send('OK');
  } catch (error) {
    console.error('PayTR callback hatası:', error);
    res.send('FAILED');
  }
};
