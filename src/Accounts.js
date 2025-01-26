import React, { useState, useEffect } from 'react';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  // Función para obtener las cuentas
  const fetchAccounts = async () => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
      setError('No estás autenticado');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/accounts', {
        method: 'GET',
        headers: { 'Authorization': token },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las cuentas');
      }

      const data = await response.json();
      setAccounts(data); // Guardar las cuentas en el estado
    } catch (err) {
      setError(err.message); // Manejar el error
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []); // Solo ejecuta una vez cuando el componente se monta

  return (
    <div>
      <h2>Cuentas de Trading</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <li key={account._id}>
              {account.accountName} - ${account.balance}
            </li>
          ))
        ) : (
          <p>No tienes cuentas de trading.</p>
        )}
      </ul>
    </div>
  );
};

export default Accounts;
