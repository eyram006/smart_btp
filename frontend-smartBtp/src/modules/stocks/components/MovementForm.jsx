import { useState, useEffect } from "react";
import { MOUVEMENT_TYPES } from "../constants/mouvementTypes";

/**
 * Composant formulaire de mouvement de stock.
 * Correspond pixel-perfect a la maquette Stitch.
 * Backend-ready : aucune donnee hardcodee, tous les selects sont alimente par props.
 *
 * @param {Object}   props
 * @param {Array}    props.materiaux       - Liste des materiaux { id, nom, unite, stock }
 * @param {Array}    props.etapes          - Liste des etapes { id, nom }
 * @param {boolean}  props.loading         - Etat de soumission
 * @param {Object}   props.errors          - Erreurs de validation
 * @param {Function} props.onSubmit        - Callback de soumission
 * @param {Function} props.onTypeChange    - Callback quand le type change (entree/sortie)
 * @param {number|null} props.stockDisponible - Stock disponible du materiau selectionne
 */
export default function MovementForm({
  materiaux = [],
  etapes = [],
  loading = false,
  errors = {},
  onSubmit,
  onTypeChange,
  stockDisponible = null,
}) {
  const [formData, setFormData] = useState({
    type: "entree",
    materiau_id: "",
    etape_id: "",
    quantite: 0,
    notes: "",
  });

  const handleTypeToggle = (type) => {
    setFormData((prev) => ({ ...prev, type }));
    if (onTypeChange) onTypeChange(type);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQty = (delta) => {
    setFormData((prev) => ({
      ...prev,
      quantite: Math.max(0, Number(prev.quantite) + delta),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...formData, quantite: Number(formData.quantite) });
  };

  const isSortie = formData.type === "sortie";

  const fieldWrap = (hasError) =>
    `relative w-full h-14 bg-surface-white border-2 rounded-xl overflow-hidden flex items-center transition-all duration-150 ${
      hasError ? "border-error" : "border-outline-variant focus-within:border-primary"
    }`;

  const selectClass =
    "w-full h-full pl-4 pr-10 bg-transparent border-none focus:ring-0 text-body-lg text-on-surface appearance-none focus:outline-none";

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>

      {/* Erreur globale */}
      {errors.general && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20"
        >
          <span className="material-symbols-outlined text-alert-red" style={{ fontSize: "20px" }} aria-hidden="true">error</span>
          <span>{errors.general}</span>
        </div>
      )}

      {/* Toggle Entree / Sortie */}
      <div
        className="bg-surface-container p-1 rounded-xl flex items-center shadow-sm h-14 border border-outline-variant"
        role="group"
        aria-label="Type de mouvement"
      >
        {Object.values(MOUVEMENT_TYPES).map(({ value, label, icon }) => {
          const isActive = formData.type === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleTypeToggle(value)}
              aria-pressed={isActive}
              className={`flex-1 h-full flex items-center justify-center gap-2 rounded-lg transition-all duration-200 font-semibold focus:outline-none ${
                isActive
                  ? "bg-primary-container text-on-primary-container shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }} aria-hidden="true">{icon}</span>
              <span className="text-label-caps">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Materiau */}
      <div className="relative">
        <label
          className="absolute -top-2.5 left-3 px-1 bg-surface text-body-sm text-primary z-10"
          htmlFor="materiau_id"
        >
          Matériau
        </label>
        <div className={fieldWrap(errors.materiau_id)}>
          <select
            id="materiau_id"
            name="materiau_id"
            required
            value={formData.materiau_id}
            onChange={handleChange}
            aria-invalid={!!errors.materiau_id}
            className={selectClass}
          >
            <option value="" disabled>Sélectionner un article</option>
            {materiaux.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nom}{m.unite ? ` (${m.unite})` : ""}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" aria-hidden="true">expand_more</span>
        </div>
        {errors.materiau_id && (
          <span className="text-error text-xs px-1 mt-1 block" role="alert">{errors.materiau_id[0]}</span>
        )}
      </div>

      {/* Etape du chantier */}
      <div className="relative">
        <label
          className="absolute -top-2.5 left-3 px-1 bg-surface text-body-sm text-primary z-10"
          htmlFor="etape_id"
        >
          Étape du chantier
        </label>
        <div className={fieldWrap(errors.etape_id)}>
          <select
            id="etape_id"
            name="etape_id"
            required
            value={formData.etape_id}
            onChange={handleChange}
            aria-invalid={!!errors.etape_id}
            className={selectClass}
          >
            <option value="" disabled>Sélectionner l&apos;étape</option>
            {etapes.map((e) => (
              <option key={e.id} value={e.id}>{e.nom}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" aria-hidden="true">steps</span>
        </div>
        {errors.etape_id && (
          <span className="text-error text-xs px-1 mt-1 block" role="alert">{errors.etape_id[0]}</span>
        )}
      </div>

      {/* Quantite avec stepper */}
      <div className="space-y-2">
        <label className="text-body-sm text-on-surface-variant ml-1 block" htmlFor="quantite">
          Quantité
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleQty(-1)}
            aria-label="Diminuer la quantite"
            className="w-14 h-14 bg-surface-container-highest rounded-xl flex items-center justify-center active:scale-90 transition-transform focus:outline-none hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined" aria-hidden="true">remove</span>
          </button>

          <div className="flex-1">
            <input
              id="quantite"
              name="quantite"
              type="number"
              min="0"
              step="1"
              required
              value={formData.quantite}
              onChange={handleChange}
              aria-invalid={!!errors.quantite}
              className={`w-full h-14 text-center bg-surface-white border-2 rounded-xl text-headline-md focus:outline-none focus:ring-0 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                errors.quantite ? "border-error" : "border-outline-variant focus:border-primary"
              }`}
            />
          </div>

          <button
            type="button"
            onClick={() => handleQty(1)}
            aria-label="Augmenter la quantite"
            className="w-14 h-14 bg-surface-container-highest rounded-xl flex items-center justify-center active:scale-90 transition-transform focus:outline-none hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined" aria-hidden="true">add</span>
          </button>
        </div>

        {/* Stock disponible (visible en mode Sortie quand un materiau est selectionne) */}
        {isSortie && stockDisponible !== null && formData.materiau_id && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-container text-on-secondary-container text-body-sm border border-secondary/20">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }} aria-hidden="true">check_circle</span>
            <span>Stock disponible : <strong>{stockDisponible}</strong> unités</span>
          </div>
        )}

        {errors.quantite && (
          <span className="text-error text-xs px-1 block" role="alert">{errors.quantite[0]}</span>
        )}
      </div>

      {/* Notes */}
      <div className="relative">
        <label
          className="absolute -top-2.5 left-3 px-1 bg-surface text-body-sm text-on-surface-variant z-10"
          htmlFor="notes"
        >
          Notes / Référence (Optionnel)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Ex: Livraison fournisseur n°442..."
          className="w-full p-4 bg-surface-white border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-0 text-body-lg resize-none transition-all focus:outline-none"
        />
      </div>

      {/* Zone photo / bon de livraison */}
      <div className="bg-surface-container-low border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-surface-container transition-colors group">
        <span
          className="material-symbols-outlined text-outline group-hover:text-primary transition-colors"
          style={{ fontSize: "32px" }}
          aria-hidden="true"
        >
          photo_camera
        </span>
        <span className="text-label-caps text-on-surface-variant">JOINDRE UN BON / PHOTO</span>
      </div>

      {/* Bouton submit */}
      <div className="pt-2 pb-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[48px] bg-primary text-on-primary rounded-xl font-semibold shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin" aria-hidden="true">sync</span>
              Enregistrement...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined" aria-hidden="true">send</span>
              Valider le mouvement
            </>
          )}
        </button>
      </div>
    </form>
  );
}
