const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'Token de autenticación inválido' });
    }

    req.userId = decoded.user.id; // Asumiendo que el token contiene la información del usuario en 'user' y el campo 'id' identifica al usuario.
    next();
  });
}

module.exports = authenticateToken;
