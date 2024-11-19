import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  user: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
