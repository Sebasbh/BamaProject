/*import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clienteSchema = new Schema (
   {
      empresa:{ type: String},
      direccion_social:{type:String},
      CIF:{type:String},
      forma_pago:{type:String},
      activo: { type: Boolean, default: true },
      pedidos_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PedidosModel' }

   }, 
   {collection:'clientes'}
)

export default mongoose.model ('ClienteModel',clienteSchema ) */