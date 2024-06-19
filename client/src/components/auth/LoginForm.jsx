import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../../assets/auth.jpg";
import { login } from "../../services/authService";
import useErrorHandling from '../../hooks/useErrorHandling';

function LoginForm() {
  // État local pour stocker les valeurs du formulaire
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Gestion des erreurs avec useErrorHandling
  const { error, handleError } = useErrorHandling();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appelle la fonction de connexion du service d'authentification avec les valeurs du formulaire
      const res = await login(values);
      // Vérifie si la connexion a réussi
      if (res.Status === "Success") {
        // Stocke le token et l'email de l'utilisateur dans le localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("name", res.name);
        localStorage.setItem("email", values.email);
        // Redirige l'utilisateur vers la page d'accueil
        navigate("/");
      } else {
        // Si la connexion a échoué, définit le message d'erreur
        handleError(res.Error);
      }
    } catch (err) {
      // Si une erreur se produit pendant l'appel à l'API, la log dans la console et gère l'erreur
      console.log(err);
      handleError("Erreur lors de la connexion. Veuillez réessayer.");
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
                <h2>Connexion</h2>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Entrez votre adresse email"
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
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Entrez votre mot de passe"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Se connecter
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Vous n'avez pas de compte ?{" "}
                  <Link to="/register" className="link-danger">
                    S'inscrire
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

export default LoginForm;
