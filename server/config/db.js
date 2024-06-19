const mysql = require("mysql");
require('dotenv').config(); // Ajoutez cette ligne pour charger les variables d'environnement

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;
