import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos React, necesario para definir componentes React
import React from 'react';

// Importamos el componente Login desde la carpeta pages
import Login from './pages/Login';


import Register from './pages/Register';

import ProductCatalog from './pages/ProductCatalog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductCatalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// Exportamos el componente App para que pueda usarse en otros archivos (por ejemplo, index.jsx)
