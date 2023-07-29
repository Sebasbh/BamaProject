import express from 'express';

import {
  createFactura,
  deleteFactura,
  getAllFacturas,
  getFactura,
  getNextFacturaNumber,
  updateFactura,

} from '../controllers/FacturasController.js';

const FacturaRouter = express.Router();


FacturaRouter.get('/', getAllFacturas);
FacturaRouter.get('/:id', getFactura);
FacturaRouter.get('/next/number', getNextFacturaNumber);
FacturaRouter.post('/', createFactura);
FacturaRouter.put('/:id', updateFactura);
FacturaRouter.delete('/:id', deleteFactura);

export default FacturaRouter;

