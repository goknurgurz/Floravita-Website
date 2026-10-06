import { Router } from 'express';
import { subscribeNewsletter } from '../controllers/newsletterController';

const router = Router();

// POST /api/newsletter
router.post('/', subscribeNewsletter);

export default router;
