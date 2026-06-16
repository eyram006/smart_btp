import React from 'react';

/**
 * État vide affiché quand aucune étape n'est enregistrée pour ce chantier.
 */
export default function EmptyStepsState({ onCreateFirst }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6 bg-surface-white border border-outline-variant rounded-xl shadow-sm gap-6 max-w-lg mx-auto">

      <div className="w-20 h-20 bg-primary-container text-on-primary flex items-center justify-center rounded-full shadow-inner">
        <span className="material-symbols-outlined" style={{ fontSize: '48px' }} aria-hidden="true">construction</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-headline-md font-headline-md text-on-surface">Aucune étape enregistrée</h3>
        <p className="text-body-sm font-body-sm text-on-surface-variant max-w-sm">
          Planifiez les différentes phases de votre chantier en ajoutant des étapes de gros œuvre, second œuvre ou de contrôle qualité.
        </p>
      </div>

      <button
        onClick={onCreateFirst}
        className="flex items-center justify-center gap-2 bg-primary text-on-primary h-touch-target-min px-6 rounded-lg font-bold shadow-md active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined" data-icon="add">add</span>
        Ajouter une étape
      </button>
    </div>
  );
}
