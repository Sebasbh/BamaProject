//routes.js:
import express from 'express';
import { iniciarSesion } from '../controllers/UserController.js';

const router = express.Router();

console.log('Debug: El archivo routes.js se está ejecutando.');

// Ruta para el controlador de inicio de sesión
router.post('/user/login', iniciarSesion);

router.get('/', (req, res) => {
  console.log('Debug: La ruta GET / fue solicitada.');
  res.status(200).json({ mensaje: '¡Bienvenido a la API!' });
});

export default router;