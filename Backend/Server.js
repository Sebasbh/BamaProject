const { MongoClient } = require('mongodb');

// Aquí es donde pondrías tu cadena de conexión a MongoDB Atlas.
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  // asegúrate de manejar cualquier error de conexión aquí
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db("myDatabase");

  const clientesCollection = db.collection('clientes');
  const pedidosCollection = db.collection('pedidos');
  const albaranesCollection = db.collection('albaranes');
  const facturasCollection = db.collection('facturas');

  // ahora puedes usar estas colecciones para hacer consultas a tu base de datos

  // por ejemplo, para insertar un nuevo cliente:
  clientesCollection.insertOne({
    nombre: 'Nombre',
    direccion_social: 'Dirección social',
    CIF: 'CIF',
    forma_de_pago: 'Forma de pago',
    estado: true,
  }, (err, result) => {
    // maneja el resultado aquí
  });

  // Recuerda cerrar la conexión cuando hayas terminado
  client.close();
});
