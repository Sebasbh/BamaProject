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
import "./App.css";
import Footer from "./Components/footer/Footer";import './App.css';
import Footer from './Components/footer/Footer';

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="content-wrapper">
         <div className="app-wrapper">
        <div className="content-wrapper">
       <Routes>
            <Route path="/Home" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/GestionClientes" element={<GestionClientes />} />
            <Route path="/DetalleCliente/:id" element={<DetalleCliente />} />
            <Route path="/FormularioClientes" element={<FormularioClientes />}/>
            <Route path="/DetalleFactura" element={<DetalleFactura />} />
            <Route path="/CrearPedido" element={<CrearPedido />} />
            <Route path="/GestionPedidos" element={<GestionPedidos />} />
            <Route path="/DetallePedido/:id" element={<DetallePedido />} />
            <Route element={NotFound} />
          </Routes>
        </div>
        <Footer />
      </div>
       </div>
       <Footer />
       </div>
    </Router>
  );
};

export default App;
