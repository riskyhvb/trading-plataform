// Variables
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const registerContainer = document.getElementById('register-container');
const loginContainer = document.getElementById('login-container');

// Cambiar entre formularios de login y registro
document.getElementById('go-to-login').addEventListener('click', () => {
  registerContainer.style.display = 'none';
  loginContainer.style.display = 'block';
});

document.getElementById('go-to-register').addEventListener('click', () => {
  loginContainer.style.display = 'none';
  registerContainer.style.display = 'block';
});

// Función para registrar usuario
registerForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  const formData = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  // Hacer la solicitud POST para registrar el usuario
  fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Usuario registrado correctamente") {
        alert('Registro exitoso, por favor inicia sesión.');
        // Redirigir al formulario de login después de un registro exitoso
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
      } else {
        alert('Error al registrar el usuario: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al registrar el usuario. Intenta nuevamente.');
    });
});

// Función para iniciar sesión
loginForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  const loginData = {
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-password').value
  };

  // Hacer la solicitud POST para iniciar sesión
  fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        alert('Inicio de sesión exitoso');
        // Aquí puedes almacenar el token en localStorage o hacer algo con él
        localStorage.setItem('authToken', data.token);
        // Redirigir o hacer algo después del login exitoso
      } else {
        alert('Error al iniciar sesión: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al iniciar sesión. Intenta nuevamente.');
    });
});
