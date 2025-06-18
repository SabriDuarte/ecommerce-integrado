import { useEffect, useState } from 'react'
import api from '../services/apiService'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useCartStore } from '../store/cartStore'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data)
        setFiltered(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const filteredData = products.filter(p =>
      (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
      (!category || p.category === category)
    )
    setFiltered(filteredData)
  }, [search, category, products])
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Catálogo de Productos</h2>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control placeholder="Buscar por nombre" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col md={4}>
          <Form.Select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas las categorías</option>
            <option value="dulces">Dulces</option>
            <option value="saladas">Saladas</option>
            <option value="arabes">Árabes</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Button variant="secondary" onClick={() => { setSearch(''); setCategory('') }}>Limpiar filtros</Button>
        </Col>
      </Row>
      <Row>
        {filtered.map(product => (
          <Col key={product._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${product.price}</Card.Text>
                <Card.Text>Categoría: {product.category}</Card.Text>
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

