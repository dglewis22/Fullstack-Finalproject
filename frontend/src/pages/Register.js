import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);  // State to track checkbox
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/; // Regular expression to check for a number
    return password.length >= minLength && hasNumber.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate that password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    // Validate password requirements
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain at least one number.');
      setSuccessMessage('');
      return;
    }

    // Check if terms and conditions are accepted
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions to register.');
      setSuccessMessage('');
      return;
    }

    const response = await fetch('http://localhost:5004/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccessMessage('Account created!');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(data.message || 'Registration failed.');
      setSuccessMessage('');
    }
  };

  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="container register-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleRegister}>
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
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div>
          <input
            type="checkbox"
            id="terms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          <label htmlFor="terms">
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
          </label>
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={goToLogin}>Back To Login</button>
      </form>
    </div>
  );
}

export default Register;
