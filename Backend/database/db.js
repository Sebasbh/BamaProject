{/*import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017/bama'
mongoose.connect(url)

 const db = mongoose.connection
 db.on('open', ()=> {console.log('¡Conectado a MongoDB!')})
 db.on('error', ()=> {console.log('¡Error al conectar a MongoDB!')})
 
 export default db 
*/}
 import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/bama';

try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('¡Conectado a MongoDB!');
  }).catch((error) => {
    console.error('¡Error al conectar a MongoDB!', error);
    process.exit(1);
  });
} catch (error) {
  console.error('¡Error al conectar a MongoDB!', error);
  process.exit(1);
}

export default mongoose.connection;
