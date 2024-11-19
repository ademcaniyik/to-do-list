const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
require('dotenv').config();

const app = express();

// CORS yapılandırması
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Middleware
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
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
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
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
