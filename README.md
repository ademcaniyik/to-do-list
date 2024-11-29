# Todo List Application

A full-stack Todo List application with user authentication, built using React, TypeScript, Express.js, and MongoDB.

## Developer

- **Name:** Ademcan
- **Email:** [ademcaniyik7@gmail.com](mailto:ademcaniyik7@gmail.com)
- **GitHub:** [ademcan](https://github.com/ademcaniyik)

## Features

- 🔐 User Authentication (JWT)
- 📝 Create, Read, Update, Delete Todos
- 🔍 Filter and Sort Todos
- 💫 Real-time Updates
- 🎨 Modern UI with Material-UI & Chakra UI
- 🔒 Secure Password Management
- 📱 Responsive Design

## Tech Stack

### Frontend

- React
- TypeScript
- Material-UI
- Chakra UI
- React Router v6
- Axios

### Backend

- Express.js
- MongoDB with Mongoose
- JWT Authentication
- TypeScript
- CORS middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd to-do-list
```

1. Install frontend dependencies:

```bash
npm install
```

1. Install backend dependencies:

```bash
cd server
npm install
```

1. Create .env files:

Frontend (.env):

```env
REACT_APP_API_URL=http://localhost:3002
```

Backend (server/.env):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo_db
JWT_SECRET=your_jwt_secret_key
PORT=3002
```

## Running the Application

1. Start MongoDB service

1. Start the backend server:

```bash
cd server
npm start
```

1. Start the frontend application (in a new terminal):

```bash
cd ..
npm start
```

The application will be available at:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3002](http://localhost:3002)

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/change-password` - Change password

### Todos

- GET `/api/todos` - Get all todos for logged in user
- POST `/api/todos` - Create new todo
- PUT `/api/todos/:id` - Update todo
- DELETE `/api/todos/:id` - Delete todo

## Security Features

- JWT based authentication
- Password hashing
- Protected routes
- CORS configuration
- Environment variables
- Input validation

## Project Structure

```tree
to-do-list/
├── src/                    # Frontend source files
│   ├── components/        # React components
│   ├── api/              # API integration
│   └── types/            # TypeScript types
├── server/                # Backend source files
│   ├── routes/           # API routes
│   ├── models/           # MongoDB models
│   └── middleware/       # Express middleware
└── public/               # Static files
```

## Recent Updates

### 2024-01-09
- 🔄 Added task completion status tracking
- 📅 Implemented due date functionality for tasks
- 🎨 Enhanced UI with new color schemes and animations
- 🔍 Added search functionality for tasks
- 📱 Improved mobile responsiveness
- 🔒 Enhanced security features
- 🐛 Fixed various bugs and improved performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
