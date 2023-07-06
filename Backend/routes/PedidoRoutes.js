import express from 'express';
import { crearPedido, obtenerPedidos, obtenerPedido, actualizarPedido, borrarPedido } from '../controllers/PedidoController.js';

const PedidoRouter = express.Router();

PedidoRouter.route('/')
  .post(crearPedido)
  .get(obtenerPedidos);

PedidoRouter.route('/:id')
  .get(obtenerPedido)
  .put(actualizarPedido)
  .delete(borrarPedido);

export default PedidoRouter;
