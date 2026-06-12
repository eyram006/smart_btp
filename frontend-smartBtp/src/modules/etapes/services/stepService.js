import api from '../../../services/api';

export const stepService = {
  /**
   * Récupère la liste des étapes d'un chantier.
   * @param {string|number} chantierId - ID du chantier
   * @returns {Promise} Requête Axios
   */
  getSteps(chantierId) {
    return api.get(`/chantiers/${chantierId}/etapes`);
  },

  /**
   * Crée une nouvelle étape pour un chantier.
   * @param {string|number} chantierId - ID du chantier
   * @param {Object} stepData - Données de l'étape
   * @returns {Promise} Requête Axios
   */
  createStep(chantierId, stepData) {
    return api.post(`/chantiers/${chantierId}/etapes`, stepData);
  },

  /**
   * Met à jour une étape existante.
   * @param {string|number} stepId - ID de l'étape
   * @param {Object} stepData - Données de l'étape
   * @returns {Promise} Requête Axios
   */
  updateStep(stepId, stepData) {
    return api.put(`/etapes/${stepId}`, stepData);
  },

  /**
   * Supprime une étape de chantier.
   * @param {string|number} stepId - ID de l'étape
   * @returns {Promise} Requête Axios
   */
  deleteStep(stepId) {
    return api.delete(`/etapes/${stepId}`);
  }
};
