import express from 'express'
import { createPedido, deletePedido, getAllPedidos, getPedidos, updatePedido, getNextPedidoNumber } from '../controllers/PedidosControllers.js'

const PedidoRouter = express.Router()

PedidoRouter.get('/', getAllPedidos)
PedidoRouter.get('/next-number', getNextPedidoNumber)
PedidoRouter.get('/:id', getPedidos)
PedidoRouter.post('/', createPedido)
PedidoRouter.put('/:id', updatePedido)
PedidoRouter.delete('/:id', deletePedido)

export default PedidoRouter;

