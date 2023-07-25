import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clienteSchema = new Schema (
   {
      nombre:{type:String},
      direccion_social:{type:String},
      CIF:{type:String},
      forma_de_pago:{type:String},
   }, 
   {collection:'clientes'}
)

export default mongoose.model ('ClienteModel',clienteSchema )