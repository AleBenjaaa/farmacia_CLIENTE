import React, { useState } from 'react';
import api from '../api';

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
    <div>
      <h2>Registrar Cliente</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={manejarRegistro}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrarCliente;
