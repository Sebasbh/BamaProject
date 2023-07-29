import { Albaran } from '../models/AllModels.js';
import path from 'path';
import fs from 'fs';

// Mostrar todos los Albaranes
const getAllAlbaranes = async (req, res) => {
  try {
    const albaranes = await Albaran.find()
    res.status(200).json(albaranes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mostrar un Albaran
const getAlbaran = async (req, res) => {
  try {
    const { id } = req.params;
    const albaran = await Albaran.findById(id);
    res.json(albaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un albaran


 const createAlbaran = async (req, res) => {
  try {
    console.log('Estamos dentro de createAlbaran!')
    const ultimoAlbaran = await Albaran.findOne().sort({ numero_de_albaran: -1 }).exec();
    const numeroAlbaran = ultimoAlbaran ? ultimoAlbaran.numero_de_albaran + 1 : 1;

    // Convertir la cadena JSON en un objeto JavaScript
    const albaranData = JSON.parse(req.body.albaranData);

    const { empresa, importe, numero_de_pedido, archivo_de_entrega } = albaranData;
    const { originalname, filename } = req.file;
    const filepath = filename;
    console.log(filepath)
    // Validar los campos requeridos
    if (!empresa || !importe || !numero_de_pedido) {
      return res.status(400).json({ error: 'Cliente, importe y pedido son campos requeridos.' });
    }

    // Validar el formato del importe
    if (typeof importe !== 'number' || importe <= 0) {
      return res.status(400).json({ error: 'El importe debe ser un número mayor que cero.' });
    }

    const isApproved = albaranData.isApproved;

    const newAlbaran = {
      numero_de_albaran: numeroAlbaran,
      fecha_albaran: new Date(),
      empresa,
      importe,
      numero_de_pedido,
      archivo_de_entrega,
      estado: isApproved ? 'Firmado' : 'No firmado',
      filePath: filepath
    };

    console.log(newAlbaran)

    const albaran = await Albaran.create(newAlbaran);

    res.status(200).json({
      message: "¡Albaran creado correctamente!",
      albaran
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el albaran. Por favor, inténtelo nuevamente.' });
  }
};

const getFileAlbaran = (req, res) => {
  console.log('DEntro!')
  //sacar el parametro de la url
  const file = req.params.file;

  // montar el path real de la imagen

  const filepath = "./uploads/albaranes/" + file;

  console.log(file)

  //comprobar que existe la imagen

  fs.stat(filepath, (error, exists) => {
    if (!exists)
      return res.status(404).send({
        status: "error",
        message: "no existe la imagen",
      });

    //devolver file
    return res.sendFile(path.resolve(filepath));
  });
};



// Obtener el próximo número de albaran
const getNextAlbaranNumber = async (req, res) => {
  try {
    const ultimoAlbaran = await Albaran.findOne().sort({ numero_de_albaran: -1 }).exec();
    const nextAlbaranNumber = ultimoAlbaran ? ultimoAlbaran.numero_de_albaran + 1 : 1;

    res.status(200).json({
      nextAlbaranNumber
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Actualizar un Albaran
const updateAlbaran = async (req, res) => {
  try {
    const { id } = req.params;
    await Albaran.updateOne({ _id: id }, req.body);
    res.json({ message: 'Albarán actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un Albaran
const deleteAlbaran = async (req, res) => {
  try {
    const { id } = req.params;
    await Albaran.deleteOne({ _id: id });
    res.json({ message: 'Albarán eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllAlbaranes,
  getAlbaran,
  createAlbaran,
  updateAlbaran,
  deleteAlbaran,
  getNextAlbaranNumber,
  getFileAlbaran
};