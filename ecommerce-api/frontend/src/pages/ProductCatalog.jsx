import '../styles/ProductCatalog.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ProductCatalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Llamada a la API para traer productos
    axios.get('http://localhost:3000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <div className="catalog-container">
      <h2>Catálogo de Productos</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img className="product-image" src={product.imagenUrl} alt={product.nombre} />
            <h3 className="product-name">{product.nombre}</h3>
            <p className="product-description">{product.descripcion}</p>
            <p className="price">${product.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;
