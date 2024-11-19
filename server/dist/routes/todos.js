"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const Todo_1 = __importDefault(require("../models/Todo"));
const router = express_1.default.Router();
// Get all todos
router.get('/', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        console.log('Getting todos for user:', userId);
        const todos = yield Todo_1.default.find({ user: userId }).sort({ createdAt: -1 });
        res.json(todos);
    }
    catch (err) {
        console.error('Error getting todos:', err);
        res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : String(err) });
    }
}));
// Create todo
router.post('/', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        console.log('Creating todo - Request body:', req.body);
        console.log('Creating todo - User ID:', userId);
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const todo = new Todo_1.default({
            title,
            description,
            user: userId,
            completed: false
        });
        console.log('Todo before save:', JSON.stringify(todo, null, 2));
        const savedTodo = yield todo.save();
        console.log('Todo saved successfully:', JSON.stringify(savedTodo, null, 2));
        res.json(savedTodo);
    }
    catch (err) {
        console.error('Detailed error creating todo:', err);
        if (err instanceof Error) {
            console.error('Error name:', err.name);
            console.error('Error message:', err.message);
            console.error('Error stack:', err.stack);
        }
        res.status(500).json({
            message: 'Server error',
            error: err instanceof Error ? {
                name: err.name,
                message: err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
            } : String(err)
        });
    }
}));
// Update todo
router.put('/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        let todo = yield Todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // Check todo belongs to user
        if (todo.user.toString() !== userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        todo = yield Todo_1.default.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        res.json(todo);
    }
    catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ message: 'Server error' });
    }
}));
// Delete todo
router.delete('/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield Todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // Check todo belongs to user
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        yield todo.deleteOne();
        res.json({ message: 'Todo removed' });
    }
    catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ message: 'Server error' });
    }
}));
// Toggle todo completion
router.put('/:id/toggle-complete', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield Todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // Check todo belongs to user
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        todo.completed = !todo.completed;
        yield todo.save();
        res.json(todo);
    }
    catch (err) {
        console.error('Error toggling todo completion:', err);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
