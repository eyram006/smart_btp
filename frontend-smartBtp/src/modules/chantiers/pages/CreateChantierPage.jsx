import { useNavigate } from 'react-router-dom';
import ChantierForm from '../components/ChantierForm';
import useCreateChantier from '../hooks/useCreateChantier';

/**
 * Page de création d'un chantier SMART-BTP.
 * Point d'entrée du cycle métier : chantier -> etapes -> stock -> mouvements.
 * Pixel-perfect maquette Stitch. Backend-ready.
 */
export default function CreateChantierPage() {
  const navigate = useNavigate();
  const { submit, loading, success, errors } = useCreateChantier();

  const handleSubmit = async (formData) => {
    await submit(formData, () => {
      navigate('/chantiers');
    });
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col pb-8">

      {/* ── Contenu principal ── */}
      <main className="grow pt-6 pb-24 px-container-margin max-w-lg mx-auto w-full">

        {/* En-tête contextuel */}
        <div className="mb-8">
          <h2 className="text-headline-lg-mobile text-on-surface">Nouveau chantier</h2>
          <p className="text-body-lg text-on-surface-variant mt-1">
            Remplissez les informations pour initialiser le site de construction.
          </p>
        </div>

        {/* Feedback succès */}
        {success && (
          <div
            role="status"
            className="mb-6 p-4 rounded-xl bg-secondary-container text-on-secondary-container text-body-sm flex items-center gap-2 border border-secondary/20"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">check_circle</span>
            <span>Chantier cree avec succes ! Redirection en cours...</span>
          </div>
        )}

        {/* Carte formulaire */}
        <div className="bg-surface-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-outline-variant p-6">
          <ChantierForm
            loading={loading}
            errors={errors}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Note informative */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-surface-container-high rounded-xl border border-outline-variant">
          <span className="material-symbols-outlined text-tertiary mt-0.5" aria-hidden="true">info</span>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Une fois le chantier cree, vous pourrez y affecter des etapes et commencer le suivi des stocks de materiaux.
          </p>
        </div>
      </main>
    </div>
  );
}
