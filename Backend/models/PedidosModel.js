import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pedidosSchema = new Schema (
   {
      numero_de_pedido:{ type: Number},
      fecha_de_pedido:{type:Date},
      cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente'},
      importe: { type: Number},
      archivo_adjunto: { type: String },
      estado: { type: String, enum: ['Abierto', 'Cerrado'], default: 'Abierto' },
      total_facturado: { type: Number, default: 0 },
      albaranes_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Albaran' }],
      facturas_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Factura' }] 
   }, 
   {collection:'pedidos'}
)

export default mongoose.model ('PedidosModel',pedidosSchema )

