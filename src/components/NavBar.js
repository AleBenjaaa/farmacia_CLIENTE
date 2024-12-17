import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { cliente, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg barra-navegacion">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link enlace-navegacion">Inicio</Link>
            </li>
            {cliente && (
              <li className="nav-item">
                <Link to="/crear-orden" className="nav-link enlace-navegacion">Crear Orden</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {cliente ? (
              <>
                <li className="nav-item">
                  <span className="nav-link bienvenida">Bienvenido, {cliente.nombre}</span>
                </li>
                <li className="nav-item">
                  <button onClick={manejarCerrarSesion} className="btn boton-cerrar-sesion">
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/registrar-cliente" className="nav-link enlace-navegacion">Registrarse</Link>
                </li>
                <li className="nav-item">
                  <Link to="/iniciar-sesion" className="nav-link enlace-navegacion">Iniciar Sesión</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

