// UserModel.js
import mongoose from 'mongoose';

// Definir el esquema del modelo
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Crear el modelo basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

// Exportar el modelo
export default Usuario;// UserModel.js