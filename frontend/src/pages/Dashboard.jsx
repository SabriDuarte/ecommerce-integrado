import { useEffect, useState } from 'react'
import api from '../services/apiService'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useCartStore } from '../store/cartStore'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const addToCart = useCartStore((state) => state.addToCart)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data)
        setFiltered(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const filteredData = products.filter(product =>
      (!search || (product.nombre?.toLowerCase() || '').includes(search.toLowerCase())) &&
      (!category || product.category === category)
    )
    setFiltered(filteredData)
  }, [search, category, products])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Container className={`mt-4 ${styles.dashboard}`}>
      <div className={styles.navbar}>
        <Link to="/cart" className={styles.navLink}>🛒 Ver Carrito</Link>
        <Link to="/profile" className={styles.navLink}>👤 Mi Perfil</Link>
        <Button variant="outline-danger" onClick={logout}>Cerrar Sesión</Button>
      </div>

      <h2 className="mb-3">Catálogo de Productos</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control placeholder="Buscar por nombre" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col md={4}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas las categorías</option>
            <option value="dulces">Dulces</option>
            <option value="saladas">Saladas</option>
            <option value="arabes">Árabes</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Button variant="secondary" onClick={() => { setSearch(''); setCategory('') }}>
            Limpiar filtros
          </Button>
        </Col>
      </Row>

      <Row>
        {filtered.map(product => (
          <Col key={product._id} md={4} className="mb-3">
            <Card className={styles.productCard}>
              <Card.Img
                variant="top"
                src={product.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                alt={product.nombre}
              />
              <Card.Body>
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text>Precio: ${product.precio}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="success" onClick={() => addToCart(product)}>
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Dashboard
