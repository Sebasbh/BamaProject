import mongoose from "mongoose";
const Schema = mongoose.Schema;

const albaranSchema = new Schema (
   {
     NºAlbaran:{type:Number},
      cliente:{type:String},
      fecha:{type:String},
      importe:{type:String},
      pedido:{type:String},
      entregado:{type:String},
      facturado:{type:String}
   
   }, 
   {collection:'albaranes'}
)

export default mongoose.model ('AlbaranModel',albaranSchema )