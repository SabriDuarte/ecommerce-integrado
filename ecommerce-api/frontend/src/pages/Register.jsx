import '../styles/Register.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
      });
      setSuccess('Usuario registrado con éxito. Ahora podés iniciar sesión.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className= "register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
          <label>Nombre</label><br />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
        <button type="submit">Registrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <p>
         ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión acá</Link>
      </p>

    </div>
    
  );
  
}

export default Register;
