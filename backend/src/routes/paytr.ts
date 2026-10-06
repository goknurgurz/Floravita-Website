import { Router } from 'express';
import { createPaymentToken, handleCallback } from '../controllers/paytrController';

const router = Router();

// POST /api/paytr/create-token
router.post('/create-token', createPaymentToken);

// POST /api/paytr/callback (PayTR'den gelen bildirim)
router.post('/callback', handleCallback);

export default router;
