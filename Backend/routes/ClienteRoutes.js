import express from 'express'
import { createCliente, deleteCliente, getAllClientes, getCliente, updateCliente } from '../controllers/ClienteController.js'
import auth from "../middleware/auth.js";

const ClienteRouter = express.Router()

ClienteRouter.get('/', auth, getAllClientes);
ClienteRouter.get('/:id', auth, getCliente)
ClienteRouter.post('/', auth, createCliente)
ClienteRouter.put('/:id', auth, updateCliente)
ClienteRouter.delete('/:id', auth ,deleteCliente)

export default ClienteRouter;