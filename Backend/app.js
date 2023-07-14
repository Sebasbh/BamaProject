import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import blogRoutes from './routes/routes.js';
import albaranesRoutes from './routes/albaranRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/clientes', blogRoutes);
app.use('/albaranes', albaranesRoutes);

try {
  await db.authenticate();
  console.log('Conexión exitosa a la base de datos');
} catch (error) {
  console.log(`Error de conexión: ${error}`);
}

app.listen(8000, () => {
  console.log('Server is up and running at http://localhost:8000/');
});
/*
import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import router from './routes/routes.js'
//import PedidoRouter from './routes/PedidoRoutes.js';
//import FacturaRouter from './routes/FacturasRoutes.js';
import albaranesRoutes from './routes/albaranRoutes.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

console.log('Debug: El archivo app.js se está ejecutando.');

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', router);
app.use('/pedidos', PedidoRouter)
app.use('/facturas', FacturaRouter);
app.use('/albaranes', albaranesRoutes);
app.use('')

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Error interno del servidor' });
});

app.listen(8000, () => {
  console.log('Server UP running at http://localhost:8000/');
});*/