import React from 'react';
import './App.css';
import AuthComponents from './components/AuthComponents'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido a la Plataforma de Trading</h1>
        <AuthComponents /> {/* Aquí agregas el componente de registro/login */}
      </header>
    </div>
  );
}

export default App;
