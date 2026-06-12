/**
 * Validation côté client du formulaire de création/édition d'un chantier.
 * @param {Object} data - { name, location, surface, start_date, status }
 * @returns {Object} errors — vide si tout est valide
 */
export const validateChantier = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = ['Le nom du chantier est obligatoire.'];
  } else if (data.name.trim().length < 3) {
    errors.name = ['Le nom doit comporter au moins 3 caractères.'];
  }

  if (!data.location?.trim()) {
    errors.location = ['La localisation est obligatoire.'];
  }

  if (!data.start_date) {
    errors.start_date = ['La date de début est obligatoire.'];
  }

  if (data.surface !== '' && data.surface !== null && data.surface !== undefined) {
    const val = Number(data.surface);
    if (isNaN(val) || val < 0) {
      errors.surface = ['La surface doit être un nombre positif.'];
    }
  }

  return errors;
};
