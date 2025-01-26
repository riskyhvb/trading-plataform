import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';  // Cambié esta línea para incluir la extensión .js
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
