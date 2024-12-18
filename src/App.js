import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import RegistrarCliente from './components/RegistrarCliente';
import IniciarSesion from './components/IniciarSesion';
import CrearOrden from './components/CrearOrden';
import Medicamentos from './components/Medicamentos';
import IngresarMedicamento from './components/IngresarMedicamento';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Medicamentos />} />
        <Route path="/registrar-cliente" element={<RegistrarCliente />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/crear-orden" element={<CrearOrden />} />
        <Route path="/ingresar" element={<IngresarMedicamento />} />
      </Routes>
    </Router>
  );
}

export default App;
