import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function RegistrarCliente() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    email: "",
    telefono: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);

  const { registrarCliente } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registrarCliente(formData);

    if (success) {
      setModalMessage("Usuario registrado con éxito");
      setModalSuccess(true);
      setModalVisible(true);
    } else {
      setModalMessage("Error en el registro");
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalSuccess) {
      navigate("/"); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h4>Registro</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  className="form-control mb-3"
                  placeholder="Usuario"
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="form-control mb-3"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="nombre"
                  className="form-control mb-3"
                  placeholder="Nombre completo"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Correo electrónico"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="telefono"
                  className="form-control mb-3"
                  placeholder="Teléfono"
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn btn-primary w-100">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className={`modal-content ${modalSuccess ? "border-success" : "border-danger"}`}>
              <div className={`modal-header ${modalSuccess ? "bg-success" : "bg-danger"} text-white`}>
                <h5 className="modal-title">
                  {modalSuccess ? "Éxito" : "Error"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrarCliente;
