import { useState } from 'react';
import { chantierService } from '../services/chantierService';
import { validateChantier } from '../validations/chantierValidation';

/**
 * Hook gérant la création d'un chantier.
 * Validation côté client + appel API Laravel.
 *
 * @returns {{ submit, loading, success, errors, createdChantier, reset }}
 */
export default function useCreateChantier() {
  const [loading,         setLoading]         = useState(false);
  const [success,         setSuccess]         = useState(false);
  const [errors,          setErrors]          = useState({});
  const [createdChantier, setCreatedChantier] = useState(null);

  /**
   * Soumet le formulaire de création.
   * @param {Object} formData - { name, location, surface, start_date, status }
   * @param {Function} [onSuccess] - Callback appelé avec les données Laravel en retour
   */
  const submit = async (formData, onSuccess) => {
    // 1. Validation client
    const clientErrors = validateChantier(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return { success: false };
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const response = await chantierService.createChantier(formData);
      setCreatedChantier(response.data);
      setSuccess(true);
      if (onSuccess) onSuccess(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response?.status === 422) {
        // Erreurs de validation Laravel
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
    setLoading(false);
    setSuccess(false);
    setErrors({});
    setCreatedChantier(null);
  };

  return { submit, loading, success, errors, setErrors, createdChantier, reset };
}
