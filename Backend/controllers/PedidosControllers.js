import { Pedido } from "../models/AllModels.js";

// Métodos para el CRUD de pedido

// Mostrar todos los Pedido
export const getAllPedidos = async (req, res) => {
   try {
      const pedido = await Pedido.find();
      res.status(200).json(pedido);
      console.log(pedido)
   } catch (error) {
      res.json({ message: error.message });
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
      await Pedido.create(req.body);
      res.status(200).json({
         message: "¡Pedido creado correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
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