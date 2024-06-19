import axios from 'axios';

// Fonction pour l'enregistrement
export const register = async (values) => {
  try {
    const res = await axios.post('http://localhost:5001/api/register', values);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Fonction pour la connexion
export const login = async (values) => {
  try {
    const res = await axios.post('http://localhost:5001/api/login', values);
    return res.data;
  } catch (err) {
    throw err;
  }
};
