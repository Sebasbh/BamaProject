import express from 'express'
import { createFactura, deleteFactura, getAllFacturas, getfacturas, updateFactura } from '../controllers/FacturasController.js'
import auth from "../middleware/auth.js";

const FacturaRouter = express.Router()

FacturaRouter.get('/', auth, getAllFacturas)
FacturaRouter.get('/:id', auth, getfacturas)
FacturaRouter.post('/', auth, createFactura)
FacturaRouter.put('/:id', auth, updateFactura)
FacturaRouter.delete('/:id', auth, deleteFactura)

export default FacturaRouter;