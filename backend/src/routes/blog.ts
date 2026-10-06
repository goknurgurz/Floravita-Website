import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
} from '../controllers/blogController';

const router = Router();

// GET /api/blog
router.get('/', getAllPosts);

// GET /api/blog/category/:category
router.get('/category/:category', getPostsByCategory);

// GET /api/blog/:slug
router.get('/:slug', getPostBySlug);

export default router;
