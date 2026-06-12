import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovementForm from "../components/MovementForm";
import SuccessModal from "../components/SuccessModal";
import useMouvement from "../hooks/useMouvement";
import { stockService } from "../services/stockService";

/**
 * Page d enregistrement d un mouvement de stock SMART-BTP.
 * Structure backend-ready : materiaux et etapes charges depuis l API Laravel.
 * Correspond pixel-perfect a la maquette Stitch.
 */
export default function MouvementsPage() {
  const { chantierId } = useParams();

  /* --- Donnees selectables (chargees depuis l API) --- */
  const [materiaux,    setMateriaux]    = useState([]);
  const [etapes,       setEtapes]       = useState([]);
  const [loadingData,  setLoadingData]  = useState(true);
  const [dataError,    setDataError]    = useState(null);

  /* --- Stock disponible du materiau selectionne (mode Sortie) --- */
  const [stockDisponible, setStockDisponible] = useState(null);
  const [currentType,     setCurrentType]     = useState("entree");

  /* --- Modale succes --- */
  const [showSuccess, setShowSuccess] = useState(false);

  /* --- Hook soumission --- */
  const { submit, loading, errors, reset } = useMouvement();

  /* --- Chargement initial des donnees --- */
  useEffect(() => {
    const load = async () => {
      setLoadingData(true);
      setDataError(null);
      try {
        const [mResp, eResp] = await Promise.all([
          stockService.getMateriaux(chantierId ? { chantier_id: chantierId } : {}),
          chantierId
            ? stockService.getEtapesParChantier(chantierId)
            : Promise.resolve({ data: [] }),
        ]);
        setMateriaux(mResp.data || []);
        setEtapes(eResp.data    || []);
      } catch {
        setDataError("Impossible de charger les donnees. Verifiez votre connexion.");
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [chantierId]);

  /* --- Changement de type entree/sortie --- */
  const handleTypeChange = (type) => {
    setCurrentType(type);
    if (type === "entree") setStockDisponible(null);
  };

  /* --- Changement de materiau => charge stock dispo si Sortie --- */
  const handleMaterialChange = async (materiauId) => {
    if (!materiauId || currentType !== "sortie") {
      setStockDisponible(null);
      return;
    }
    try {
      const resp = await stockService.getStockDisponible(materiauId);
      setStockDisponible(resp.data?.quantite ?? null);
    } catch {
      setStockDisponible(null);
    }
  };

  /* --- Soumission du formulaire --- */
  const handleSubmit = async (formData) => {
    const result = await submit(
      { ...formData, ...(chantierId ? { chantier_id: chantierId } : {}) },
      () => setShowSuccess(true),
    );
    return result;
  };

  /* --- Fermeture modale succes => reset formulaire --- */
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    reset();
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">

      {/* ---- Contenu principal ---- */}
      <main className="pt-20 px-container-margin max-w-md mx-auto">

        {/* En-tete contextuel */}
        <div className="mb-6">
          <h2 className="text-headline-lg-mobile text-on-surface mb-1">Nouveau Mouvement</h2>
          <p className="text-body-sm text-on-surface-variant">
            Enregistrez une entree ou une sortie de stock pour ce chantier.
          </p>
        </div>

        {/* Erreur chargement donnees */}
        {dataError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20"
          >
            <span className="material-symbols-outlined text-alert-red" style={{ fontSize: "20px" }} aria-hidden="true">error</span>
            <span>{dataError}</span>
          </div>
        )}

        {/* Skeleton chargement donnees */}
        {loadingData ? (
          <div className="space-y-6" aria-busy="true" aria-label="Chargement du formulaire...">
            {[14, 56, 56, 56, 80].map((h, i) => (
              <div key={i} className="skeleton rounded-xl" style={{ height: `${h}px` }} />
            ))}
            <div className="skeleton rounded-xl h-12" />
          </div>
        ) : (
          <MovementForm
            materiaux={materiaux}
            etapes={etapes}
            loading={loading}
            errors={errors}
            stockDisponible={stockDisponible}
            onSubmit={handleSubmit}
            onTypeChange={handleTypeChange}
            onMaterialChange={handleMaterialChange}
          />
        )}
      </main>

      {/* ---- Modale succes ---- */}
      <SuccessModal isOpen={showSuccess} onClose={handleCloseSuccess} />
    </div>
  );
}
