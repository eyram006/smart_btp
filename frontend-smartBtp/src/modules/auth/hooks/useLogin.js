import { useState } from 'react';
import { authService } from '../services/authService';
import { validateLogin } from '../validations/loginValidation';

/**
 * Hook personnalisé gérant l'état de connexion de l'utilisateur.
 * @returns {Object} États (loading, success, errors) et méthode de connexion
 */
export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Exécute l'action de connexion.
   * @param {Object} formData - Données du formulaire (email, password, remember)
   * @param {Function} onSuccess - Callback appelé après une connexion réussie
   * @returns {Promise<boolean>} Indique si la connexion a réussi
   */
  const login = async (formData, onSuccess) => {
    // 1. Validation locale côté client
    const clientErrors = validateLogin(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return false;
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const response = await authService.login(formData);
      setSuccess(true);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return true;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        
        if (status === 422) {
          // Erreurs de validation Laravel (de type : { message: "...", errors: { email: [...] } })
          setErrors(error.response.data.errors || {});
        } else if (status === 403) {
          // Cas de compte désactivé
          setErrors({
            general: "Votre compte SMART-BTP est actuellement désactivé. Contactez l'administrateur.",
          });
        } else if (status === 401) {
          // Cas de session expirée / non autorisé
          setErrors({
            general: "Session expirée ou identifiants incorrects. Veuillez réessayer.",
          });
        } else {
          // Erreur serveur globale
          setErrors({
            general: error.response.data.message || 'Une erreur serveur est survenue. Veuillez réessayer.',
          });
        }
      } else if (error.request) {
        // Erreur réseau / serveur inaccessible
        setErrors({
          general: 'Connexion au serveur impossible. Veuillez vérifier votre connexion internet.',
        });
      } else {
        setErrors({
          general: "Une erreur inattendue s'est produite.",
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    success,
    errors,
    setErrors,
  };
}
