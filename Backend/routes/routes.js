//routes.js:

//const check = require("../middlewares/auth");
import express from 'express';
import { iniciarSesion, registrarUsuario } from '../controllers/UserController.js';

const router = express.Router();

console.log('Debug: El archivo routes.js se está ejecutando.');

// Ruta para el controlador de inicio de sesión
router.post('/user/login', iniciarSesion);

router.get('/', (req, res) => {
  console.log('Debug: La ruta GET / fue solicitada.');
  res.status(200).json({ mensaje: '¡Bienvenido a la API!' });
});
/*
router.get('/albaranes', getAllAlbaranes)
router.get('/:id', getAlbaran)
router.post('/', createAlbaran)
router.put('/:id', updateAlbaran)
router.delete('/:id', deleteAlbaran)*/




router.post('/user/register', registrarUsuario);

export default router;