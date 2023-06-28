//routes.jsx
import express from 'express'
import { getAllClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/ClienteController.js'
import { loginUser } from '../controllers/UsuarioController.js'
import { validateLogin } from '../middlewares/validationMiddleware.js'
const router = express.Router()

// Rutas para los clientes
router.get('/clientes', getAllClientes)
router.get('/clientes/:id', getCliente)
router.post('/clientes', createCliente)
router.put('/clientes/:id', updateCliente)
router.delete('/clientes/:id', deleteCliente)

// Ruta de inicio de sesión con validación
router.post('/login', validateLogin, loginUser);

export default router;