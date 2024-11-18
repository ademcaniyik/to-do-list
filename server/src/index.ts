import express from 'express';
import cors from 'cors';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

interface Todo extends RowDataPacket {
    id: number;
    text: string;
    completed: boolean;
    created_at: Date;
}

const app = express();
app.use(cors());
app.use(express.json());

// MySQL bağlantı havuzu oluştur
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_list',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tüm todoları getir
app.get('/api/todos', async (req, res) => {
    try {
        const [rows] = await pool.query<Todo[]>('SELECT * FROM todos ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Yeni todo ekle
app.post('/api/todos', async (req, res) => {
    const { text } = req.body;
    try {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO todos (text, completed) VALUES (?, ?)',
            [text, false]
        );
        const [newTodo] = await pool.query<Todo[]>('SELECT * FROM todos WHERE id = ?', [result.insertId]);
        res.status(201).json(newTodo[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Todo güncelle
app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    try {
        await pool.query<ResultSetHeader>(
            'UPDATE todos SET text = ?, completed = ? WHERE id = ?',
            [text, completed, id]
        );
        const [updatedTodo] = await pool.query<Todo[]>('SELECT * FROM todos WHERE id = ?', [id]);
        res.json(updatedTodo[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Todo sil
app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query<ResultSetHeader>('DELETE FROM todos WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
