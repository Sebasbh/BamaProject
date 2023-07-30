import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  empresa: { type: String },
  direccion_social: { type: String },
  CIF: { type: String, unique: true },
  forma_de_pago: { type: String, enum: ['Transferencia', 'Confirming', 'Giro Bancario'] },
  activo: { type: Boolean, default: true },
});

const PedidoSchema = new mongoose.Schema({
  numero_de_pedido: { type: Number, unique: true },
  fecha_de_pedido: { type: Date, default: Date.now },
  empresa: { type: String },
  importe: { type: Number },
  archivo_adjunto: { type: String },
  estado: { type: String, enum: ['Abierto', 'Cerrado'], default: 'Abierto' },
  total_facturado: { type: Number, default: 0 },
  albaranes_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'albaranes' }],
  facturas_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'facturas' }]
});

const AlbaranSchema = new mongoose.Schema({
  numero_de_albaran: { type: Number, unique: true },
  empresa: { type: String },
  fecha_albaran: { type: Date, default: Date.now },
  importe: { type: Number },
  numero_de_pedido: { type: Number, unique: true },
  archivo_firmado: { type: String },
  estado: { type: String, enum: ['Firmado', 'No firmado'], default: 'No firmado' },
  filePath: { type: String, default:"Albaran.pdf"}
});

const FacturaSchema = new mongoose.Schema({
  numero_de_factura: { type: Number,  unique: true },
  empresa: { type: String },
  fecha_de_factura: { type: Date, default: Date.now },
  vencimiento: { type: String, enum: ['Al contado', '30 días fecha factura', '60 días fecha factura'] },
  importe_IVA: { type: Number },
  total_factura: { type: Number },
  estado_factura: { type: String, default: 'En tramite' }, 
  numero_de_pedido: { type: Number, unique: true },
  numero_de_albaran: { type: Number, unique: true },
  archivo_de_factura: { type: String }
});



const Cliente = mongoose.model('clientes', ClienteSchema);
const Pedido = mongoose.model('pedidos', PedidoSchema);
const Albaran = mongoose.model('albaranes', AlbaranSchema);
const Factura = mongoose.model('facturas', FacturaSchema);

export { Cliente, Pedido, Albaran, Factura };

