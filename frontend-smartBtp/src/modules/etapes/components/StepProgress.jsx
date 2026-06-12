import React from 'react';

/**
 * Barre de progression animée pour une étape de chantier.
 */
export default function StepProgress({ progress }) {
  const pct = Math.min(Math.max(Number(progress) || 0, 0), 100);

  const barColor =
    pct === 100 ? 'bg-secondary' :
    pct > 0     ? 'bg-primary'   :
                  'bg-outline-variant';

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-body-sm text-on-surface-variant">Progression</span>
        <span className="text-body-sm font-semibold text-on-surface">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
