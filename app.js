import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Backend Aroma Rock Café ☕🚀');
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});