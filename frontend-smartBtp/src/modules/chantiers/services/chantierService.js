import api from '../../../services/api';

/**
 * Service API pour la gestion des chantiers.
 * Endpoints Laravel REST — aucune donnée hardcodée.
 */
export const chantierService = {

  /**
   * Récupère la liste des chantiers.
   * @param {Object} params - Filtres optionnels (status, search...)
   */
  getChantiers(params = {}) {
    return api.get('/chantiers', { params });
  },

  /**
   * Récupère un chantier par son ID.
   * @param {number|string} id
   */
  getChantier(id) {
    return api.get(`/chantiers/${id}`);
  },

  /**
   * Crée un nouveau chantier.
   * @param {Object} data - { name, location, surface, start_date, status }
   */
  createChantier(data) {
    return api.post('/chantiers', data);
  },

  /**
   * Met à jour un chantier existant.
   * @param {number|string} id
   * @param {Object} data
   */
  updateChantier(id, data) {
    return api.put(`/chantiers/${id}`, data);
  },

  /**
   * Supprime un chantier.
   * @param {number|string} id
   */
  deleteChantier(id) {
    return api.delete(`/chantiers/${id}`);
  },
};
