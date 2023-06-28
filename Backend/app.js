// app.js
import express  from "express";
import cors from 'cors';
import db from "./database/db.js";
import routes from './routes/routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', routes);

// Middleware de manejo de errores va aquí
app.use(errorHandler);

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/');
});
