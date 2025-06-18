import { useCartStore } from '../store/cartStore'
import { Container, Table, Button } from 'react-bootstrap'

function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Container className="mt-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeFromCart(item._id)}>
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: ${total}</h4>
          <Button variant="warning" onClick={clearCart}>
            Vaciar carrito
          </Button>
        </>
      )}
    </Container>
  )
}

export default Cart
