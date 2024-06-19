import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../../assets/auth.jpg";
import { register } from "../../services/authService";
import useErrorHandling from '../../hooks/useErrorHandling';

function RegisterForm() {
  // État local pour stocker les valeurs du formulaire
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Gestion des erreurs avec useErrorHandling
  const { error, handleError } = useErrorHandling();

  // Navigation
  const navigate = useNavigate();

  // Manipuler Soumettre
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifie si les mots de passe correspondent
    if (values.password !== values.confirmPassword) {
      // Si les mots de passe ne correspondent pas, définit le message d'erreur
      handleError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      // Appelle la fonction d'enregistrement du service d'authentification avec les valeurs du formulaire
      const res = await register(values);
      // Vérifie si l'enregistrement a réussi
      if (res.Status === "Success") {
        navigate("/login");
        // Réinitialise les valeurs du formulaire après une soumission réussie
        setValues({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Gère l'erreur en affichant le message d'erreur reçu
        handleError(res.Error);
      }
    } catch (err) {
      // Gestion des erreurs réseau ou autres
      console.log(err);
      handleError("Erreur lors de l'enregistrement. Veuillez réessayer.");
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <img src={authImage} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-6 col-lg-7 col-xl-5 offset-xl-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-4 rounded shadow"
            >
              <div className="text-center mb-4">
                <h2>S'inscrire</h2>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}{" "}
              {/* Affichage du message d'erreur */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example1"
                  className="form-control form-control-lg"
                  placeholder="Entrez votre nom"
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Entrez une adresse email valide"
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Entrez un mot de passe"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example5"
                  className="form-control form-control-lg"
                  placeholder="Confirmez le mot de passe"
                  value={values.confirmPassword}
                  onChange={(e) =>
                    setValues({ ...values, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  S'inscrire
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="link-danger">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
