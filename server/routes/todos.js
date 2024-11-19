const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// Tüm todoları getir
router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Yeni todo ekle
router.post('/', auth, async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text,
            completed: false,
            user: req.user.userId
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Todo güncelle
router.put('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.text = req.body.text || todo.text;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Todo sil
router.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
