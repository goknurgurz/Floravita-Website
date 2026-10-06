import { Router } from 'express';
import { getTestimonials } from '../controllers/testimonialController';

const router = Router();

// GET /api/testimonials
router.get('/', getTestimonials);

export default router;
