import React from 'react';

/**
 * Barre de recherche pour filtrer les étapes par nom ou type.
 * API-ready : onChange remonte la valeur brute pour filtrage côté hook.
 */
export default function StepSearchBar({ value, onChange }) {
  return (
    <>
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
      <input
        className="w-full bg-surface-white border border-outline-variant rounded-lg pl-10 pr-10 h-12 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-lg font-body-lg"
        placeholder="Rechercher une étape..."
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
        </button>
      )}
    </>
  );
}
