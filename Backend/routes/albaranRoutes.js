import express from 'express';
import {
  getAllAlbaranes,
  getAlbaran,
  createAlbaran,
  updateAlbaran,
  deleteAlbaran,
  getNextAlbaranNumber
} from '../controllers/AlbaranController.js';

const AlbaranRouter = express.Router();

AlbaranRouter.get('/', getAllAlbaranes);
AlbaranRouter.get('/:id', getAlbaran);
AlbaranRouter.get('/next/number',  getNextAlbaranNumber);
AlbaranRouter.post('/', createAlbaran);
AlbaranRouter.put('/:id', updateAlbaran);
AlbaranRouter.delete('/:id', deleteAlbaran);


export default AlbaranRouter;

