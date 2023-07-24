import express from 'express'
import { createCliente, deleteCliente, getAllClientes, getCliente, updateCliente } from '../controllers/ClientesController.js'

const ClienteRouter = express.Router()

ClienteRouter.get('/', getAllClientes)
ClienteRouter.get('/:id', getCliente)
ClienteRouter.post('/', createCliente)
ClienteRouter.put('/:id', updateCliente)
ClienteRouter.delete('/:id', deleteCliente)

export default ClienteRouter;