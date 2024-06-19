const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/usersModel");

const authController = {
  // Méthode pour l'inscription d'un nouvel utilisateur
  register: (req, res) => {
    // Extraction des données de l'utilisateur depuis la requête
    const { name, email, password } = req.body;
    // Appel de la méthode create du modèle utilisateur pour créer un nouvel utilisateur
    User.create(name, email, password, (err, result) => {
      if (err) {
        return res.json({
          Error: "Erreur sur l'insertion dans la base de données ",
        });
      }
      return res.json({ Status: "Success" });
    });
  },

  // Méthode pour la connexion d'un utilisateur existant
  login: (req, res) => {
    const { email, password } = req.body;

    // Appel de la méthode findByEmail du modèle utilisateur pour trouver un utilisateur par email
    User.findByEmail(email, (err, data) => {
      if (err) return res.json({ Error: "Connexion erreur sur le serveur" });

      if (data.length > 0) {
        bcrypt.compare(
          password.toString(),
          data[0].password,
          (err, response) => {
            if (err)
              return res.json({ Error: "Comparaison mot de passe erreur" });

            if (response) {
              // Génération d'un token JWT
              const name = data[0].name;
              const token = jwt.sign({ name }, "jwt-secret-key", {
                expiresIn: "1h",
              });

              // Renvoi du token et du statut de succès id et name
              return res.json({ Status: "Success", token , name });
            } else {
              return res.json({ Error: "Mot de passe ne correspond pas" });
            }
          }
        );
      } else {
        return res.json({ Error: "Email n'existe pas" });
      }
    });
  },

};

module.exports = authController;
