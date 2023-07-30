import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel.js';

dotenv.config();

export async function iniciarSesion(req, res) {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Credenciales incorrectas" });
    }

    bcrypt.compare(password, usuario.password, function (err, isMatch) {
      if (err) {
        return res.status(500).json({ mensaje: "Error al verificar la contraseña" });
      } if (!isMatch) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      let token;
      try {
        token = jwt.sign(
          { _id: usuario._id, email: usuario.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
      } catch (error) {
        console.error('Error al generar el token JWT: ', error);
        return res.status(500).json({ mensaje: 'Error al iniciar la sesión' });
      }

      if (token) {
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token: token });
      } else {
        res.status(500).json({ mensaje: 'Error al iniciar la sesión' });
      }
    });
  } catch (error) {
    let errorCode = 500;
    let errorMessage = 'Error desconocido en la base de datos';

    if (error.name === 'MongoNetworkError') {
      errorMessage = 'Error de conexión a la base de datos';
    } else if (error.name === 'ValidationError') {
      errorCode = 400;
      errorMessage = 'Datos de usuario no válidos';
    }

    res.status(errorCode).json({
      mensaje: errorMessage,
      detalles: error.message
    });
  }
}

export async function registrarUsuario(req, res) {
  const { email, password } = req.body;

  try {
    let usuarioExistente = await Usuario.findOne({ email: email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está en uso.' });
    }

    const usuario = new Usuario({
      email,
      password,
    });

    await usuario.save();

    res.status(200).json({ mensaje: 'Registro exitoso' });
  } catch (error) {
    console.error('Error al registrar el usuario: ', error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
}
