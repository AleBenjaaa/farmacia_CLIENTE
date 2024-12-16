import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';
import './CrearOrden.css';

const CrearOrden = () => {
  const { cliente } = useContext(AuthContext);
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentoId, setMedicamentoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  useEffect(() => {
    api.get('/medicamentos/')
      .then((response) => setMedicamentos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const manejarOrden = (e) => {
    e.preventDefault();

    if (!cliente) {
      setMensaje('Debe iniciar sesión para crear una orden.');
      setTipoMensaje('error');
      return;
    }

    const datosOrden = {
      cliente: cliente.id,
      medicamentos: [{ medicamento: medicamentoId, cantidad: parseInt(cantidad) }],
    };

    api.post('/ordenes/', datosOrden)
      .then(() => {
        setMensaje('Orden creada con éxito.');
        setTipoMensaje('exito');
        setMedicamentoId('');
        setCantidad(1);
      })
      .catch((error) => {
        if (error.response) {
          setMensaje(`Error: ${error.response.data.non_field_errors || error.response.data}`);
          setTipoMensaje('error');
        }
      });
  };

  return (
    <div className="crear-orden-container">
      <h2 className="crear-orden-titulo">Crear Orden</h2>
      {mensaje && <p className={`crear-orden-mensaje ${tipoMensaje}`}>{mensaje}</p>}
      <form onSubmit={manejarOrden} className="crear-orden-formulario">
        <div className="crear-orden-campo">
          <label className="crear-orden-etiqueta">Medicamento:</label>
          <select
            className="crear-orden-select"
            value={medicamentoId}
            onChange={(e) => setMedicamentoId(e.target.value)}
            required
          >
            <option value="">Seleccione un medicamento</option>
            {medicamentos
              .filter((medicamento) => medicamento.stock > 0)
              .map((medicamento) => (
                <option key={medicamento.id} value={medicamento.id}>
                  {medicamento.nombre} (Stock: {medicamento.stock})
                </option>
              ))}
          </select>
        </div>
        <div className="crear-orden-campo">
          <label className="crear-orden-etiqueta">Cantidad:</label>
          <input
            className="crear-orden-input"
            type="number"
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button className="crear-orden-boton" type="submit">Crear Orden</button>
      </form>
    </div>
  );
};

export default CrearOrden;

