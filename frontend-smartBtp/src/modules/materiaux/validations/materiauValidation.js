/**
 * Validation côté client du formulaire de création d'un matériau.
 * @param {Object} data - { nom, categorie, unite, description, seuil_alerte, quantite_initiale }
 * @returns {Object} errors — vide si tout est valide
 */
export const validateMateriau = (data) => {
  const errors = {};

  if (!data.nom?.trim()) {
    errors.nom = ['Le nom du matériau est obligatoire.'];
  } else if (data.nom.trim().length < 2) {
    errors.nom = ['Le nom doit comporter au moins 2 caractères.'];
  }

  if (!data.categorie?.trim()) {
    errors.categorie = ['La catégorie est obligatoire.'];
  }

  if (!data.unite?.trim()) {
    errors.unite = ['L\'unité est obligatoire.'];
  }

  if (data.seuil_alerte === '' || data.seuil_alerte === null || data.seuil_alerte === undefined) {
    errors.seuil_alerte = ['Le seuil d\'alerte est obligatoire.'];
  } else {
    const val = Number(data.seuil_alerte);
    if (isNaN(val) || val < 0) {
      errors.seuil_alerte = ['Le seuil d\'alerte doit être un nombre positif.'];
    }
  }

  if (data.quantite_initiale === '' || data.quantite_initiale === null || data.quantite_initiale === undefined) {
    errors.quantite_initiale = ['La quantité initiale est obligatoire.'];
  } else {
    const val = Number(data.quantite_initiale);
    if (isNaN(val) || val < 0) {
      errors.quantite_initiale = ['La quantité initiale doit être un nombre positif.'];
    }
  }

  return errors;
};

