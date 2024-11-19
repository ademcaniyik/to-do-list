import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export interface TodoFormData {
  title: string;
  description?: string;
}

export interface TodoFormProps {
  onSubmit: (data: TodoFormData) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await onSubmit({ 
        title, 
        description: description.trim() || undefined 
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!title.trim()}
        >
          Add Todo
        </Button>
      </Box>
    </Box>
  );
};

export default TodoForm;
