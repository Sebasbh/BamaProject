// UsuarioController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioModel from "../models/UsuarioModel.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const usuario = await UsuarioModel.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos.' });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos.' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: usuario._id }, JWT_SECRET); 

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};


