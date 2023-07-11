import express from 'express'
import { createPedido, deletePedido, getAllPedidos, getPedidos, updatePedido } from '../controllers/PedidosControllers.js'

const PedidoRouter = express.Router()

PedidoRouter.get('/', getAllPedidos)
PedidoRouter.get('/:id', getPedidos)
PedidoRouter.post('/', createPedido)
PedidoRouter.put('/:id', updatePedido)
PedidoRouter.delete('/:id', deletePedido)

export default PedidoRouter;
