const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [process.env.CLIENT_URL],
  methods: ["POST", "GET"],
  credentials: true 
}));


db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mysql connecté");
  }
});

// Utilisation des routes d'authentification
app.use('/api', authRoutes); 

// Protéger la route Home avec le middleware d'authentification
app.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenue sur la page Home!' });
});


// Démarrage du serveur
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serveur prêt à écouter au port ${port}`);
});
