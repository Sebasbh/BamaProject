import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CDcliente from './pages/Clientes/CDcliente';
import DetalleCliente from './pages/Clientes/DetalleCliente'
import FormularioClientes from './pages/Clientes/FormularioClientes';
import NotFound from './pages/NotFound';
import GestionClientes from './pages/Clientes/GestionClientes';
import DetalleFactura from './pages/Facturas/DetalleFactura';


const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/cdcliente" element={<CDcliente/>} />
        <Route path="/GestionClientes" element={<GestionClientes/>}/>
        <Route path="/DetalleFactura" element={<DetalleFactura/>} />
        <Route path="/DetalleCliente/:id" element={<DetalleCliente/>} />
        <Route path="/FormularioClientes" element={<FormularioClientes />} />
        <Route element={NotFound} />
       </Routes>
    </Router>
  );
};

export default App;
