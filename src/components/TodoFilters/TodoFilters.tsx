import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { TodoFiltersType } from '../../types';

interface TodoFiltersProps {
  filters: TodoFiltersType;
  onFilterChange: (filters: TodoFiltersType) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (field: keyof TodoFiltersType, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        label="Ara"
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
        size="small"
      />

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Öncelik</InputLabel>
        <Select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          label="Öncelik"
        >
          <MenuItem value="">Tümü</MenuItem>
          <MenuItem value="low">Düşük</MenuItem>
          <MenuItem value="medium">Orta</MenuItem>
          <MenuItem value="high">Yüksek</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Kategori</InputLabel>
        <Select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          label="Kategori"
        >
          <MenuItem value="">Tümü</MenuItem>
          <MenuItem value="work">İş</MenuItem>
          <MenuItem value="personal">Kişisel</MenuItem>
          <MenuItem value="shopping">Alışveriş</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Durum</InputLabel>
        <Select
          value={filters.completed}
          onChange={(e) => handleFilterChange('completed', e.target.value)}
          label="Durum"
        >
          <MenuItem value="">Tümü</MenuItem>
          <MenuItem value="completed">Tamamlandı</MenuItem>
          <MenuItem value="active">Aktif</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sıralama</InputLabel>
        <Select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          label="Sıralama"
        >
          <MenuItem value="">Varsayılan</MenuItem>
          <MenuItem value="dueDate">Bitiş Tarihi</MenuItem>
          <MenuItem value="priority">Öncelik</MenuItem>
          <MenuItem value="text">Metin</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sıralama Yönü</InputLabel>
        <Select
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
          label="Sıralama Yönü"
        >
          <MenuItem value="asc">Artan</MenuItem>
          <MenuItem value="desc">Azalan</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TodoFilters;
