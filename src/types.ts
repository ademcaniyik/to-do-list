export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string;
}

export interface TodoFormData {
  text: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: Date | null;
  completed?: boolean;
}

export interface TodoFiltersType {
  search: string;
  priority: string;
  category: string;
  completed: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface LoginProps {
  setToken: (token: string) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export interface RegisterProps {
  setIsAuthenticated?: (value: boolean) => void;
}

export interface ChangePasswordProps {
  onChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
