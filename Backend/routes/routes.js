import express from 'express';
import { iniciarSesion, registrarUsuario } from '../controllers/UserController.js';

const router = express.Router();



router.post('/user/login', iniciarSesion);

router.get('/', (req, res) => {
 
  res.status(200).json({ mensaje: '¡Bienvenido a la API!' });
});

router.post('/user/register', registrarUsuario);

export default router;