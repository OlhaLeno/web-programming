const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books');
const cartRouter = require('./routes/cart-router');
const app = express();
const PORT = 5000;

app.use('/static/media', express.static('static/media'));

app.use(cors({
  origin: 'http://localhost:3000', // Вказуємо точний домен клієнта
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());


app.use('/api', booksRoutes);
app.use('/api', cartRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
