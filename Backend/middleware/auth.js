// importar modulos
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { secret } from '../services/jwt.js';

//Funcion de autenticacion
const auth = (req, res, next) => {
  //Comprobar si me llega la cabezera de auth
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "La peticion no tiene la cabezera de autenticacion",
    });
  }

  //limpiar token de comillas con expresion regular
  const token = req.headers.authorization.replace(/['"]+/g, "");

  //Decodificar el token
  try {
    const payload = jwt.decode(token, secret);
    console.log(payload);
    
    //comprobar expiracion del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "token expirado",
      });
    }

    //agregar datos de usuario a request
    req.user = payload;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "token invalido",
    });
  }

  next();
}
export default auth