import React from "react";

/**
 * Modale de confirmation apres enregistrement d un mouvement de stock.
 * Correspond a la maquette Stitch.
 */
export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-container-margin"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-dark/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Carte modale */}
      <div className="relative bg-surface-white rounded-xl p-8 w-full max-w-sm flex flex-col items-center text-center shadow-2xl z-10">
        {/* Icone */}
        <div className="w-20 h-20 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined" style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
            task_alt
          </span>
        </div>

        <h3 id="success-modal-title" className="text-headline-md text-on-surface mb-2">
          Mouvement Enregistre
        </h3>
        <p className="text-body-lg text-on-surface-variant mb-6">
          Le stock a ete mis a jour avec succes.
        </p>

        <button
          onClick={onClose}
          className="w-full h-12 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all focus:outline-none"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
