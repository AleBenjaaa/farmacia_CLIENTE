import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const { iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const manejarIniciarSesion = (e) => {
    e.preventDefault();

    api.get(`/clientes/?email=${email}`)
      .then((response) => {
        if (response.data.length > 0) {
          iniciarSesion(response.data[0]);
          setMensaje('');
          navigate('/');
        } else {
          setMensaje('Correo electrónico no encontrado.');
        }
      })
      .catch((error) => {
        console.error(error);
        setMensaje('Error al iniciar sesión.');
      });
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={manejarIniciarSesion}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default IniciarSesion;
