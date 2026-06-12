import { useState } from 'react';
import { CHANTIER_STATUSES } from '../constants/chantierStatuses';
import LocationPreview from './LocationPreview';

/**
 * Formulaire de création / édition d'un chantier.
 * Pixel-perfect sur la maquette Stitch. Backend-ready.
 *
 * @param {Object}   props
 * @param {Object}   props.initialData  - Données initiales (mode édition)
 * @param {boolean}  props.loading      - État de soumission
 * @param {Object}   props.errors       - Erreurs de validation { field: [msg] }
 * @param {Function} props.onSubmit     - Callback(formData)
 */
export default function ChantierForm({ initialData = {}, loading = false, errors = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name:       initialData.name       ?? '',
    location:   initialData.location   ?? '',
    surface:    initialData.surface    ?? '',
    start_date: initialData.start_date ?? '',
    status:     initialData.status     ?? 'planning',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  }; 

  /* ── Classes réutilisables ── */
  const inputClass = (hasError) =>
    `w-full h-touch-target-min px-4 bg-surface-container-low border-none rounded-lg text-body-lg text-on-surface placeholder:text-outline focus:ring-2 transition-all focus:outline-none ${
      hasError ? 'ring-2 ring-error' : 'focus:ring-primary'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* ── Erreur globale ── */}
      {errors.general && (
        <div role="alert" className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
          <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
          <span>{errors.general}</span>
        </div>
      )}

      {/* ── Nom du chantier ── */}
      <div className="space-y-2">
        <label className="text-label-caps text-on-surface-variant block" htmlFor="name">
          NOM DU CHANTIER
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Ex: Residence Horizon"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={inputClass(errors.name)}
        />
        {errors.name && (
          <span id="name-error" className="text-error text-xs px-1 block" role="alert">{errors.name[0]}</span>
        )}
      </div>

      {/* ── Localisation ── */}
      <div className="space-y-2">
        <label className="text-label-caps text-on-surface-variant block" htmlFor="location">
          LOCALISATION
        </label>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none" aria-hidden="true">location_on</span>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="Quartier, Ville (ex: Adidogome, Lome)"
            value={formData.location}
            onChange={handleChange}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? 'location-error' : undefined}
            className={`${inputClass(errors.location)} pl-10`}
          />
        </div>
        {errors.location && (
          <span id="location-error" className="text-error text-xs px-1 block" role="alert">{errors.location[0]}</span>
        )}

        {/* Carte placeholder */}
        <LocationPreview location={formData.location} />
      </div>

      {/* ── Surface + Date début (grid 2 colonnes) ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Surface */}
        <div className="space-y-2">
          <label className="text-label-caps text-on-surface-variant block" htmlFor="surface">
            SURFACE (m²)
          </label>
          <input
            id="surface"
            name="surface"
            type="number"
            min="0"
            placeholder="Optionnel"
            value={formData.surface}
            onChange={handleChange}
            aria-invalid={!!errors.surface}
            aria-describedby={errors.surface ? 'surface-error' : undefined}
            className={`${inputClass(errors.surface)} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {errors.surface && (
            <span id="surface-error" className="text-error text-xs px-1 block" role="alert">{errors.surface[0]}</span>
          )}
        </div>

        {/* Date de début */}
        <div className="space-y-2">
          <label className="text-label-caps text-on-surface-variant block" htmlFor="start_date">
            DATE DE DEBUT
          </label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            required
            value={formData.start_date}
            onChange={handleChange}
            aria-invalid={!!errors.start_date}
            aria-describedby={errors.start_date ? 'start_date-error' : undefined}
            className={inputClass(errors.start_date)}
          />
          {errors.start_date && (
            <span id="start_date-error" className="text-error text-xs px-1 block" role="alert">{errors.start_date[0]}</span>
          )}
        </div>
      </div>

      {/* ── Statut ── */}
      <div className="space-y-2">
        <label className="text-label-caps text-on-surface-variant block" htmlFor="status">
          STATUT
        </label>
        <div className="relative">
          <select
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="w-full h-touch-target-min px-4 bg-surface-container-low border-none rounded-lg text-body-lg text-on-surface appearance-none focus:ring-2 focus:ring-primary transition-all focus:outline-none"
          >
            {CHANTIER_STATUSES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" aria-hidden="true">
            expand_more
          </span>
        </div>
      </div>

      {/* ── Bouton submit ── */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-[56px] bg-primary text-on-primary rounded-xl text-headline-md font-semibold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined animate-spin" aria-hidden="true">sync</span>
            Traitement...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined" aria-hidden="true">add</span>
            Creer le chantier
          </>
        )}
      </button>
    </form>
  );
}
