import express from 'express';
import {
  getAllAlbaranes,
  getAlbaran,
  createAlbaran,
  updateAlbaran,
  deleteAlbaran,
  getNextAlbaranNumber
} from '../controllers/AlbaranController.js';

const router = express.Router();

router.get('/', getAllAlbaranes);
router.get('/:id', getAlbaran);
router.get('/next-number',  getNextAlbaranNumber);
router.post('/', createAlbaran);
router.put('/:id', updateAlbaran);
router.delete('/:id', deleteAlbaran);


export default router;

