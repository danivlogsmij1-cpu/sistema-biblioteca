const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/libros', bookRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

module.exports = app;