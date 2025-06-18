import { useState } from 'react'
import { login } from '../services/authService'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Container } from 'react-bootstrap'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login: setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user, token } = await login(email, password)
      setAuth(user, token)
      navigate('/dashboard')
    } catch (error) {
      alert('Login fallido. Verificá tus credenciales.',error)
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">Ingresar</Button>
      </Form>
    </Container>
  )
}

export default Login

