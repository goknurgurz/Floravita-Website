import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import productRoutes from './routes/products';
import blogRoutes from './routes/blog';
import orderRoutes from './routes/orders';
import paytrRoutes from './routes/paytr';
import testimonialRoutes from './routes/testimonials';
import newsletterRoutes from './routes/newsletter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Güvenlik middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100,
  message: 'Çok fazla istek gönderildi, lütfen sonra tekrar deneyin.',
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Loglama
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'FloraVita API',
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/paytr', paytrRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/newsletter', newsletterRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Hata:', err.message);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Sunucu hatası' : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`FloraVita API sunucusu port ${PORT} üzerinde çalışıyor`);
  console.log(`Ortam: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
