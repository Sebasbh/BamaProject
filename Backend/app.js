//app.js:
import express, { Router } from 'express';
import cors from 'cors';
import db from './database/db.js';
import router  from './routes/routes.js'

const app = express();

// Configurar opciones CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Especifica el origen permitido
  optionsSuccessStatus: 200 // Permite que el navegador interprete correctamente el código de estado 200
};

console.log('Debug: El archivo app.js se está ejecutando.');

app.use(cors(corsOptions));
app.use(express.json());

// Agrega las rutas
app.use('/', router);

app.listen(8000, () => {
  console.log('Server UP running at http://localhost:8000/');
});