/**
 * Valide les champs du formulaire de connexion.
 * @param {Object} formData - Les données du formulaire (email, password)
 * @returns {Object} Un objet contenant les erreurs de validation (vide si tout est correct)
 */
export const validateLogin = (formData) => {
  const errors = {};

  if (!formData.email) {
    errors.email = ["L'adresse e-mail est obligatoire."];
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = ["L'adresse e-mail n'est pas valide."];
  }

  if (!formData.password) {
    errors.password = ["Le mot de passe est obligatoire."];
  } else if (formData.password.length < 6) {
    errors.password = ["Le mot de passe doit comporter au moins 6 caractères."];
  }

  return errors;
};
