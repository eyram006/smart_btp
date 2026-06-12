/**
 * @typedef {Object} Step
 * @property {number|string} id - Unique identifier from Laravel
 * @property {string} nom - Name of the construction phase/step
 * @property {('gros_oeuvre'|'second_oeuvre'|'finition'|'installation'|'controle')} type - Step category
 * @property {string} date_debut - ISO format date (YYYY-MM-DD)
 * @property {string} date_fin - ISO format date (YYYY-MM-DD)
 * @property {number} pourcentage_avancement - Percentage (0 to 100)
 * @property {('termine'|'en_cours'|'a_venir')} statut - Current completion status
 */
