export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  status: 'all' | 'active' | 'completed';
  sortBy: 'createdAt' | 'title';
  sortOrder: 'asc' | 'desc';
}
