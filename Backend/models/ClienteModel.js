import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clienteSchema = new Schema (
   {
      empresa:{type:String},
      CIF_NIF:{type:String},
      forma_pago:{type:String},
      fecha_creacion:{type:String},
      razon_spcial:{type:String},
      direccion:{type:String},
      
   }, 
   {collection:'clientes'}
)

export default mongoose.model ('ClienteModel',clienteSchema )