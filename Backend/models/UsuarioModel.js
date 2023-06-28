// UsuarioModel.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "usuarios" }
);

// Encriptar contraseña antes de guardarla
usuarioSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  

export default mongoose.model("UsuarioModel", usuarioSchema);

