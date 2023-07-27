import { Factura } from "../models/AllModels.js";

// Métodos para el CRUD de factura

// Mostrar todos las Facturas
export const getAllFacturas  = async (req, res) => {
   try {
      const factura = await Factura.find();
      res.status(200).json(factura);
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Mostrar una factura
export const getfacturas = async (req, res) => {
   try {
      const id = req.params.id;
      const factura = await Factura.findById(id);
      res.status(200).json(factura);
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Crear un factura
export const createFactura = async (req, res) => {
   try {

      const ultimoFactura = await Factura.findOne().sort({ numero_de_factura: -1 }).exec();
      const numeroFactura = ultimoFactura ? ultimoFactura.numero_de_factura + 1 : 1;

       /*const { empresa, fecha_de_factura, vencimiento, base_imponible, tipo_de_IVA,
         importe_IVA, total_factura, estado_factura,fecha_de_cobro, numero_de_pedido,numero_de_Factura } = req.body;

      // Validar los campos requeridos
    if (!empresa || !fecha_de_factura || !vencimiento || !base_imponible || !tipo_de_IVA 
      || !importe_IVA || !total_factura || !estado_factura || !fecha_de_cobro || !numero_de_pedido || !numero_de_albaran) {
      return res.status(400).json({ error: 'empresa, fecha_de_factura, etc y pedido son campos requeridos.' });
    }

    // Validar el formato del importe
    if (typeof total_factura !== 'number' || total_factura <= 0) {
      return res.status(400).json({ error: 'El importe debe ser un número mayor que cero.' });
    }
    const isApproved = req.body.isApproved;
    
    const facturaData = {
      numero_de_factura: numeroFactura,
      empresa,
      fecha_de_factura: new Date(),
      vencimiento,
      base_imponible,
      tipo_de_IVA,
      importe_IVA,
      total_factura,
      estado_factura,
      fecha_de_cobro,
      numero_de_pedido,
      numero_de_albaran,
      archivo_de_entrega,
    };*/

    //const factura = await Factura.create(facturaData);

    await  Factura.create(req.body)
    res.status(200).json({
       message: "¡Factura creado correctamente!", Factura
    });
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Error al crear el factura. Por favor, inténtelo nuevamente.' });
 }

};

// Obtener el próximo número de albaran
export const getNextFacturaNumber = async (req, res) => {
   try {
     const ultimoFactura = await Factura.findOne().sort({ numero_de_factura: -1 }).exec();
     const nextFacturaNumber = ultimoFactura ? ultimoFactura.numero_de_Factura + 1 : 1;
 
     res.status(200).json({
       nextFacturaNumber
     });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };


// Actualizar un factura
export const updateFactura = async (req, res) => {
   try {
      const id = req.params.id;
      await Factura.updateOne({ _id: id }, req.body);
      res.status(200).json({
         message: "¡Factura actualizada correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Eliminar un factura
export const deleteFactura = async (req, res) => {
   try {
      const id = req.params.id;
      await Factura.deleteOne({ _id: id });
      res.status(200).json({
         message: "¡Factura eliminada correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};
