"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const auth_1 = __importDefault(require("./routes/auth"));
const todos_1 = __importDefault(require("./routes/todos"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS yapılandırması
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
// Middleware
app.use(express_1.default.json());
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
app.use('/api/auth', auth_1.default);
app.use('/api/todos', todos_1.default);
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
(0, db_1.connectDB)();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
