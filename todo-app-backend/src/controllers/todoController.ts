import { Request, Response } from 'express';
import Todo from '../models/todoModel';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
      completed: completed || false,
      userId: req.userId,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
