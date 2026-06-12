/**
 * Types de mouvements de stock.
 * Correspond aux valeurs attendues par l'API Laravel.
 */
export const MOUVEMENT_TYPES = {
  entree: {
    value: 'entree',
    label: 'ENTRÉE',
    icon: 'south_west',
    color: 'text-secondary',
    bg: 'bg-secondary-container',
    text: 'text-on-secondary-container',
    border: 'border-secondary/20',
    description: 'Réception / livraison de matériaux',
  },
  sortie: {
    value: 'sortie',
    label: 'SORTIE',
    icon: 'north_east',
    color: 'text-tertiary',
    bg: 'bg-tertiary-fixed',
    text: 'text-on-tertiary-fixed',
    border: 'border-tertiary/20',
    description: 'Consommation sur chantier',
  },
};
