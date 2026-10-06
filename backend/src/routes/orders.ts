import { Router } from 'express';
import { createOrder, getOrderByNumber } from '../controllers/orderController';

const router = Router();

// POST /api/orders
router.post('/', createOrder);

// GET /api/orders/:orderNumber
router.get('/:orderNumber', getOrderByNumber);

export default router;
