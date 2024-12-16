import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';

const CrearOrden = () => {
  const { cliente } = useContext(AuthContext);
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentoId, setMedicamentoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    api.get('/medicamentos/')
      .then((response) => setMedicamentos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const manejarOrden = (e) => {
    e.preventDefault();

    if (!cliente) {
      setMensaje('Debe iniciar sesión para crear una orden.');
      return;
    }

    const datosOrden = {
      cliente: cliente.id,
      medicamentos: [{ medicamento: medicamentoId, cantidad: parseInt(cantidad) }],
    };

    api.post('/ordenes/', datosOrden)
      .then(() => {
        setMensaje('Orden creada con éxito.');
        setMedicamentoId('');
        setCantidad(1);
      })
      .catch((error) => {
        if (error.response) {
          setMensaje(`Error: ${error.response.data.non_field_errors || error.response.data}`);
        }
      });
  };

  return (
    <div>
      <h2>Crear Orden</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={manejarOrden}>
        <div>
          <label>Medicamento:</label>
          <select
            value={medicamentoId}
            onChange={(e) => setMedicamentoId(e.target.value)}
            required
          >
            <option value="">Seleccione un medicamento</option>
            {medicamentos
              .filter((medicamento) => medicamento.stock > 0) // Filtrar medicamentos con stock disponible
              .map((medicamento) => (
                <option key={medicamento.id} value={medicamento.id}>
                  {medicamento.nombre} (Stock: {medicamento.stock})
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Orden</button>
      </form>
    </div>
  );
};

export default CrearOrden;
