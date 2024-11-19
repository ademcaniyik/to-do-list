import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Checkbox,
  ListItemIcon,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, title: string, description?: string) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
  onToggleComplete: (id: string) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
  onToggleComplete
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleSaveEdit = async (id: string) => {
    if (editTitle.trim()) {
      await onUpdateTodo(id, editTitle, editDescription.trim() || undefined);
      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  if (todos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        No todos found. Add one above!
      </Box>
    );
  }

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo._id}
          dense
          divider
          sx={{
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo._id)}
            />
          </ListItemIcon>
          {editingId === todo._id ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <TextField
                fullWidth
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                size="small"
              />
              <TextField
                fullWidth
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                size="small"
                multiline
                rows={2}
              />
            </div>
          ) : (
            <ListItemText
              primary={todo.title}
              secondary={todo.description}
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.secondary' : 'text.primary',
              }}
            />
          )}
          <ListItemSecondaryAction>
            {editingId === todo._id ? (
              <>
                <IconButton
                  edge="end"
                  onClick={() => handleSaveEdit(todo._id)}
                  disabled={!editTitle.trim()}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton edge="end" onClick={handleCancelEdit}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton edge="end" onClick={() => handleStartEdit(todo)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => onDeleteTodo(todo._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
