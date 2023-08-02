module.exports = {
  secret: 'tu_secreto', // Aquí debes poner el mismo secreto que usas para firmar y verificar los tokens
  expires: '24h', // Opcional: tiempo de expiración del token
  rounds: 10 // Opcional: número de rondas para el algoritmo de hash de bcrypt
};
