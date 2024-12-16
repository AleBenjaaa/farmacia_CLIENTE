import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

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
    <div className="iniciar-sesion-container">
      <h2 className="iniciar-sesion-titulo">Iniciar Sesión</h2>
      {mensaje && <p className="iniciar-sesion-mensaje">{mensaje}</p>}
      <form onSubmit={manejarIniciarSesion} className="iniciar-sesion-formulario">
        <div className="iniciar-sesion-campo">
          <label className="iniciar-sesion-etiqueta">Email:</label>
          <input
            type="email"
            className="iniciar-sesion-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="iniciar-sesion-boton">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default IniciarSesion;
