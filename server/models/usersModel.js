// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const salt = 10;

const User = { 
    // Méthode pour créer un nouvel utilisateur
  create: (name, email, password, callback) => { 
     // Hachage du mot de passe
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return callback(err);

      const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
      const values = [name, email, hash];
      
      // Exécution de la requête SQL
      db.query(sql, [values], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      });
    });
  },
  
  // Méthode pour trouver un utilisateur par email
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?"; 
    // Exécution de la requête SQL
    db.query(sql, [email], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },
};

module.exports = User;

