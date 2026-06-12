import React from 'react';
import StepTypeBadge from './StepTypeBadge';
import StepProgress from './StepProgress';
import { STEP_STATUSES } from '../constants/stepTypes';

/**
 * Carte interactive représentant une phase/étape de chantier.
 */
export default function StepCard({ step, onEdit, onDelete }) {
  const statusMeta = STEP_STATUSES[step.statut] || {
    label: step.statut || 'Inconnu',
    bg: 'bg-surface-container-high',
    text: 'text-on-surface-variant',
    border: 'border-outline-variant',
    icon: 'help',
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  return (
    <article className="step-card bg-surface-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4 group">

      {/* Type + Statut */}
      <div className="flex justify-between items-start gap-2 flex-wrap">
        <StepTypeBadge type={step.type} />
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}>
          <span className="material-symbols-outlined leading-none" style={{ fontSize: '14px' }} aria-hidden="true">
            {statusMeta.icon}
          </span>
          {statusMeta.label}
        </span>
      </div>

      {/* Nom */}
      <h3 className="text-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
        {step.nom}
      </h3>

      {/* Dates */}
      <div className="flex items-center gap-3 text-body-sm text-on-surface-variant flex-wrap">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }} aria-hidden="true">calendar_today</span>
          {formatDate(step.date_debut)}
        </span>
        <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: '14px' }} aria-hidden="true">arrow_forward</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }} aria-hidden="true">event</span>
          {formatDate(step.date_fin)}
        </span>
      </div>

      {/* Progression */}
      <StepProgress progress={step.pourcentage_avancement} />

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 pt-2 border-t border-outline-variant/50">
        <button
          onClick={() => onEdit(step)}
          className="p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-low transition-colors focus:outline-none"
          aria-label={`Modifier l'étape ${step.nom}`}
          title="Modifier"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">edit</span>
        </button>
        <button
          onClick={() => onDelete(step.id)}
          className="p-2 text-on-surface-variant hover:text-error rounded-lg hover:bg-error-container/20 transition-colors focus:outline-none"
          aria-label={`Supprimer l'étape ${step.nom}`}
          title="Supprimer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">delete</span>
        </button>
      </div>
    </article>
  );
}
