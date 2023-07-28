import express  from "express"
import cors from 'cors'
//importamos la conexión a la DB
import db from "./database/db.js"
//importamos nuestro enrutador
import blogRoutes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/clientes', blogRoutes)

try {
   await db.authenticate ()
   console.log('Conexión exitosa la DB')
} catch (error) {
   console.log(`Error de conexión es:${error}`)
}

 /*app.get('/',(req,res)=>{
   res.send ('HOLA MUNDO')
})*/

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})

// import express from 'express';
// import cors from 'cors';
// import db from './database/db.js';
// import router from './routes/routes.js';
// import PedidoRouter from './routes/PedidoRoutes.js';
// import ClientesRouter from './routes/ClientesRoutes.js'
// import FacturaRouter from './routes/FacturasRoutes.js';
// import AlbaranRouter from './routes/albaranRoutes.js';


// const app = express();

// const corsOptions = {
//   origin:['http://localhost:3000','http://localhost:3001'],
//   optionsSuccessStatus: 200
// };

// console.log('Debug: El archivo app.js se está ejecutando.');

// app.use(cors(corsOptions));
// app.use(express.json());;

// app.use('/', router);
// app.use('/clientes', ClientesRouter);
// app.use('/pedidos', PedidoRouter);
// app.use('/facturas', FacturaRouter);
// app.use('/albaranes', AlbaranRouter);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ success: false, error: 'Error interno del servidor' });
// });

// app.listen(8000, () => {
//   console.log('Server UP running at http://localhost:8000/');
// });