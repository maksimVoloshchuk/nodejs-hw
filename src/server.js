import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

// 📌 1. Главный маршрут (чтобы не было Not Found)
app.get('/', (req, res) => {
  res.json({
    message: 'Server is working 🚀'
  });
});

// 📌 2. Получить все заметки
app.get('/notes', (req, res) => {
  res.json({
    message: 'All notes'
  });
});

// 📌 3. Получить заметку по ID
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.json({
    message: `Retrieved note with ID: ${noteId}`
  });
});

// 📌 4. Тест ошибки
app.get('/test-error', (req, res) => {
  throw new Error('Test error');
});

// ❗ Middleware для несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found'
  });
});

// ❗ Middleware обработки ошибок
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Server error'
  });
});

// запуск сервера
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});