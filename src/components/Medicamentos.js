import React, { useEffect, useState } from 'react';
import api from '../api';
import './Medicamentos.css';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    api.get('/medicamentos/')
      .then(response => setMedicamentos(response.data))
      .catch(error => console.error('Error fetching medicamentos:', error));
  }, []);

  return (
    <div className="medicamentos-container container py-5">
      <h1 className="medicamentos-title text-center mb-5">Catálogo de Medicamentos</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {medicamentos.map((medicamento) => (
          <div className="col" key={medicamento.id}>
            <div className="medicamento-card h-100">
              <div className="card-body d-flex flex-column">
                <h2 className="card-title">{medicamento.nombre}</h2>
                <p className="card-text descripcion flex-grow-1">{medicamento.descripcion}</p>
                <p className="card-text precio">Precio: ${medicamento.precio.toFixed(2)}</p>
                <p className={`card-text stock ${medicamento.stock > 0 ? 'disponible' : 'agotado'}`}>
                  {medicamento.stock > 0 ? `En stock: ${medicamento.stock}` : 'Agotado'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medicamentos;

