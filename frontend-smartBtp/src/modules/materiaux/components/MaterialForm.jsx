import { useState } from 'react';

/**
 * Formulaire de création d'un matériau avec stock initial.
 * Pixel-perfect sur la maquette HTML fournie. Backend-ready.
 *
 * @param {Object}   props
 * @param {boolean}  props.loading      - État de soumission
 * @param {Object}   props.errors       - Erreurs de validation { field: [msg] }
 * @param {Function} props.onSubmit     - Callback(formData)
 */
export default function MaterialForm({ loading = false, errors = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    nom: '',
    categorie: '',
    unite: 'sac',
    description: '',
    seuil_alerte: 0,
    quantite_initiale: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const inputClass = (hasError) =>
    `w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none transition-all placeholder:text-outline/60 text-body-sm ${
      hasError ? 'ring-2 ring-error border-error' : 'focus:ring-2 focus:ring-primary focus:border-primary'
    }`;

  const selectClass = (hasError) =>
    `w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg appearance-none focus:outline-none text-body-sm ${
      hasError ? 'ring-2 ring-error border-error' : 'focus:ring-2 focus:ring-primary focus:border-primary'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* ── Erreur globale ── */}
      {errors.general && (
        <div role="alert" className="flex items-center gap-2 p-4 border rounded-xl bg-error-container text-on-error-container text-body-sm border-error/20">
          <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
          <span>{errors.general}</span>
        </div>
      )}

      {/* ── Section 1: Informations générales ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-secondary text-[20px]" aria-hidden="true">info</span>
          <h2 className="font-bold text-body-lg text-on-surface">Informations générales</h2>
        </div>

        {/* Nom du matériau */}
        <div className="space-y-1">
          <label className="block ml-1 uppercase text-label-caps font-label-caps text-on-surface-variant">
            Nom du matériau
            <span className="text-error ml-0.5">*</span>
          </label>
          <input
            name="nom"
            type="text"
            required
            placeholder="ex: Ciment CPJ 45"
            value={formData.nom}
            onChange={handleChange}
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? 'nom-error' : undefined}
            className={inputClass(errors.nom)}
          />
          {errors.nom && (
            <span id="nom-error" className="block px-1 text-xs text-error" role="alert">{errors.nom[0]}</span>
          )}
        </div>

        {/* Catégorie */}
        <div className="space-y-1">
          <label className="block ml-1 uppercase text-label-caps font-label-caps text-on-surface-variant">
            Catégorie
            <span className="text-error ml-0.5">*</span>
          </label>
          <div className="relative">
            <select
              name="categorie"
              required
              value={formData.categorie}
              onChange={handleChange}
              aria-invalid={!!errors.categorie}
              aria-describedby={errors.categorie ? 'categorie-error' : undefined}
              className={selectClass(errors.categorie)}
            >
                            <option value="">Sélectionner</option>
              <option value="liants">Liants</option>
              <option value="metaux">Métaux</option>
              <option value="agregats">Agrégats</option>
              <option value="maconnerie">Maçonnerie</option>
              <option value="finition">Finition</option>
              <option value="autres">Autres</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none text-[18px]" aria-hidden="true">expand_more</span>
          </div>
          {errors.categorie && (
            <span id="categorie-error" className="block px-1 text-xs text-error" role="alert">{errors.categorie[0]}</span>
          )}
        </div>

        {/* Unité */}
        <div className="space-y-1">
          <label className="block ml-1 uppercase text-label-caps font-label-caps text-on-surface-variant">
            Unité
            <span className="text-error ml-0.5">*</span>
          </label>
          <div className="relative">
            <select
              name="unite"
              required
              value={formData.unite}
              onChange={handleChange}
              aria-invalid={!!errors.unite}
              aria-describedby={errors.unite ? 'unite-error' : undefined}
              className={selectClass(errors.unite)}
            >
              <option value="">Sélectionner</option>
              <option value="kg">kg</option>
              <option value="sac">sac</option>
              <option value="m³">m³</option>
              <option value="tige">tige</option>
              <option value="litre">litre</option>
              <option value="piece">pièce</option>
              <option value="tonne">tonne</option>
              <option value="m²">m²</option>
              <option value="ml">ml</option>
              <option value="camion">camion</option>
              <option value="autre">autre</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none text-[18px]" aria-hidden="true">expand_more</span>
          </div>
          {errors.unite && (
            <span id="unite-error" className="block px-1 text-xs text-error" role="alert">{errors.unite[0]}</span>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block ml-1 uppercase text-label-caps font-label-caps text-on-surface-variant">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Détails techniques..."
            rows="2"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 transition-all border rounded-lg resize-none bg-surface-container-lowest border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-body-sm"
          />
        </div>
      </section>

      {/* ── Section 2: Gestion et suivi ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-tertiary text-[20px]" aria-hidden="true">monitoring</span>
          <h2 className="font-bold text-body-lg text-on-surface">Gestion</h2>
        </div>

        {/* Seuil critique */}
        <div className="space-y-1">
          <label className="block ml-1 uppercase text-label-caps font-label-caps text-on-surface-variant">
            Seuil critique
            <span className="text-error ml-0.5">*</span>
          </label>
          <input
            name="seuil_alerte"
            type="number"
            min="0"
            required
            placeholder="0"
            value={formData.seuil_alerte}
            onChange={handleChange}
            aria-invalid={!!errors.seuil_alerte}
            aria-describedby={errors.seuil_alerte ? 'seuil_alerte-error' : undefined}
            className={`${inputClass(errors.seuil_alerte)} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <p className="text-[12px] text-on-surface-variant mt-1 ml-1">Alerte déclenchée si le stock passe sous ce seuil.</p>
          {errors.seuil_alerte && (
            <span id="seuil_alerte-error" className="block px-1 text-xs text-error" role="alert">{errors.seuil_alerte[0]}</span>
          )}
        </div>
      </section>

      {/* ── Section 3: Stock initial ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">inventory_2</span>
          <h2 className="font-bold text-body-lg text-on-surface">Stock initial</h2>
        </div>

        {/* Quantité initiale */}
        <div className="space-y-1">
          <label className="block ml-1 uppercase text-label-caps font-label-caps text-on-surface-variant">
            Quantité initiale
          </label>
          <div className="relative">
            <input
              name="quantite_initiale"
              type="number"
              min="0"
              placeholder="0"
              value={formData.quantite_initiale}
              onChange={handleChange}
              aria-invalid={!!errors.quantite_initiale}
              aria-describedby={errors.quantite_initiale ? 'quantite_initiale-error' : undefined}
              className={`${inputClass(errors.quantite_initiale)} font-bold pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            />
            <span className="absolute right-3 top-2.5 font-bold text-body-sm text-primary" aria-hidden="true">
              {formData.unite}
            </span>
          </div>
          {errors.quantite_initiale && (
            <span id="quantite_initiale-error" className="block px-1 text-xs text-error" role="alert">{errors.quantite_initiale[0]}</span>
          )}
        </div>
      </section>

      {/* ── Bouton submit ── */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-primary text-on-primary rounded-xl text-body-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined animate-spin" aria-hidden="true">sync</span>
            Enregistrement...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined" aria-hidden="true">save</span>
            Enregistrer le matériau
          </>
        )}
      </button>
    </form>
  );
}

