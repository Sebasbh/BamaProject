import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  empresa: { type: String, /* required: true, */ },
  direccion_social: { type: String, /* required: true, */ },
  CIF: { type: String, /* required: true, */ unique: true },
  forma_de_pago: { type: String, enum: ['Transferencia', 'Confirming', 'Giro Bancario'], /* required: true, */ },
  activo: { type: Boolean, default: true },
  pedidos_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedidos' }]
});

const PedidoSchema = new mongoose.Schema({
    numero_de_pedido: { type: Number, /* required: true, */ unique: true },
    fecha_de_pedido: { type: Date, default: Date.now },
    //cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'clientes', /* required: true, */ },
    empresa: { type: String, /* required: true, */ },
    importe: { type: Number, /* required: true, */ },
    archivo_adjunto: { type: String },
    estado: { type: String, enum: ['Abierto', 'Cerrado'], default: 'Abierto' },
    total_facturado: { type: Number, default: 0 },
    albaranes_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'albaranes' }],
    facturas_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'facturas' }]
});

const AlbaranSchema = new mongoose.Schema({
  numero_de_albaran: { type: Number, /* required: true, */ unique: true },
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'clientes', /* required: true */ },
  fecha_albaran: { type: Date, default: Date.now },
  importe: { type: Number, /* required: true */ },
  pedido_id: { type: mongoose.Schema.Types.ObjectId, ref: 'pedidos', /* required: true */ },
  archivo_de_entrega: { type: String },
  archivo_firmado: { type: String },
  estado: { type: String, enum: ['Firmado', 'No firmado'], default: 'No firmado' },
  factura_id: { type: mongoose.Schema.Types.ObjectId, ref: 'facturas' }
});

const FacturaSchema = new mongoose.Schema({
  numero_de_factura: { type: Number, /* required: true, */ unique: true },
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'clientes', /* required: true */ },
  fecha_de_factura: { type: Date, default: Date.now },
  vencimiento: { type: String, enum: ['Al contado', '30 días fecha factura', '60 días fecha factura'], /* required: true */ },
  base_imponible: { type: Number, /* required: true */ },
  tipo_de_IVA: { type: String, enum: ['21%', '10%', '4%', 'Sin IVA'], /* required: true*/ },
  importe_IVA: { type: Number },
  total_factura: { type: Number },
  estado_factura: { type: String, enum: ['En trámite', 'Cerrada'], default: 'En trámite' },
  fecha_de_cobro: {type: Date},
  pedido_id: { type: mongoose.Schema.Types.ObjectId, ref: 'pedidos', /* required: true */ },
  albaran_id: { type: mongoose.Schema.Types.ObjectId, ref: 'albaranes' },
  archivo_de_factura: { type: String }
});

const Cliente = mongoose.model('clientes', ClienteSchema);
const Pedido = mongoose.model('pedidos', PedidoSchema);
const Albaran = mongoose.model('albaranes', AlbaranSchema);
const Factura = mongoose.model('factura', FacturaSchema);

export { Cliente, Pedido, Albaran, Factura };


/*---------------------------------------------------------------*/
/*
AQUI TENEIS TODA LA EXPLICACION DE CADA UNO DE LOS MODELOS:

// Importamos mongoose
const mongoose = require('mongoose');

// Definimos el esquema para los clientes
const ClienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  // Nombre del cliente
    direccion_social: { type: String, required: true },  // Dirección social del cliente
    CIF: { type: String, required: true, unique: true },  // CIF del cliente, debe ser único
    forma_de_pago: { type: String, enum: ['Transferencia', 'Confirming', 'Giro Bancario'], required: true },  // Forma de pago del cliente
    activo: { type: Boolean, default: true },  // Estado del cliente, por defecto es activo
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }]  // Referencia a los pedidos realizados por el cliente
});

// Definimos el esquema para los pedidos
const PedidoSchema = new mongoose.Schema({
    numero_de_pedido: { type: Number, required: true, unique: true },  // Número del pedido, debe ser único
    fecha_de_pedido: { type: Date, default: Date.now },  // Fecha del pedido, por defecto es la fecha actual
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },  // Referencia al cliente que hizo el pedido
    importe: { type: Number, required: true },  // Importe del pedido
    archivo_adjunto: { type: String },  // Ruta del archivo adjunto al pedido
    estado: { type: String, enum: ['Abierto', 'Cerrado'], default: 'Abierto' },  // Estado del pedido, por defecto es "Abierto"
    total_facturado: { type: Number, default: 0 },  // Total facturado del pedido, por defecto es 0
    albaranes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Albaran' }],  // Referencias a los albaranes relacionados con el pedido
    facturas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Factura' }]  // Referencias a las facturas relacionadas con el pedido
});

// Definimos el esquema para los albaranes
const AlbaranSchema = new mongoose.Schema({
    numero_de_albaran: { type: Number, required: true, unique: true },  // Número del albarán, debe ser único
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },  // Referencia al cliente relacionado con el albarán
    fecha_de_albaran: { type: Date, default: Date.now },  // Fecha del albarán, por defecto es la fecha actual
    importe: { type: Number, required: true },  // Importe del albarán
    pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },  // Referencia al pedido relacionado con el albarán
    archivo_de_entrega: { type: String },  // Ruta del archivo de entrega del albarán
    archivo_firmado: { type: String },  // Ruta del archivo firmado del albarán
    estado: { type: String, enum: ['Firmado', 'No firmado'], default: 'No firmado' },  // Estado del albarán, por defecto es "No firmado"
    factura: { type: mongoose.Schema.Types.ObjectId, ref: 'Factura' }  // Referencia a la factura relacionada con el albarán
});

// Definimos el esquema para las facturas
const FacturaSchema = new mongoose.Schema({
    numero_de_factura: { type: Number, required: true, unique: true },  // Número de la factura, debe ser único
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },  // Referencia al cliente relacionado con la factura
    fecha_de_factura: { type: Date, default: Date.now },  // Fecha de la factura, por defecto es la fecha actual
    vencimiento: { type: String, enum: ['Al contado', '30 días fecha factura', '60 días fecha factura'], required: true },  // Términos de vencimiento de la factura
    base_imponible: { type: Number, required: true },  // Base imponible de la factura
    tipo_de_IVA: { type: String, enum: ['21%', '10%', '4%', 'Sin IVA'], required: true },  // Tipo de IVA de la factura
    importe_IVA: { type: Number },  // Importe del IVA
    total_factura: { type: Number },  // Total de la factura
    estado_factura: { type: String, enum: ['En trámite', 'Cerrada'], default: 'En trámite' },  // Estado de la factura, por defecto es "En trámite"
    fecha_de_cobro: Date,  // Fecha de cobro de la factura
    pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },  // Referencia al pedido relacionado con la factura
    albaran: { type: mongoose.Schema.Types.ObjectId, ref: 'Albaran' },  // Referencia al albarán relacionado con la factura
    archivo_de_factura: { type: String }  // Ruta del archivo de la factura
});

// Creamos los modelos a partir de los esquemas
const Cliente = mongoose.model('Cliente', ClienteSchema);
const Pedido = mongoose.model('Pedido', PedidoSchema);
const Albaran = mongoose.model('Albaran', AlbaranSchema);
const Factura = mongoose.model('Factura', FacturaSchema);

// Exportamos los modelos
module.exports = { Cliente, Pedido, Albaran, Factura }; */
