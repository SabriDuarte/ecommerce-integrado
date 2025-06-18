import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="text-center mt-5">
      <h1>Bienvenida a tu E-Commerce</h1>
      <p>Iniciá sesión o registrate para comenzar</p>
      <div className="mt-3 d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
        <Link to="/register" className="btn btn-secondary">Registrarse</Link>
      </div>
    </div>
  );
}

export default Home;