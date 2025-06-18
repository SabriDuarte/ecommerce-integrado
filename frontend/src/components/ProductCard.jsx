import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-3">
      <Card>
        <Card.Body>
          <Card.Title>{product.nombre}</Card.Title>
          <Card.Text>Descrpción: {product.description}</Card.Text>
          <Card.Text>Precio: ${product.price}</Card.Text>
          <Card.Img
            variant="top"
            src={product.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
            alt={product.nombre}
          />

          <Button variant="primary">Comprar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
