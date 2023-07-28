import { Factura } from "../models/AllModels.js";

// Métodos para el CRUD de factura

// Mostrar todos las Facturas
export const getAllFacturas = async (req, res) => {
  try {
    const factura = await Factura.find();
    res.status(200).json(factura);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar una factura
export const getFactura = async (req, res) => {
  try {
    const id = req.params.id;
    const factura = await Factura.findById(id);
    res.status(200).json(factura);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear facturas
export const createFactura = async (req, res) => {
  try {
    const ultimoFactura = await Factura.findOne().sort({ numero_de_factura: -1 }).exec();
    const numeroFactura = ultimoFactura ? ultimoFactura.numero_de_factura + 1 : 1;

    const {
      empresa,
      fecha_de_factura,
      vencimiento,
      base_imponible,
      tipo_de_IVA,
      importe_IVA,
      total_factura,
      numero_de_pedido,
      numero_de_albaran,
      archivo_de_factura,
    } = req.body;

    // Validate the required fields
    if (
      !empresa ||
      !fecha_de_factura ||
      !vencimiento ||
      !base_imponible ||
      !tipo_de_IVA ||
      !importe_IVA ||
      !total_factura ||
      !numero_de_pedido ||
      !numero_de_albaran ||
      !archivo_de_factura
    ) {
      return res.status(400).json({ error: 'empresa, fecha de factura, vencimiento, base imponible, tipo de IVA, importe IVA, total factura, numero de pedido, numero de albaran y archivo de factura son campos requeridos.' });
    }

    // Validate the format of numeric fields
    if (
      typeof base_imponible !== 'number' ||
      typeof importe_IVA !== 'number' ||
      typeof total_factura !== 'number' ||
      base_imponible <= 0 ||
      importe_IVA <= 0 ||
      total_factura <= 0
    ) {
      return res.status(400).json({ error: 'Los campos numéricos deben ser mayores que cero.' });
    }


    const facturaData = {
      numero_de_factura: numeroFactura,
      empresa,
      fecha_de_factura,
      vencimiento,
      base_imponible,
      tipo_de_IVA,
      importe_IVA,
      total_factura,
      fecha_de_cobro: null, // Set to null initially
      numero_de_pedido,
      numero_de_albaran,
      archivo_de_factura,
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




// Obtener el próximo número de Factura
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

