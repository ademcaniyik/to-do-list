import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  userId: mongoose.Schema.Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
