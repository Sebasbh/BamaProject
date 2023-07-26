import { Cliente } from "../models/AllModels.js";

// Mostrar todos los clientes con filtros
export const getAllClientes = async (req, res) => {
  try {
    const { consulta, formaPago, activo } = req.query;
    
    // Filtros iniciales
    const filters = {};

    if (consulta) {
      // Agregar filtro de consulta para empresa y CIF
      filters.$or = [
        { empresa: { $regex: consulta, $options: "i" } },
        { CIF: { $regex: consulta, $options: "i" } }
      ];
    }

    if (formaPago && formaPago !== 'all') {
      // Agregar filtro de forma de pago
      filters.forma_de_pago = formaPago;
    }

    if (activo !== undefined && activo !== 'all') {
      // Agregar filtro de estado activo
      filters.activo = activo === 'true';
    }

    const clientes = await Cliente.find(filters);
    res.status(200).json(clientes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// // Métodos para el CRUD de clientes

// // Mostrar todos los clientes
// export const getAllClientes = async (req, res) => {
//    try {
//       const clientes = await Cliente.find();
//       res.status(200).json(clientes);
//    } catch (error) {
//       res.json({ message: error.message });
//    }
// };

// Mostrar un cliente
export const getCliente = async (req, res) => {
   try {
      const id = req.params.id;
      const cliente = await Cliente.findById(id);
      res.status(200).json(cliente);
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Crear un cliente
export const createCliente = async (req, res) => {
   try {
      await Cliente.create(req.body);
      res.status(200).json({
         message: "¡Cliente creado correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
   try {
      const id = req.params.id;
      await Cliente.updateOne({ _id: id }, req.body);
      res.status(200).json({
         message: "¡Cliente actualizado correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
   try {
      const id = req.params.id;
      await Cliente.deleteOne({ _id: id });
      res.status(200).json({
         message: "¡Cliente eliminado correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};
