import React, { useState, useEffect } from 'react';
import { STEP_TYPES } from '../constants/stepTypes';

/**
 * Modale d'ajout ou de modification d'une étape de chantier.
 * Gère les deux modes (create / edit) via la prop initialStep.
 */
export default function AddStepModal({ isOpen, onClose, onSubmit, loading, errors, initialStep }) {
  const defaultForm = {
    nom: '',
    type: '',
    date_debut: '',
    date_fin: '',
    pourcentage_avancement: 0,
    statut: 'a_venir',
  };

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialStep ? {
        nom: initialStep.nom || '',
        type: initialStep.type || '',
        date_debut: initialStep.date_debut || '',
        date_fin: initialStep.date_fin || '',
        pourcentage_avancement: initialStep.pourcentage_avancement ?? 0,
        statut: initialStep.statut || 'a_venir',
      } : defaultForm);
    }
  }, [initialStep, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: name === 'pourcentage_avancement' ? Number(value) : value };
      if (name === 'pourcentage_avancement') {
        const pct = Number(value);
        updated.statut = pct === 100 ? 'termine' : pct > 0 ? 'en_cours' : 'a_venir';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "w-full bg-transparent border-none focus:ring-0 text-on-surface text-body-lg px-4 focus:outline-none";
  const fieldWrap = (hasError) =>
    `relative flex items-center border rounded-lg bg-surface-container-lowest h-[50px] transition-all duration-150 form-input-focus focus-within:ring-2 ${
      hasError ? 'border-error focus-within:ring-error/20' : 'border-outline focus-within:ring-primary/20'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Boîte modale */}
      <div className="relative bg-surface-white rounded-xl shadow-xl border border-outline-variant w-full max-w-md z-10 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-outline-variant">
          <h2 id="modal-title" className="text-headline-md text-on-surface">
            {initialStep ? "Modifier l'étape" : 'Ajouter une étape'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-1 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all focus:outline-none"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Formulaire scrollable */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">

          {errors.general && (
            <div role="alert" className="p-4 rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
              <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
              <span>{errors.general[0]}</span>
            </div>
          )}

          {/* Nom */}
          <div className="space-y-1">
            <label className="text-label-caps text-on-surface-variant px-1 block" htmlFor="nom">
              Nom de l'étape
            </label>
            <div className={fieldWrap(errors.nom)}>
              <input
                id="nom" name="nom" type="text"
                placeholder="Ex: Fondations en béton" required
                value={formData.nom} onChange={handleChange}
                aria-invalid={!!errors.nom}
                className={inputClass}
              />
            </div>
            {errors.nom && <span className="text-error text-xs px-1 block" role="alert">{errors.nom[0]}</span>}
          </div>

          {/* Type */}
          <div className="space-y-1">
            <label className="text-label-caps text-on-surface-variant px-1 block" htmlFor="type">
              Type de travaux
            </label>
            <div className={fieldWrap(errors.type)}>
              <select
                id="type" name="type" required
                value={formData.type} onChange={handleChange}
                aria-invalid={!!errors.type}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>Choisir un type</option>
                {Object.entries(STEP_TYPES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant" aria-hidden="true">expand_more</span>
            </div>
            {errors.type && <span className="text-error text-xs px-1 block" role="alert">{errors.type[0]}</span>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-label-caps text-on-surface-variant px-1 block" htmlFor="date_debut">Début</label>
              <div className={fieldWrap(errors.date_debut)}>
                <input
                  id="date_debut" name="date_debut" type="date" required
                  value={formData.date_debut} onChange={handleChange}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface text-body-lg px-3 focus:outline-none"
                />
              </div>
              {errors.date_debut && <span className="text-error text-xs px-1 block" role="alert">{errors.date_debut[0]}</span>}
            </div>
            <div className="space-y-1">
              <label className="text-label-caps text-on-surface-variant px-1 block" htmlFor="date_fin">Fin</label>
              <div className={fieldWrap(errors.date_fin)}>
                <input
                  id="date_fin" name="date_fin" type="date" required
                  value={formData.date_fin} onChange={handleChange}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface text-body-lg px-3 focus:outline-none"
                />
              </div>
              {errors.date_fin && <span className="text-error text-xs px-1 block" role="alert">{errors.date_fin[0]}</span>}
            </div>
          </div>

          {/* Progression */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-label-caps text-on-surface-variant" htmlFor="pourcentage_avancement">
                Progression
              </label>
              <span className="text-body-sm font-semibold text-primary">{formData.pourcentage_avancement}%</span>
            </div>
            <input
              id="pourcentage_avancement" name="pourcentage_avancement"
              type="range" min="0" max="100"
              value={formData.pourcentage_avancement}
              onChange={handleChange}
              className="w-full h-2 bg-surface-container rounded-full appearance-none cursor-pointer accent-primary focus:outline-none"
            />
          </div>

          {/* Statut */}
          <div className="space-y-1">
            <label className="text-label-caps text-on-surface-variant px-1 block" htmlFor="statut">Statut</label>
            <div className={fieldWrap(false)}>
              <select
                id="statut" name="statut" required
                value={formData.statut} onChange={handleChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="a_venir">À venir</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant" aria-hidden="true">expand_more</span>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-low flex justify-end gap-3">
          <button
            type="button" onClick={onClose} disabled={loading}
            className="px-4 py-2 text-on-surface-variant font-semibold hover:bg-surface-container-high rounded-xl transition-all disabled:opacity-50 focus:outline-none"
          >
            Annuler
          </button>
          <button
            type="submit" onClick={handleSubmit} disabled={loading}
            className="bg-primary hover:opacity-90 text-on-primary font-semibold px-6 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 focus:outline-none"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary border-t-transparent" aria-hidden="true" />
                Traitement...
              </>
            ) : (
              initialStep ? 'Enregistrer' : 'Créer l\'étape'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
