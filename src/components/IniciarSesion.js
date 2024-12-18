import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function IniciarSesion() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);

  const { iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await iniciarSesion(credentials);

    if (success) {
      setModalMessage("Inicio de sesión exitoso");
      setModalSuccess(true);
      setModalVisible(true);
    } else {
      setModalMessage("Credenciales incorrectas");
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalSuccess) {
      navigate("/"); // Redirige después de un inicio exitoso
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white text-center">
              <h4>Iniciar Sesión</h4>
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
                <button type="submit" className="btn btn-success w-100">
                  Iniciar Sesión
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
            <div
              className={`modal-content ${
                modalSuccess ? "border-success" : "border-danger"
              }`}
            >
              <div
                className={`modal-header ${
                  modalSuccess ? "bg-success" : "bg-danger"
                } text-white`}
              >
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

export default IniciarSesion;
