import express from 'express';
import { getAllAlbaranes, getAlbaran, createAlbaran, updateAlbaran, deleteAlbaran, getNextAlbaranNumber } from '../controllers/AlbaranController.js';
import auth from "../middleware/auth.js";

const AlbaranRouter = express.Router();

AlbaranRouter.get('/', auth, getAllAlbaranes);
AlbaranRouter.get('/:id', auth, getAlbaran);
AlbaranRouter.get('/next/number', auth,  getNextAlbaranNumber);
AlbaranRouter.post('/', auth, createAlbaran);
AlbaranRouter.put('/:id', auth, updateAlbaran);
AlbaranRouter.delete('/:id', auth, deleteAlbaran);


export default AlbaranRouter;

