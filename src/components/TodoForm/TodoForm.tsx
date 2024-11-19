import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { TodoFormData } from '../../types';

interface TodoFormProps {
  onAdd: (todo: TodoFormData) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !category.trim() || !dueDate) return;

    onAdd({
      text: text.trim(),
      priority,
      category: category.trim(),
      dueDate: new Date(dueDate),
      completed: false,
    });

    setText('');
    setPriority('medium');
    setCategory('');
    setDueDate('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        padding: 2
      }}
    >
      <TextField
        fullWidth
        label="Görev"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        required
      />

      <FormControl fullWidth>
        <InputLabel>Öncelik</InputLabel>
        <Select
          value={priority}
          label="Öncelik"
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        >
          <MenuItem value="low">Düşük</MenuItem>
          <MenuItem value="medium">Orta</MenuItem>
          <MenuItem value="high">Yüksek</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Kategori"
        value={category}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
        required
      />

      <TextField
        fullWidth
        label="Bitiş Tarihi"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Ekle
      </Button>
    </Box>
  );
};

export default TodoForm;
