import { useCartStore } from '../store/cartStore'
import { Container, Table, Button, Card} from 'react-bootstrap'

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCartStore()

  return (
    <Container className="mt-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
           {cart.map((item) => (
            <Card key={item._id} className="mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Precio: ${item.price}</Card.Text>
                <Card.Text>Cantidad: {item.quantity}</Card.Text>
                <Button variant="secondary" onClick={() => decreaseQuantity(item._id)}>-</Button>{' '}
                <Button variant="secondary" onClick={() => increaseQuantity(item._id)}>+</Button>{' '}
                <Button variant="danger" onClick={() => removeFromCart(item._id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          ))}

          <h4 className="mt-3">
            Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </h4>

          <Button variant="outline-danger" onClick={clearCart} className="mt-2">Vaciar carrito</Button>
        </>
      )}
    </Container>
  )
}

export default Cart
