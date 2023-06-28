// errorHandler.js
export default function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    // Puedes personalizar el mensaje de error según la situación
    let message = 'Se produjo un error inesperado. Por favor, inténtalo de nuevo más tarde.';
  
    if (process.env.NODE_ENV === 'development') {
      message = err.message;
    }
  
    res.status(500).send({
      error: message
    });
  }
  