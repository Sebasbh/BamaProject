import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clienteSchema = new Schema (
   {
      empresa:{type:String},
      CIF_NIF:{type:String},
      contacto:{type:String},
      importe_pedido:{type:String},
      fecha_pedido:{type:String},
      forma_pago:{type:String},
   }, 
   {collection:'clientes'}
)

export default mongoose.model ('ClienteModel',clienteSchema )