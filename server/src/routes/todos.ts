import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import Todo from '../models/Todo';

const router = express.Router();

// Get all todos
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    console.log('Getting todos for user:', userId);
    const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error('Error getting todos:', err);
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : String(err) });
  }
});

// Create todo
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = (req as any).user.id;

    console.log('Creating todo - Request body:', req.body);
    console.log('Creating todo - User ID:', userId);

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({
      title,
      description,
      user: userId,
      completed: false
    });

    console.log('Todo before save:', JSON.stringify(todo, null, 2));

    const savedTodo = await todo.save();
    console.log('Todo saved successfully:', JSON.stringify(savedTodo, null, 2));
    
    res.json(savedTodo);
  } catch (err) {
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
});

// Update todo
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = (req as any).user.id;

    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check todo belongs to user
    if (todo.user.toString() !== userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete todo
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check todo belongs to user
    if (todo.user.toString() !== (req as any).user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await todo.deleteOne();
    res.json({ message: 'Todo removed' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle todo completion
router.put('/:id/toggle-complete', auth, async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check todo belongs to user
    if (todo.user.toString() !== (req as any).user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error('Error toggling todo completion:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
