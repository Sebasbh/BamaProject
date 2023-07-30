import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  getAllAlbaranes,
  getAlbaran,
  createAlbaran,
  updateAlbaran,
  deleteAlbaran,
  getNextAlbaranNumber,
  getFileAlbaran
} from '../controllers/AlbaranController.js';

const AlbaranRouter = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/albaranes',
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    if (extension !== '.pdf') {
      return cb(new Error('El archivo debe tener la extensión .pdf'));
    }
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

AlbaranRouter.get('/', getAllAlbaranes);
AlbaranRouter.get('/:id', getAlbaran);
AlbaranRouter.get('/getFileAlbaran/:file', getFileAlbaran);
AlbaranRouter.get('/next/number', getNextAlbaranNumber);
AlbaranRouter.post('/', [upload.single('pdf')], createAlbaran);
AlbaranRouter.put('/:id', updateAlbaran);
AlbaranRouter.delete('/:id', deleteAlbaran);

export default AlbaranRouter;

