import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './db';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todos';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS yapılandırması
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Todo List API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      todos: '/api/todos',
      health: '/api/health'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path
  });
});

// MongoDB bağlantısı
connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
