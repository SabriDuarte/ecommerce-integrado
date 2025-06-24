import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styles from './Navbar.module.css'

function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={styles.navbar}>
      <Link to="/dashboard" className={styles.link}>🏠 Dashboard</Link>
      <Link to="/cart" className={styles.link}>🛒 Carrito</Link>
      <Link to="/profile" className={styles.link}>👤 Perfil</Link>
      <Button variant="outline-danger" size="sm" onClick={logout}>Cerrar sesión</Button>
    </div>
  )
}

export default Navbar

