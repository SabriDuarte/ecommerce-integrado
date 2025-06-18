import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-3">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Categoría: {product.category}</Card.Text>
          <Card.Text>Precio: ${product.price}</Card.Text>
          <Button variant="primary">Comprar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
