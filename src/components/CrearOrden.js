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

  // Obtener la lista de medicamentos al cargar el componente
  useEffect(() => {
    api.get('/medicamentos/')
      .then((response) => setMedicamentos(response.data))
      .catch((error) => console.error('Error al cargar medicamentos:', error));
  }, []);

  const manejarOrden = (e) => {
    e.preventDefault();

    if (!cliente) {
      setMensaje('Debe iniciar sesión para crear una orden.');
      setTipoMensaje('error');
      return;
    }

    // Encontrar el medicamento seleccionado
    const medicamentoSeleccionado = medicamentos.find(
      (med) => med.id === parseInt(medicamentoId)
    );

    // Validar si la cantidad supera el stock disponible
    if (!medicamentoSeleccionado || cantidad > medicamentoSeleccionado.stock) {
      setMensaje(
        `Error: La cantidad seleccionada (${cantidad}) supera el stock disponible (${medicamentoSeleccionado?.stock || 0}).`
      );
      setTipoMensaje('error');
      return;
    }

    const datosOrden = {
      cliente: cliente.id,
      medicamentos: [{ medicamento: medicamentoId, cantidad: parseInt(cantidad) }],
    };

    // Crear la orden
    api.post('/ordenes/', datosOrden)
      .then(() => {
        const nuevoStock = medicamentoSeleccionado.stock - parseInt(cantidad);

        // Actualizar el stock en el servidor
        api.patch(`/medicamentos/${medicamentoId}/`, { stock: nuevoStock })
          .then(() => {
            // Actualizar el estado local de medicamentos
            setMedicamentos((prevMedicamentos) =>
              prevMedicamentos.map((med) =>
                med.id === parseInt(medicamentoId)
                  ? { ...med, stock: nuevoStock }
                  : med
              )
            );

            setMensaje('Orden creada con éxito.');
            setTipoMensaje('exito');
            setMedicamentoId('');
            setCantidad(1);
          })
          .catch((error) => {
            console.error('Error al actualizar el stock:', error);
            setMensaje('La orden fue creada, pero no se pudo actualizar el stock.');
            setTipoMensaje('error');
          });
      })
      .catch((error) => {
        console.error('Error al crear la orden:', error);
        setMensaje('Error al crear la orden. Intente nuevamente.');
        setTipoMensaje('error');
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="crear-orden-container p-4">
            <h2 className="crear-orden-titulo text-center mb-4">Crear Orden</h2>
            {mensaje && (
              <div
                className={`alert ${
                  tipoMensaje === 'exito' ? 'alert-success' : 'alert-danger'
                } crear-orden-mensaje ${tipoMensaje}`}
              >
                {mensaje}
              </div>
            )}
            <form onSubmit={manejarOrden}>
              <div className="mb-3">
                <label htmlFor="medicamento" className="form-label crear-orden-etiqueta">
                  Medicamento:
                </label>
                <select
                  id="medicamento"
                  className="form-select crear-orden-select"
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
              <div className="mb-3">
                <label htmlFor="cantidad" className="form-label crear-orden-etiqueta">
                  Cantidad:
                </label>
                <input
                  id="cantidad"
                  className="form-control crear-orden-input"
                  type="number"
                  value={cantidad}
                  min="1"
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid">
                <button className="btn crear-orden-boton" type="submit">
                  Crear Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearOrden;
