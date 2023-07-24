import { Pedido } from "../models/AllModels.js";
import { Cliente } from "../models/AllModels.js";

// Métodos para el CRUD de pedido

// Mostrar todos los pedidos con filtros y ordenamiento
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

// Mostrar un Pedido
export const getPedidos = async (req, res) => {
   try {
      const id = req.params.id;
      const pedido = await Pedido.findById(id);
      res.status(200).json(pedido);
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Crear un pedido
export const createPedido = async (req, res) => {
   try {
     const ultimoPedido = await Pedido.findOne().sort({ numero_de_pedido: -1 }).exec();
     const numeroPedido = ultimoPedido ? ultimoPedido.numero_de_pedido + 1 : 1;
 
     const { empresa, importe, archivo_adjunto } = req.body;
 
     // Validar los campos requeridos
     if (!empresa || !importe) {
       return res.status(400).json({ error: 'Empresa e importe son campos requeridos.' });
     }
 
     // Validar el formato del importe
     if (typeof importe !== 'number' || importe <= 0) {
       return res.status(400).json({ error: 'El importe debe ser un número mayor que cero.' });
     }
 
     const pedidoData = {
       numero_de_pedido: numeroPedido,
       fecha_de_pedido: new Date(),
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

// Obtener el próximo número de pedido
export const getNextPedidoNumber = async (req, res) => {
   try {
       const ultimoPedido = await Pedido.findOne().sort({ numero_de_pedido: -1 }).exec();
       const nextPedidoNumber = ultimoPedido ? ultimoPedido.numero_de_pedido + 1 : 1;

       res.status(200).json({
           nextPedidoNumber
       });
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

// Actualizar un pedido
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

// Eliminar un pedido
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


// Mostrar un cliente con sus pedidos
export const getClientePedidos = async (req, res) => {
   try {
     const id = req.params.id;
     const cliente = await Cliente.findById(id); // Utilizamos `await Cliente.findById()` para obtener el cliente por su ID
     if (!cliente) {
       return res.status(404).json({ message: 'Cliente no encontrado' });
     }
 
     const pedidos = await Pedido.find({ cliente_id: id }).populate('cliente_id'); // Utilizamos `await Pedido.find()` para obtener los pedidos del cliente por su ID
     res.json({ cliente: cliente, pedidos: pedidos });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };
 
