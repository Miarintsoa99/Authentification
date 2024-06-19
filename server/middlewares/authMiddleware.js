const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé: Pas de token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;
