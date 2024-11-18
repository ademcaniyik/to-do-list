import { Router } from 'express';
import { getTodos, addTodo } from '../controllers/todoController';

const router = Router();

router.get('/', getTodos);
router.post('/', addTodo);

export default router;
