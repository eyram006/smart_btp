import React from 'react';
import StepCard from './StepCard';

/**
 * Grille adaptative affichant la liste des étapes de chantier filtrées.
 * @param {Object} props - Propriétés (steps, onEdit, onDelete)
 */
export default function StepsList({ steps, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step) => (
        <StepCard
          key={step.id}
          step={step}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
