//UserController.js
import Usuario from '../models/UsuarioModel.js';

export async function iniciarSesion(req, res) {
  const { email, password } = req.body;
  console.log(`Debug: inicio de sesión para email: ${email}, password: ${password}`);
  try {
    // Buscar el usuario por su correo electrónico
    const usuario = await Usuario.findOne({ email:email}) ;
    console.log(usuario)
    if(!usuario){
        res.status(400).json({mensaje:"Error en la busqueda de usuarios"})
    }
    console.log('Debug: Usuario encontrado:', usuario);

    // Verificar si el usuario existe y si la contraseña coincide
    if (usuario && usuario.password === password) {
      // Inicio de sesión exitoso
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } else {
      // Credenciales inválidas
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  } catch (error) {
    // Error en la base de datos
    console.log(error)
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
      detalles: error.message // Este es el mensaje detallado del error
    });
  }
}


