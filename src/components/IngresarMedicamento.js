import React, { useState } from "react";
import axios from "axios";

const IngresarMedicamento = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSuccess(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/medicamentos/",
        formData
      );
      console.log("Medicamento creado:", response.data);
      setFormData({ nombre: "", descripcion: "", precio: "", stock: "" });
      setError(null);
      setSuccess(true); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Error desconocido");
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Agregar Medicamento</h2>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa el nombre del medicamento"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción:
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ingresa una descripción"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio:
          </label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Ingresa el precio"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock:
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Ingresa la cantidad en stock"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agregar
        </button>
      </form>
      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Medicamento agregado con éxito.
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {JSON.stringify(error)}
        </div>
      )}
    </div>
  );
};

export default IngresarMedicamento;
