import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import router from './routes/routes.js';
import PedidoRouter from './routes/PedidoRoutes.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

console.log('Debug: El archivo app.js se está ejecutando.');

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', router);
app.use('/pedidos', PedidoRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Error interno del servidor' });
});

app.listen(8000, () => {
  console.log('Server UP running at http://localhost:8000/');
});
