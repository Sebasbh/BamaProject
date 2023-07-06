import PedidoModel from '../models/PedidoModel.js';

const crearPedido = async (req, res, next) => {
  try {
    const { numero, fecha, cliente, importe } = req.body;

    const existePedido = await PedidoModel.exists({ numero });
    if (existePedido) {
      return res.status(400).json({ success: false, error: 'El número de pedido ya existe' });
    }

    const pedido = await PedidoModel.create({
      numero,
      fecha,
      cliente,
      importe,
    });

    res.status(201).json({ success: true, data: pedido });
  } catch (err) {
    next(err);
  }
};

const obtenerPedidos = async (req, res, next) => {
  try {
    const pedidos = await PedidoModel.find().populate('cliente');
    res.status(200).json({ success: true, data: pedidos });
  } catch (err) {
    next(err);
  }
};

const obtenerPedido = async (req, res, next) => {
  try {
    const pedido = await PedidoModel.findById(req.params.id).populate('cliente');
    if (!pedido) {
      return next(new Error('Pedido no encontrado'));
    }
    res.status(200).json({ success: true, data: pedido });
  } catch (err) {
    next(err);
  }
};

const actualizarPedido = async (req, res, next) => {
  try {
    const pedido = await PedidoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pedido) {
      return next(new Error('Pedido no encontrado'));
    }
    res.status(200).json({ success: true, data: pedido });
  } catch (err) {
    next(err);
  }
};

const borrarPedido = async (req, res, next) => {
  try {
    const pedido = await PedidoModel.deleteOne({ _id: req.params.id });
    if (pedido.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

export {
  crearPedido,
  obtenerPedidos,
  obtenerPedido,
  actualizarPedido,
  borrarPedido,
};
