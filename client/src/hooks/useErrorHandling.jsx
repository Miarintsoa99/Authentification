// useErrorHandling.jsx
import { useState } from 'react';

const useErrorHandling = () => {
  const [error, setError] = useState('');

  const handleError = (errorMessage) => {
    setError(errorMessage);
    // Efface l'erreur après 20 secondes
    setTimeout(() => setError(''), 20000); 
  };

  return { error, handleError };
};

export default useErrorHandling;
