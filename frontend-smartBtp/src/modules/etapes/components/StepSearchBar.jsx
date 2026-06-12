import React from 'react';

/**
 * Barre de recherche pour filtrer les étapes par nom ou type.
 * API-ready : onChange remonte la valeur brute pour filtrage côté hook.
 */
export default function StepSearchBar({ value, onChange }) {
  return (
    <div className="relative flex items-center border border-outline rounded-lg bg-surface-white h-[48px] form-input-focus focus-within:ring-2 focus-within:ring-primary/20 transition-all">
      <span className="material-symbols-outlined px-3 text-on-surface-variant" aria-hidden="true">search</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher une étape..."
        aria-label="Rechercher une étape par nom ou type"
        className="w-full bg-transparent border-none focus:ring-0 text-on-surface text-body-lg px-0 focus:outline-none placeholder:text-outline"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Effacer la recherche"
          className="p-2 mr-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }} aria-hidden="true">close</span>
        </button>
      )}
    </div>
  );
}
