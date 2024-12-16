import React, { useState } from 'react';
import api from '../api';
import './RegistrarCliente.css';

const RegistrarCliente = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarRegistro = (e) => {
    e.preventDefault();

    // Enviar datos a la API
    api.post('/clientes/', { nombre, email, telefono })
      .then((response) => {
        setMensaje('Cliente registrado con éxito');
        setNombre('');
        setEmail('');
        setTelefono('');
      })
      .catch((error) => {
        setMensaje('Error al registrar el cliente');
        console.error(error);
      });
  };

  return (
    <div className="registrar-cliente-container">
      <h2 className="registrar-cliente-titulo">Registrar Cliente</h2>
      {mensaje && <p className="registrar-cliente-mensaje">{mensaje}</p>}
      <form onSubmit={manejarRegistro} className="registrar-cliente-formulario">
        <div className="registrar-cliente-campo">
          <label className="registrar-cliente-etiqueta">Nombre:</label>
          <input
            type="text"
            className="registrar-cliente-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="registrar-cliente-campo">
          <label className="registrar-cliente-etiqueta">Email:</label>
          <input
            type="email"
            className="registrar-cliente-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="registrar-cliente-campo">
          <label className="registrar-cliente-etiqueta">Teléfono:</label>
          <input
            type="text"
            className="registrar-cliente-input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="registrar-cliente-boton">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrarCliente;
