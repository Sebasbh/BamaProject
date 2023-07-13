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
    cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'clientes', /* required: true, */ },
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
  fechae_albaran: { type: Date, default: Date.now },
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
