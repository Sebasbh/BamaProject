import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  numero: {
    type: Number,
    required: true,
    unique: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  cliente: {
    type: String,
    required: true
  },
  importe: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    default: "Abierto",
    enum: ["Abierto", "Cerrado"]
  }
}, { collection: 'pedidos' });

export default mongoose.model('PedidoModel', pedidoSchema);
