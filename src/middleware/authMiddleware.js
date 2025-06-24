//Importamos la libreria JWT para verificar,firmar y decodificar tokens
const jwt = require('jsonwebtoken')

//declro una función middleware que se ejecuta antes de llegar a la ruta protegida
//Recibe los objetos req(petición),rest(respuesta) y next(para pasar al siguiente middleware)
const authenticateToken = (req, res, next) => {

  //Extrae el header Authorization
  const authHeader = req.headers['authorization']

  //Si existe el header, separa el string en 2 partes (Bearer y Token) y guarda solo el token
  const token = authHeader && authHeader.split(' ')[1]

  //Si no se envió, responde con 401
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  //usa jwt.verify para verificar que el token sea valido
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //si es válido se guarda info en req.user(id,rol,etc)
    req.user = decoded
    //llama a next para que la solicitud continúe a la ruta protegida
    next()
    //si es inválido responde con 403
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado' })
  }
}

//exporta el middleware para poder usarlo en otras rutas
module.exports = authenticateToken

//El middleware asegura que sólo usuarios autenticados con token válido puedan acceder a ciertas rutas
