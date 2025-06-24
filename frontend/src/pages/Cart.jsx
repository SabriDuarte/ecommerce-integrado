import { useCartStore } from '../store/cartStore'
import { Container, Table, Button } from 'react-bootstrap'
import styles from './Cart.module.css'

function Cart() {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)

  const total = cart.reduce((acc, item) => acc + item.precio, 0)

  return (
    <Container className={styles.cartContainer}>
      <h2 className="mb-4">🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="mt-3">Total: ${total}</h4>
          <Button variant="outline-danger" onClick={clearCart}>Vaciar carrito</Button>
        </>
      )}
    </Container>
  )
}

export default Cart
