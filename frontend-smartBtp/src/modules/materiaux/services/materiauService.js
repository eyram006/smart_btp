import api from '../../../services/api';

/**
 * Service API pour la gestion des matériaux.
 * Endpoints Laravel REST — aucune donnée hardcodée.
 */
export const materiauService = {

  /**
   * Récupère la liste des matériaux.
   * @param {Object} params - Filtres optionnels (categorie, search...)
   */
  getMateriaux(params = {}) {
    return api.get('/materiaux', { params });
  },

  /**
   * Récupère un matériau par son ID.
   * @param {number|string} id
   */
  getMateriau(id) {
    return api.get(`/materiaux/${id}`);
  },

  /**
   * Crée un nouveau matériau.
   * @param {number|string} chantierId - ID du chantier
   * @param {Object} data - { nom, description, categorie, unite, quantite_initiale, seuil_alerte }
   */
  createMateriau(chantierId, data) {
    return api.post(`/chantiers/${chantierId}/materiaux`, data);
  },

  /**
   * Met à jour un matériau existant.
   * @param {number|string} id
   * @param {Object} data
   */
  updateMateriau(id, data) {
    return api.put(`/materiaux/${id}`, data);
  },

  /**
   * Supprime un matériau.
   * @param {number|string} id
   */
  deleteMateriau(id) {
    return api.delete(`/materiaux/${id}`);
  },
};

