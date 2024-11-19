import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TodoFilters as TodoFiltersType } from '../types/todo';

interface TodoFiltersProps {
  filters: TodoFiltersType;
  onFilterChange: (filters: TodoFiltersType) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (field: keyof TodoFiltersType) => (
    event: SelectChangeEvent
  ) => {
    onFilterChange({
      ...filters,
      [field]: event.target.value,
    });
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          onChange={handleChange('status')}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sortBy}
          onChange={handleChange('sortBy')}
          label="Sort By"
        >
          <MenuItem value="createdAt">Created Date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Order</InputLabel>
        <Select
          value={filters.sortOrder}
          onChange={handleChange('sortOrder')}
          label="Order"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TodoFilters;
