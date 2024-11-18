# Todo List Application

A full-stack Todo List application built with React, TypeScript, Express.js, and MySQL.

## Features

- Create, Read, Update, and Delete todos
- Edit existing todos
- Mark todos as completed
- Persistent storage with MySQL database
- Modern UI with Material-UI
- Type-safe with TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [XAMPP](https://www.apachefriends.org/) (for MySQL database)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ademcaniyik/to-do-list.git
cd todo-list
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up the database:
- Start XAMPP and ensure MySQL service is running
- Open phpMyAdmin (http://localhost/phpmyadmin)
- Create a new database named 'todo_list'
- Import the database schema from `server/database.sql`

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```
The backend will run on http://localhost:3001

2. In a new terminal, start the frontend:
```bash
cd ..  # Go back to root directory
npm start
```
The application will open in your browser at http://localhost:3000

## Usage

- **Adding a Todo**: Enter your task in the input field and click "Add" or press Enter
- **Editing a Todo**: Click the edit (pencil) icon, make your changes, and click save
- **Completing a Todo**: Click the checkbox next to the todo
- **Deleting a Todo**: Click the delete (trash) icon

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Material-UI
  - Fetch API

- **Backend**:
  - Express.js
  - TypeScript
  - MySQL2
  - CORS

- **Database**:
  - MySQL

## Project Structure

```
todo-list/
├── src/                   # Frontend source files
│   ├── App.tsx           # Main application component
│   └── types.ts          # TypeScript interfaces
├── server/               # Backend source files
│   ├── src/
│   │   └── index.ts      # Express server setup
│   ├── database.sql      # Database schema
│   └── package.json      # Backend dependencies
└── package.json          # Frontend dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Name - [@ademcaniyik](https://github.com/ademcaniyik)

Project Link: [https://github.com/ademcaniyik/to-do-list](https://github.com/ademcaniyik/todo-list)
