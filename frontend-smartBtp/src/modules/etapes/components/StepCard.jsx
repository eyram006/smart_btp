import React from 'react';

/**
 * Carte interactive représentant une phase/étape de chantier.
 */
export default function StepCard({ step, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    // Format "01/10/2023" as seen in the HTML mockup
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  };

  // Type styling based on mockup
  const isSecondOeuvre = step.type === 'second_oeuvre' || step.type === 'Second œuvre';
  const typeBadgeClass = isSecondOeuvre
    ? 'bg-tertiary-fixed text-on-tertiary-fixed'
    : 'bg-secondary-container text-on-secondary-container';
  const typeLabel = isSecondOeuvre ? 'Second œuvre' : 'Gros œuvre';

  const pct = Math.min(Math.max(Number(step.pourcentage_avancement) || 0, 0), 100);

  return (
    <div className="bg-surface-white border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-label-caps font-label-caps w-fit ${typeBadgeClass}`}>
            {step.type ? step.type : typeLabel}
          </span>
          <h3 className="text-headline-md font-headline-md text-on-surface mt-1">{step.nom}</h3>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(step)}
            className="p-2 text-on-surface-variant hover:text-primary active:scale-90 transition-transform"
            aria-label={`Modifier l'étape ${step.nom}`}
          >
            <span className="material-symbols-outlined" data-icon="edit">edit</span>
          </button>
          <button 
            onClick={() => onDelete(step.id)}
            className="p-2 text-on-surface-variant hover:text-error active:scale-90 transition-transform"
            aria-label={`Supprimer l'étape ${step.nom}`}
          >
            <span className="material-symbols-outlined" data-icon="delete">delete</span>
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 border-t border-outline-variant pt-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]" data-icon="calendar_today">calendar_today</span>
          <span className="text-body-sm font-body-sm text-on-surface-variant">Début: {formatDate(step.date_debut)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]" data-icon="event_available">event_available</span>
          <span className="text-body-sm font-body-sm text-on-surface-variant">Fin: {formatDate(step.date_fin)}</span>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="mt-4 w-full bg-surface-container-highest h-1.5 rounded-full">
        <div className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}
