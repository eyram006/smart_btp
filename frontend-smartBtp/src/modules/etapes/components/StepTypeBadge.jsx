import React from 'react';
import { STEP_TYPES } from '../constants/stepTypes';

/**
 * Composant de badge stylisé représentant la catégorie de travaux d'une étape.
 * @param {Object} props - Propriétés (type)
 */
export default function StepTypeBadge({ type }) {
  const meta = STEP_TYPES[type] || {
    label: type || 'Autre',
    bg: 'bg-surface-container',
    text: 'text-on-surface-variant',
    border: 'border-outline-variant',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${meta.bg} ${meta.text} ${meta.border}`}>
      {meta.label}
    </span>
  );
}
