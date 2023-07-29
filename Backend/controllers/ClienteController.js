import { Cliente } from "../models/AllModels.js";

export const getAllClientes = async (req, res) => {
   try {
      const { consulta, formaPago, activo } = req.query;

      const filters = {};
      if (consulta) {
         filters.$or = [
            { empresa: { $regex: consulta, $options: "i" } },
            { CIF: { $regex: consulta, $options: "i" } }
         ];
      }

      if (formaPago && formaPago !== 'all') {
         filters.forma_de_pago = formaPago;
      }

      if (activo !== undefined && activo !== 'all') {
         filters.activo = activo === 'true';
      }

      const clientes = await Cliente.find(filters);
      res.status(200).json(clientes);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getCliente = async (req, res) => {
   try {
      const id = req.params.id
      await Cliente.findById({ _id: id }).then((cliente) => {
         res.status(200).json(cliente)
      })
   } catch (error) {
      res.json({ message: error.message })
   }
}



export const createCliente = async (req, res) => {
   try {
      await Cliente.create(req.body)
      res.status(200).json({
         "message": "¡Cliente creado correctamente"
      })
   } catch (error) {
      res.json({ message: error.message })
   }
}


export const updateCliente = async (req, res) => {
   try {
      const id = req.params.id

      await Cliente.updateOne({ _id: id }, req.body).then(res => {
         console.log(res)
      })
      res.status(200).json({
         "message": "¡Cliente actualizado correctamente!"
      })
   } catch (error) {
      res.json({ message: error.message })
   }
}

export const deleteCliente = async (req, res) => {
   try {
      const id = req.params.id
      await Cliente.deleteOne({ _id: id }).then(res => {
         console.log(res)
      })
      res.status(200).json({
         "message": "¡Cliente eliminado correctamente!"
      })

   } catch (error) {
      res.json({ message: error.message })
   }
}
