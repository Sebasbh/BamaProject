//validationMiddleware.js
import { body, validationResult } from 'express-validator';

// Middleware de validación para la ruta de inicio de sesión
export const validateLogin = [
  body('email').isEmail().withMessage('El correo electrónico no es válido.'),
  body('password').notEmpty().withMessage('La contraseña es requerida.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
