import { Albaran } from '../models/AllModels.js';

// Mostrar todos los Albaranes
const getAllAlbaranes = async (req, res) => {
  try {
    /*const albaranes = await Albaran.find().populate('cliente_id', 'empresa');*/
    //res.json(albaranes);
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

// Crear un Albaran
const createAlbaran = async (req, res) => {
  try {
    const albaran = await Albaran.create(req.body);
    res.status(201).json({ message: 'Albarán creado correctamente' });
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
  deleteAlbaran
};
