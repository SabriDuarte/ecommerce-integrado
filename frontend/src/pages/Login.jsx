import '../styles/Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Login exitoso');

      // Redirigir al catalogo
      navigate('/products');

    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className= "login-container" >
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
          <label>Email</label><br />
          <input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            required
          />

          <label>Contraseña</label><br />
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)} 
            required
          />

        <button type="submit">Entrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        ¿No tenés cuenta? <Link to="/register">Registrate acá</Link>
      </p>


    </div>

  );
}

export default Login;
