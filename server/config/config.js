require('dotenv').config(); // Ajoutez cette ligne pour charger les variables d'environnement

module.exports = {
    secretKey: process.env.JWT_SECRET_KEY
};
