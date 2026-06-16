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

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center opacity-100 pointer-events-auto transition-opacity duration-300" id="addStepModal">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      <div className="bg-surface-white w-full max-w-lg rounded-t-2xl md:rounded-2xl p-6 shadow-2xl relative z-10 pointer-events-auto transform translate-y-0 md:scale-100 transition-transform duration-300 overflow-y-auto max-h-[795px]">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-headline-md font-headline-md text-on-surface">
            {initialStep ? "Modifier l'étape" : "Ajouter une étape"}
          </h3>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors" onClick={onClose} type="button">
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          {errors.general && (
            <div role="alert" className="p-4 rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
              <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }}>error</span>
              <span>{errors.general[0]}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-label-caps font-label-caps text-on-surface-variant">Nom de l'étape</label>
            <input 
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary outline-none h-touch-target-min px-4 transition-all text-body-lg font-body-lg" 
              placeholder="ex: Carrelage" 
              type="text" 
            />
            {errors.nom && <span className="text-error text-xs block">{errors.nom[0]}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-caps font-label-caps text-on-surface-variant">Type d'étape</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary outline-none h-touch-target-min px-4 transition-all text-body-lg font-body-lg appearance-none"
            >
              <option value="" disabled>Choisir un type</option>
              {Object.entries(STEP_TYPES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            {errors.type && <span className="text-error text-xs block">{errors.type[0]}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-label-caps font-label-caps text-on-surface-variant">Date de début</label>
              <input 
                name="date_debut"
                value={formData.date_debut}
                onChange={handleChange}
                required
                className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary outline-none h-touch-target-min px-4 transition-all text-body-lg font-body-lg" 
                type="date" 
              />
              {errors.date_debut && <span className="text-error text-xs block">{errors.date_debut[0]}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-caps font-label-caps text-on-surface-variant">Date de fin</label>
              <input 
                name="date_fin"
                value={formData.date_fin}
                onChange={handleChange}
                required
                className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary outline-none h-touch-target-min px-4 transition-all text-body-lg font-body-lg" 
                type="date" 
              />
              {errors.date_fin && <span className="text-error text-xs block">{errors.date_fin[0]}</span>}
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button 
              className="flex-1 border-2 border-outline text-on-surface h-touch-target-min rounded-lg font-bold active:bg-surface-container-low transition-colors disabled:opacity-50" 
              onClick={onClose} 
              type="button"
              disabled={loading}
            >
              Annuler
            </button>
            <button 
              className="flex-1 bg-primary text-on-primary h-touch-target-min rounded-lg font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary border-t-transparent"></span>
                  Traitement...
                </>
              ) : (
                initialStep ? 'Enregistrer' : 'Confirmer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
