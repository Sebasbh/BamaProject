import express from 'express'
import { createFactura, deleteFactura, getAllFacturas, getfacturas, updateFactura } from '../controllers/FacturasController.js'

const FacturaRouter = express.Router()

FacturaRouter.get('/', getAllFacturas)
FacturaRouter.get('/:id', getfacturas)
FacturaRouter.post('/', createFactura)
FacturaRouter.put('/:id', updateFactura)
FacturaRouter.delete('/:id', deleteFactura)

export default FacturaRouter;