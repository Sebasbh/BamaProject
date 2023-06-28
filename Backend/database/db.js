//db.js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/bama', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('open', () => {
  console.log('¡Conectado a MongoDB!');
});
db.on('error', () => {
  console.log('¡Error al conectar a MongoDB!');
});

export default db;
 