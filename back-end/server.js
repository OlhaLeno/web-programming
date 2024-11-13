const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/books');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use('/api', booksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
