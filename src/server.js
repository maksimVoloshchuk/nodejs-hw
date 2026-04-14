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

// ✅ главный маршрут
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is working 🚀',
  });
});

// ✅ получить все заметки
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// ✅ получить заметку по id
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// ✅ тест ошибки
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// ❗ 404 (если маршрут не найден)
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

// ❗ обработка ошибок
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Server error',
  });
});

// запуск сервера
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});