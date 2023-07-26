import express from 'express'
import { createPedido, deletePedido, getAllPedidos, getPedidos, updatePedido, } from '../controllers/PedidosControllers.js'
import auth from "../middleware/auth.js";

const PedidoRouter = express.Router()

PedidoRouter.get('/', auth, getAllPedidos)
PedidoRouter.get('/:id', auth,  getPedidos)
PedidoRouter.post('/', auth, createPedido)
PedidoRouter.put('/:id', auth, updatePedido)
PedidoRouter.delete('/:id', auth, deletePedido)

export default PedidoRouter;

