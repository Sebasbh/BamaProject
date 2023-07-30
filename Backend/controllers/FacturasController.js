import { Factura } from "../models/AllModels.js";

export const getAllFacturas = async (req, res) => {
  try {
    const factura = await Factura.find();
    res.status(200).json(factura);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFactura = async (req, res) => {
  try {
    const id = req.params.id;
    const factura = await Factura.findById(id);
    res.status(200).json(factura);
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const createFactura = async (req, res) => {
  try {
    const ultimoFactura = await Factura.findOne().sort({ numero_de_factura: -1 }).exec();
    const numeroFactura = ultimoFactura ? ultimoFactura.numero_de_factura + 1 : 1;

    const {
      empresa,
      fecha_de_factura,
      vencimiento,
      importe_IVA,
      total_factura,
      estado_factura,
      numero_de_pedido,
      numero_de_albaran,
      archivo_de_factura
    } = req.body;

  
    if (
      typeof importe_IVA !== 'number' ||
      importe_IVA <= 0 ||
      typeof total_factura !== 'number' ||
      total_factura <= 0
    ) {
      return res.status(400).json({ error: 'Los campos numéricos deben ser mayores que cero.' });
    }

    const facturaData = {
      numero_de_factura: numeroFactura,
      empresa,
      fecha_de_factura,
      vencimiento,
      importe_IVA,
      total_factura,
      estado_factura,
      numero_de_pedido,
      numero_de_albaran,
      archivo_de_factura
    };

    const factura = await Factura.create(facturaData);

    res.status(200).json({
      message: '¡Factura creada correctamente!',
      factura,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la factura. Por favor, inténtelo nuevamente.' });
  }
};


export const getNextFacturaNumber = async (req, res) => {
  try {
    const ultimoFactura = await Factura.findOne().sort({ numero_de_factura: -1 }).exec();
    const nextFacturaNumber = ultimoFactura ? ultimoFactura.numero_de_factura + 1 : 1;

    res.status(200).json({
      nextFacturaNumber
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
