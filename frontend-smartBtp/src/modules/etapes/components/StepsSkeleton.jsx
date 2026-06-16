import React from 'react';

/**
 * Skeleton de chargement pour la grille des étapes.
 * Affiche 6 cartes placeholder animées.
 */
export default function StepsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4" aria-busy="true" aria-label="Chargement des étapes...">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-surface-white p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
          {/* Type + Statut */}
          <div className="flex justify-between items-center gap-2">
            <div className="skeleton h-6 w-24 rounded-full bg-surface-container-high" />
            <div className="skeleton h-6 w-20 rounded-full bg-surface-container-high" />
          </div>
          {/* Nom */}
          <div className="skeleton h-6 w-3/4 rounded bg-surface-container-high" />
          <div className="skeleton h-4 w-1/2 rounded bg-surface-container-high" />
          {/* Dates */}
          <div className="flex gap-3">
            <div className="skeleton h-4 w-24 rounded bg-surface-container-high" />
            <div className="skeleton h-4 w-24 rounded bg-surface-container-high" />
          </div>
          {/* Progress */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="skeleton h-3 w-16 rounded bg-surface-container-high" />
              <div className="skeleton h-3 w-8 rounded bg-surface-container-high" />
            </div>
            <div className="skeleton h-2 w-full rounded-full bg-surface-container-high" />
          </div>
        </div>
      ))}
    </div>
  );
}
