import api from '../../../services/api';

export const authService = {
  /**
   * Enregistre un nouvel utilisateur.
   * @param {Object} data - Les données du formulaire d'inscription
   * @returns {Promise}
   */
  register(data) {
    return api.post('/register', data);
  },

  /**
   * Authentifie un utilisateur et retourne la session / token.
   * @param {Object} credentials - Identifiants (email, password, remember)
   * @returns {Promise}
   */
  login(credentials) {
    return api.post('/login', credentials);
  },

  /**
   * Invalide la session de l'utilisateur actuel.
   * @returns {Promise}
   */
  logout() {
    return api.post('/logout');
  },

  /**
   * Récupère les données de l'utilisateur actuellement authentifié.
   * @returns {Promise}
   */
  getCurrentUser() {
    return api.get('/user');
  }
};
