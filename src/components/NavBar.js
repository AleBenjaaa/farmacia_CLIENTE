import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const NavBar = () => {
  const { cliente, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px', background: '#007bff', color: 'white' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
        </li>
        {cliente ? (
          <>
            <li>Bienvenido, {cliente.nombre}</li>
            <li>
              <Link to="/crear-orden" style={{ color: 'white', textDecoration: 'none' }}>Crear Orden</Link>
            </li>
            <li>
              <button onClick={manejarCerrarSesion} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/registrar-cliente" style={{ color: 'white', textDecoration: 'none' }}>Registrarse</Link>
            </li>
            <li>
              <Link to="/iniciar-sesion" style={{ color: 'white', textDecoration: 'none' }}>Iniciar Sesión</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
