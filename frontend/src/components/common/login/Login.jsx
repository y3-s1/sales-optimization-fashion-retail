import React, { useContext, useState } from 'react';
import demandAxios from '../../../BaseURL';
import './login.css'
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setLoading(true);
    setError('');

    try {
      const response = await demandAxios.post('/authenti/login', {
        username: email,
        password
      }, { withCredentials: true });

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      
      // Handle successful login (e.g., redirect to dashboard or store user data)
      console.log('Login successful:', response.data);
      // Redirect to another page (e.g., dashboard)
      navigate(response.data.redirect);
    } catch (error) {
      setError('Invalid email or password.');
      console.error('Login error:', error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="login-error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
