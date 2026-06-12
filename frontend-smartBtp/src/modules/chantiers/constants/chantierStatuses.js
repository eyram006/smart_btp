/**
 * Statuts possibles d'un chantier.
 * Source unique de vérité — utilisé dans les formulaires et les badges.
 * Valeurs attendues par l'API Laravel.
 */
export const CHANTIER_STATUSES = [
  { value: 'planning', label: 'En planification', bg: 'bg-surface-container-high',   text: 'text-on-surface-variant', border: 'border-outline-variant' },
  { value: 'active',   label: 'Active',           bg: 'bg-secondary-container',       text: 'text-on-secondary-container', border: 'border-secondary/20' },
  { value: 'paused',   label: 'En pause',         bg: 'bg-tertiary-fixed',            text: 'text-on-tertiary-fixed', border: 'border-tertiary/20' },
  { value: 'done',     label: 'Terminé',          bg: 'bg-primary-container',         text: 'text-on-primary-container', border: 'border-primary/20' },
];
