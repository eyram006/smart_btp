import api from '../../../services/api';

/**
 * Service API pour le dashboard des chantiers.
 * Endpoints Laravel REST — aucune donnée hardcodée.
 */
export const dashboardService = {

  /**
   * Récupère le résumé du stock pour un chantier.
   * @param {number|string} chantierId - ID du chantier actif
   */
  getStockSummary(chantierId) {
    return api.get(`/chantiers/${chantierId}/dashboard/stock-summary`);
  },

  /**
   * Récupère les alertes d'approvisionnement pour un chantier.
   * @param {number|string} chantierId - ID du chantier actif
   */
  getAlerts(chantierId) {
    return api.get(`/chantiers/${chantierId}/dashboard/alerts`);
  },

  /**
   * Récupère les derniers mouvements d'un chantier.
   * @param {number|string} chantierId - ID du chantier actif
   * @param {Object} params - Filtres optionnels (limit, offset...)
   */
  getMovements(chantierId, params = {}) {
    return api.get(`/chantiers/${chantierId}/dashboard/movements`, { params });
  },

  /**
   * Récupère les statistiques hebdomadaires de sortie de stock.
   * @param {number|string} chantierId - ID du chantier actif
   * @param {Object} params - Filtres optionnels (week, month...)
   */
  getWeeklyConsumption(chantierId, params = {}) {
    return api.get(`/chantiers/${chantierId}/dashboard/weekly-consumption`, { params });
  },

  /**
   * Récupère le chantier actif avec ses informations complètes.
   * @param {number|string} chantierId - ID du chantier actif
   */
  getChantierDetails(chantierId) {
    return api.get(`/chantiers/${chantierId}`);
  },
};
