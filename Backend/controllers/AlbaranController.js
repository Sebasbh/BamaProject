import { Albaran } from '../models/AllModels.js';
import multer from 'multer';
import path from 'path';
import express from 'express';


//Guardar con storage el archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Lo guarda en la carpeta uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only specific file types, if needed (e.g., accept only images)
  const allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });


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

// Crear un albaran
const createAlbaran = async (req, res) => {
  // The multer middleware should be placed inside the function, not before it
  upload.single('archivo')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer errors, if any
      return res.status(400).json({ message: 'Error uploading the file.' });
    } else if (err) {
      // Handle other errors, if any
      return res.status(500).json({ message: 'Internal server error.' });
    }

    try {
      const ultimoAlbaran = await Albaran.findOne().sort({ numero_de_albaran: -1 }).exec();
      const numeroAlbaran = ultimoAlbaran ? ultimoAlbaran.numero_de_albaran + 1 : 1;
      const albaran = await Albaran.create({ ...req.body, numero_de_albaran: numeroAlbaran });

      res.status(200).json({
        message: '¡Albaran creado correctamente!',
        albaran,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
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
