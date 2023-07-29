import { Pedido } from "../models/AllModels.js";
import { Cliente } from "../models/AllModels.js";

export const getAllPedidos = async (req, res) => {
  try {
    const { search, sortBy, sortOrder } = req.query;
    let query = Pedido.find();

    if (search) {
      query = query.find({
        $or: [
          { fecha_de_pedido: { $regex: search, $options: "i" } },
          { cliente_id: { $regex: search, $options: "i" } }
        ]
      });
    }

    if (sortBy && sortOrder) {
      query = query.sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
    }

    const pedidos = await query.exec();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPedidos = async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = await Pedido.findById(id);
    res.status(200).json(pedido);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createPedido = async (req, res) => {
  try {
    const { numero_de_pedido, fecha_de_pedido, empresa, importe, archivo_adjunto } = req.body;

    if (!numero_de_pedido || !fecha_de_pedido || !empresa || !importe) {
      return res.status(400).json({ error: 'Número de pedido, fecha de pedido, empresa e importe son campos requeridos.' });
    } if (isNaN(Date.parse(fecha_de_pedido))) {
      return res.status(400).json({ error: 'Fecha inválida.' });
    } if (typeof importe !== 'number' || importe <= 0) {
      return res.status(400).json({ error: 'El importe debe ser un número mayor que cero.' });
    }

    const pedidoData = {
      numero_de_pedido,
      fecha_de_pedido: new Date(fecha_de_pedido),
      empresa,
      importe,
      archivo_adjunto,
      estado: 'Abierto',
      total_facturado: 0,
      albaranes_id: [],
      facturas_id: []
    };

    const pedido = await Pedido.create(pedidoData);

    res.status(200).json({
      message: '¡Pedido creado correctamente!',
      pedido
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pedido. Por favor, inténtelo nuevamente.' });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const id = req.params.id;
    await Pedido.updateOne({ _id: id }, req.body);
    res.status(200).json({
      message: "¡Pedido actualizado correctamente!"
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deletePedido = async (req, res) => {
  try {
    const id = req.params.id;
    await Pedido.deleteOne({ _id: id });
    res.status(200).json({
      message: "¡Pedido eliminado correctamente!"
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getClientePedidos = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const pedidos = await Pedido.find({ cliente_id: id }).populate('cliente_id');
    res.json({ cliente: cliente, pedidos: pedidos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

