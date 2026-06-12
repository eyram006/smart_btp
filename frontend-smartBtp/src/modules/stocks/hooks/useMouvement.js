import { useState } from 'react';
import { stockService } from '../services/stockService';

/**
 * Hook gérant la soumission d'un mouvement de stock.
 * Séparé de la logique de liste pour rester cohérent avec l'architecture modulaire.
 *
 * @returns {{ submit, loading, success, errors, reset }}
 */
export default function useMouvement() {
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [errors,  setErrors]    = useState({});

  /**
   * Soumet un mouvement de stock au backend Laravel.
   * @param {Object} formData - Données du formulaire
   * @param {Function} [onSuccess] - Callback appelé après succès
   */
  const submit = async (formData, onSuccess) => {
    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const response = await stockService.createMouvement(formData);
      setSuccess(true);
      if (onSuccess) onSuccess(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({
          general: err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.',
        });
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setErrors({});
    setLoading(false);
  };

  return { submit, loading, success, errors, setErrors, reset };
}
