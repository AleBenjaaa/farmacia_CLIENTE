import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null);

  // Recuperar sesión al cargar
  useEffect(() => {
    const clienteGuardado = localStorage.getItem('cliente');
    if (clienteGuardado) {
      setCliente(JSON.parse(clienteGuardado));
    }
  }, []);

  // Manejar inicio de sesión
  const iniciarSesion = (clienteData) => {
    setCliente(clienteData);
    localStorage.setItem('cliente', JSON.stringify(clienteData));
  };

  // Manejar cierre de sesión
  const cerrarSesion = () => {
    setCliente(null);
    localStorage.removeItem('cliente');
  };

  return (
    <AuthContext.Provider value={{ cliente, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
