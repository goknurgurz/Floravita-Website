import { Router } from 'express';
import {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
} from '../controllers/productController';

const router = Router();

// GET /api/products
router.get('/', getAllProducts);

// GET /api/products/featured
router.get('/featured', getFeaturedProducts);

// GET /api/products/category/:category
router.get('/category/:category', getProductsByCategory);

// GET /api/products/:slug
router.get('/:slug', getProductBySlug);

export default router;
