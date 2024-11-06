import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5004/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      navigate("/"); // Redirect to home
    } else {
      const errorMessage = await response.text();
      setErrorMessage(errorMessage);
      setUsername('');
      setPassword('');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container login-container">
      <h2>Quiz Quest</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}

      <button onClick={goToRegister} className="secondary">Register</button>
    </div>
  );
}

export default Login;
