import express from 'express'
import {getAllClientes, getCliente, createCliente, updateCliente, deleteCliente} from '../controllers/ClienteController.js'
//import { getAllAlbaranes, getAlbaran, createAlbaran, updateAlbaran, deleteAlbaran } from '../controllers/AlbaranController.js'

const router = express.Router()

router.get('/', getAllClientes)
router.get('/:id', getCliente)
router.post('/', createCliente)
router.put('/:id', updateCliente)
router.delete('/:id', deleteCliente)
/*
router.get('/albaranes', getAllAlbaranes)
router.get('/:id', getAlbaran)
router.post('/', createAlbaran)
router.put('/:id', updateAlbaran)
router.delete('/:id', deleteAlbaran)*/




export default router;