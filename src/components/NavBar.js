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
    <nav className="barra-navegacion">
      <ul className="lista-navegacion">
        <div className="nav-izquierda">
          <li className="item-navegacion">
            <Link to="/" className="enlace-navegacion">Inicio</Link>
          </li>
          {cliente && (
            <li className="item-navegacion">
              <Link to="/crear-orden" className="enlace-navegacion">Crear Orden</Link>
            </li>
          )}
        </div>
        <div className="nav-derecha">
          {cliente ? (
            <>
              <li className="item-navegacion bienvenida">Bienvenido, {cliente.nombre}</li>
              <li className="item-navegacion">
                <button onClick={manejarCerrarSesion} className="boton-cerrar-sesion">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="item-navegacion">
                <Link to="/registrar-cliente" className="enlace-navegacion">Registrarse</Link>
              </li>
              <li className="item-navegacion">
                <Link to="/iniciar-sesion" className="enlace-navegacion">Iniciar Sesión</Link>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;