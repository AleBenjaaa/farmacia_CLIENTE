import React, { useEffect, useState } from 'react';
import api from '../api';
import './Medicamentos.css'; // Archivo CSS para los estilos

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    api.get('/medicamentos/')
      .then(response => setMedicamentos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="medicamentos-container">
      <h1 className="medicamentos-title">Lista de Medicamentos</h1>
      <div className="medicamentos-grid">
        {medicamentos.map((medicamento) => (
          <div className="medicamento-card" key={medicamento.id}>
            <h2>{medicamento.nombre}</h2>
            <p className="descripcion">{medicamento.descripcion}</p>
            <p className="precio">Precio: ${medicamento.precio}</p>
            <p className={`stock ${medicamento.stock > 0 ? 'disponible' : 'agotado'}`}>
              {medicamento.stock > 0 ? `Stock: ${medicamento.stock}` : 'Agotado'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medicamentos;

