import React, { useState } from 'react';

const AuthComponents = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert(data.message); // Mostrar un mensaje en caso de éxito
      if (isLogin) console.log('Token:', data.token); // Imprimir el token
    } catch (error) {
      alert(error.message); // Mostrar errores
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            required={!isLogin}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Crear cuenta nueva' : 'Ya tengo una cuenta'}
      </button>
    </div>
  );
};

export default AuthComponents;
