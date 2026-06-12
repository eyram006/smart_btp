import api from '../../../services/api';

/**
 * Service API pour les mouvements de stock et les données associées.
 * Endpoints Laravel REST — aucune donnée hardcodée.
 */
export const stockService = {

  /**
   * Récupère la liste des stocks.
   * @param {Object} params - Filtres optionnels (chantier_id, materiau_id...)
   */
  getStocks(params = {}) {
    return api.get('/stocks', { params });
  },

  /**
   * Récupère la liste des mouvements de stock.
   * @param {Object} params - Filtres optionnels (chantier_id, type, material_id...)
   */
  getMouvements(params = {}) {
    return api.get('/mouvements', { params });
  },

  /**
   * Crée un nouveau mouvement de stock.
   * @param {Object} data - { type, materiau_id, etape_id, quantite, notes, chantier_id }
   */
  createMouvement(data) {
    return api.post('/mouvements', data);
  },

  /**
   * Supprime un mouvement de stock.
   * @param {number|string} id
   */
  deleteMouvement(id) {
    return api.delete(`/mouvements/${id}`);
  },

  /**
   * Récupère la liste des matériaux disponibles (pour le select).
   * @param {Object} params - Filtres optionnels (chantier_id...)
   */
  getMateriaux(params = {}) {
    return api.get('/materiaux', { params });
  },

  /**
   * Récupère le stock disponible d'un matériau.
   * @param {number|string} materiauId
   */
  getStockDisponible(materiauId) {
    return api.get(`/materiaux/${materiauId}/stock`);
  },

  /**
   * Récupère les étapes d'un chantier (pour le select).
   * @param {number|string} chantierId
   */
  getEtapesParChantier(chantierId) {
    return api.get(`/chantiers/${chantierId}/etapes`);
  },

  /**
   * Crée un stock initial pour un matériau.
   * @param {Object} data - { chantier_id, materiau_id, quantite, seuil_alerte }
   */
  createStock(data) {
    return api.post('/stocks', data);
  },
};
