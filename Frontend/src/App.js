import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DetalleCliente from "./pages/Clientes/DetalleCliente";
import FormularioClientes from "./pages/Clientes/FormularioClientes";
import NotFound from "./pages/NotFound";
import GestionClientes from "./pages/Clientes/GestionClientes";
import DetalleFactura from "./pages/Facturas/DetalleFactura";
import CrearPedido from "./pages/Pedidos/CrearPedido";
import GestionPedidos from "./pages/Pedidos/GestionPedidos";
import DetallePedido from "./pages/Pedidos/DellatePedido";
import GestionAlbaranes from "./pages/Albaranes/GestionAlbaranes";
import DetalleAlbaranes from "./pages/Albaranes/DetalleAlbaranes";
import FormularioAlbaranes from "./pages/Albaranes/FormularioAlbaranes";
import "./App.css";
import Footer from "./Components/footer/Footer";
import CrearFactura from './pages/Facturas/CrearFactura';
import DetalleFactura from './pages/Facturas/DetalleFactura';
import GestionFactura from './pages/Facturas/GestionFactura';

const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/cdcliente" element={<CDcliente/>} />
        <Route path="/DetalleCliente" element={<DetalleCliente/>} />
        <Route path="/GestionClientes" element={<GestionClientes/>}/>
        <Route path="/CrearPedido" element={<CrearPedido/>}/>
        <Route path="/GestionPedidos" element={<GestionPedidos/>}/>
        <Route path="/DetallePedido/:id" element={<DetallePedido />} />    
        <Route path="/CrearFactura" element={<CrearFactura />} />
        <Route path="/DetalleFactura" element={<DetalleFactura />} /> 
        <Route path="/GestionFactura" element={<GestionFactura/>} />   
        <Route element={NotFound} />
       </Routes>
    </Router>
  );
};

export default App;
