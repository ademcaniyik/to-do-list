import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ChangePassword from './components/Auth/ChangePassword';
import { Todo, TodoFilters as TodoFiltersType } from './types/todo';
import { TodoFormData } from './components/TodoForm';
import { todoAPI, authAPI } from './api/api';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [filters, setFilters] = useState<TodoFiltersType>({
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setTodos([]);
  };

  const fetchTodos = async () => {
    try {
      const response = await todoAPI.getAll();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      if ((error as any)?.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleAddTodo = async (todoData: TodoFormData) => {
    try {
      console.log('Adding todo:', todoData);
      const response = await todoAPI.create(todoData);
      console.log('Server response:', response.data);
      setTodos(prevTodos => {
        console.log('Previous todos:', prevTodos);
        const newTodos = [...prevTodos, response.data];
        console.log('New todos:', newTodos);
        return newTodos;
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string, title: string, description?: string) => {
    try {
      const response = await todoAPI.update(id, { title, description });
      setTodos(prev => prev.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoAPI.delete(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const response = await todoAPI.toggleComplete(id);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await authAPI.changePassword(oldPassword, newPassword);
    } catch (error) {
      throw new Error('Failed to change password');
    }
  };

  const filteredAndSortedTodos = [...todos]
    .filter(todo => {
      if (filters.status === 'active') return !todo.completed;
      if (filters.status === 'completed') return todo.completed;
      return true;
    })
    .sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      return aValue > bValue ? order : -order;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router future={{ 
        v7_relativeSplatPath: true,
        v7_startTransition: true 
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Todo App
              </Typography>
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/"
                  >
                    Todos
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/change-password"
                  >
                    Change Password
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>

        <Container>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Box sx={{ mt: 4 }}>
                    <TodoForm onSubmit={handleAddTodo} />
                    <TodoFilters filters={filters} onFilterChange={setFilters} />
                    <TodoList
                      todos={filteredAndSortedTodos}
                      onUpdateTodo={handleUpdateTodo}
                      onDeleteTodo={handleDeleteTodo}
                      onToggleComplete={handleToggleComplete}
                    />
                  </Box>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/change-password"
              element={
                isAuthenticated ? (
                  <ChangePassword onChangePassword={handleChangePassword} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
