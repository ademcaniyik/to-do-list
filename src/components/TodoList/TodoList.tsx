import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error.main';
      case 'medium':
        return 'warning.main';
      case 'low':
        return 'success.main';
      default:
        return 'text.primary';
    }
  };

  if (todos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Henüz görev eklenmemiş
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ mt: 2 }}>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggle(todo._id)}
              color="primary"
            />
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                  }}
                >
                  {todo.text}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ color: getPriorityColor(todo.priority) }}
                  >
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} öncelik
                  </Typography>
                  {' | '}
                  <Typography variant="body2" component="span">
                    {todo.category}
                  </Typography>
                  {' | '}
                  <Typography variant="body2" component="span">
                    Bitiş: {formatDate(todo.dueDate)}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(todo)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(todo._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
