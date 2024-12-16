import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia la importación
import App from './App';
import AuthProvider from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usa createRoot
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
