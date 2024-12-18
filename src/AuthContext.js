import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedCliente = localStorage.getItem("cliente");

    if (token && storedCliente) {
      setCliente(JSON.parse(storedCliente));
    }
  }, []);

  // Función para iniciar sesión
  const iniciarSesion = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", credentials);
      const { token, cliente } = response.data;

      // Guardar token y cliente en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("cliente", JSON.stringify(cliente));

      setCliente(cliente);
      return true; // Login exitoso
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data);
      return false; // Error en el login
    }
  };

  // Función para registrarse
  const registrarCliente = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/registro/", formData);
      const { token } = response.data;

      // Iniciar sesión automáticamente tras el registro
      const loginResponse = await axios.post("http://localhost:8000/api/login/", {
        username: formData.username,
        password: formData.password,
      });

      const { cliente } = loginResponse.data;

      // Guardar token y cliente en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("cliente", JSON.stringify(cliente));

      setCliente(cliente);
      return true; // Registro exitoso
    } catch (error) {
      console.error("Error al registrarse:", error.response.data);
      return false; // Error en el registro
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cliente");
    setCliente(null);
  };

  return (
    <AuthContext.Provider
      value={{
        cliente,
        iniciarSesion,
        registrarCliente,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};