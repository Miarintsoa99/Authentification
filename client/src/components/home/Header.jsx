import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          <button  className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
