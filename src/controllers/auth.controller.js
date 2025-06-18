// 1. Importar dependencias y modelo
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 2. Controlador de registro
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body; // ahora también recibimos el rol

  try {
    // Verificar si el email ya está en uso
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario (solo para desarrollo: se permite definir el rol)
    await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || 'cliente'  // si no se especifica, queda como 'cliente'
    });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};


// 3. Controlador de login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};