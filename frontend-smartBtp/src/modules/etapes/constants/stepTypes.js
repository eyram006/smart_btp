export const STEP_TYPES = {
  gros_oeuvre: {
    label: 'Gros Œuvre',
    bg: 'bg-primary-container',
    text: 'text-on-primary-container',
    border: 'border-primary/20',
  },
  second_oeuvre: {
    label: 'Second Œuvre',
    bg: 'bg-secondary-container',
    text: 'text-on-secondary-container',
    border: 'border-secondary/20',
  },
  finition: {
    label: 'Finition',
    bg: 'bg-tertiary-fixed',
    text: 'text-on-tertiary-fixed',
    border: 'border-tertiary/20',
  },
  installation: {
    label: 'Installation',
    bg: 'bg-surface-container-highest',
    text: 'text-on-surface',
    border: 'border-outline-variant',
  },
  controle: {
    label: 'Contrôle & Qualité',
    bg: 'bg-error-container',
    text: 'text-on-error-container',
    border: 'border-error/20',
  },
};

export const STEP_STATUSES = {
  termine: {
    label: 'Terminé',
    bg: 'bg-secondary/10',
    text: 'text-secondary',
    border: 'border-secondary/20',
    icon: 'check_circle',
  },
  en_cours: {
    label: 'En Cours',
    bg: 'bg-primary/10',
    text: 'text-primary',
    border: 'border-primary/20',
    icon: 'sync',
  },
  a_venir: {
    label: 'À Venir',
    bg: 'bg-on-surface-variant/10',
    text: 'text-on-surface-variant',
    border: 'border-outline-variant',
    icon: 'schedule',
  },
};
