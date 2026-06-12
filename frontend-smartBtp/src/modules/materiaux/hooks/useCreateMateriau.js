import { useState } from 'react';
import { materiauService } from '../services/materiauService';
import { stockService } from '../../stocks/services/stockService';
import { validateMateriau } from '../validations/materiauValidation';

/**
 * Hook gérant la création d'un matériau avec son stock initial.
 * Implémente un workflow transactionnel sécurisé :
 *   STEP 1 : Créer le matériau
 *   STEP 2 : Créer le stock initial
 * Si STEP 2 échoue, l'UI reste en état d'erreur récupérable.
 *
 * @param {number|string} chantierId - ID du chantier (requis pour stock initial)
 * @returns {{ submit, loading, success, errors, createdMateriau, reset }}
 */
export default function useCreateMateriau(chantierId) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [createdMateriau, setCreatedMateriau] = useState(null);

  /**
   * Soumet le formulaire de création matériau + stock initial.
   * @param {Object} formData - { nom, categorie, unite, description, seuil_alerte, quantite_initiale }
   * @param {Function} [onSuccess] - Callback appelé après succès complet (step 1 + step 2)
   */
  const submit = async (formData, onSuccess) => {
    // 1. Validation client
    const clientErrors = validateMateriau(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return { success: false };
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      // STEP 1 : Créer le matériau
      const materiauPayload = {
        nom: formData.nom,
        description: formData.description || null,
        categorie: formData.categorie,
        unite: formData.unite,
        quantite_initiale: Number(formData.quantite_initiale) || 0,
        seuil_alerte: Number(formData.seuil_alerte) || 0,
      };

      const materiauResponse = await materiauService.createMateriau(chantierId, materiauPayload);
      const materiauId = materiauResponse.data.id;
      setCreatedMateriau(materiauResponse.data);

      // STEP 2 : Créer le stock initial
      const stockPayload = {
        chantier_id: chantierId,
        materiau_id: materiauId,
        quantite: formData.quantite_initiale || 0,
        seuil_alerte: formData.seuil_alerte || 0,
      };

      await stockService.createStock(stockPayload);

      // Succès complet
      setSuccess(true);
      if (onSuccess) onSuccess(materiauResponse.data);
      return { success: true, data: materiauResponse.data };
    } catch (err) {
      // Gestion d'erreur
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
    setLoading(false);
    setSuccess(false);
    setErrors({});
    setCreatedMateriau(null);
  };

  return { submit, loading, success, errors, setErrors, createdMateriau, reset };
}

