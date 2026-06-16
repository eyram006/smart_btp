import { useNavigate, useParams } from 'react-router-dom';
import MaterialForm from '../components/MaterialForm';
import useCreateMateriau from '../hooks/useCreateMateriau';

/**
 * Page de création d'un matériau SMART-BTP.
 * Workflow transactionnel :
 *   STEP 1 : Créer le matériau
 *   STEP 2 : Créer le stock initial
 * Sur succès : redirection vers /stocks/{chantier_id}
 * Sur erreur STEP 2 : affiche erreur, reste récupérable
 */
export default function CreateMateriauPage() {
  const navigate = useNavigate();
  const { chantierId } = useParams();
  const { submit, loading, success, errors } = useCreateMateriau(chantierId);

  const handleSubmit = async (formData) => {
    const result = await submit(formData, () => {
      // Redirection après succès complet (step 1 + step 2)
      navigate(`/stocks/${chantierId}`);
    });

    return result;
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col pb-8">

      {/* ── Contenu principal ── */}
      <main className="grow pt-6 pb-24 px-container-margin max-w-lg mx-auto w-full">

        {/* En-tête contextuel */}
        <div className="mb-8">
          <h2 className="text-headline-lg-mobile text-on-surface">Nouveau matériau</h2>
          <p className="text-body-lg text-on-surface-variant mt-1">
            Définissez un matériau et son stock initial pour le chantier.
          </p>
        </div>

        {/* Toasts de notification (Fixes en haut à droite) */}
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
          {success && (
            <div
              role="status"
              className="p-4 w-80 rounded-xl bg-secondary-container text-on-secondary-container text-body-sm flex items-start gap-3 shadow-xl border border-secondary/20 transform transition-all duration-300 ease-out"
            >
              <span className="material-symbols-outlined shrink-0 mt-0.5" style={{ fontSize: '20px' }} aria-hidden="true">check_circle</span>
              <span>Le matériau et son stock ont été créés avec succès ! Redirection...</span>
            </div>
          )}

          {errors.general && (
            <div
              role="alert"
              className="p-4 w-80 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-start gap-3 shadow-xl border border-error/20 transform transition-all duration-300 ease-out"
            >
              <span className="material-symbols-outlined text-alert-red shrink-0 mt-0.5" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
              <span>{errors.general}</span>
            </div>
          )}
        </div>

        {/* Carte formulaire */}
        <div className="bg-surface-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-outline-variant p-6 space-y-6">
          <MaterialForm
            loading={loading}
            errors={errors}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Note informative */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-surface-container-high rounded-xl border border-outline-variant">
          <span className="material-symbols-outlined text-tertiary mt-0.5" aria-hidden="true">info</span>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Le matériau sera immédiatement disponible dans le catalogue du stock. Vous pourrez ensuite enregistrer des mouvements.
          </p>
        </div>
      </main>
    </div>
  );
}
