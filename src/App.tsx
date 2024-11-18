import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Todo } from './types';
import './App.css';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Tüm todoları getir
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Sayfa yüklendiğinde todoları getir
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      try {
        const response = await fetch(`${API_URL}/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: input.trim() }),
        });
        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
        setInput('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todo.text, completed: !completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSave = async (id: number) => {
    if (editText.trim() !== '') {
      try {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        const response = await fetch(`${API_URL}/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: editText.trim(), completed: todo.completed }),
        });
        const updatedTodo = await response.json();
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
        setEditingId(null);
        setEditText('');
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo List
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '10px' }}>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Yeni görev ekle"
              variant="outlined"
              size="small"
            />
            <Button type="submit" variant="contained" color="primary">
              Ekle
            </Button>
          </form>
        </Paper>

        <Paper elevation={3}>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} divider>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id, todo.completed)}
                  color="primary"
                />
                {editingId === todo.id ? (
                  <TextField
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    variant="outlined"
                    size="small"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSave(todo.id);
                      }
                    }}
                  />
                ) : (
                  <ListItemText
                    primary={todo.text}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  />
                )}
                <ListItemSecondaryAction>
                  {editingId === todo.id ? (
                    <IconButton
                      edge="end"
                      aria-label="save"
                      onClick={() => handleSave(todo.id)}
                    >
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(todo)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
