import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSteps from '../hooks/useSteps';
import StepSearchBar from '../components/StepSearchBar';
import StepsList from '../components/StepsList';
import EmptyStepsState from '../components/EmptyStepsState';
import AddStepModal from '../components/AddStepModal';
import StepsSkeleton from '../components/StepsSkeleton';

/**
 * Page principale de gestion des étapes d'un chantier SMART-BTP.
 * Orchestration CRUD complète, backend-ready.
 */
export default function EtapesPage() {
  const { chantierId } = useParams();

  const {
    steps,
    rawSteps,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addStep,
    updateStep,
    deleteStep,
  } = useSteps(chantierId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [modalErrors, setModalErrors] = useState({});

  const openAddModal = () => {
    setSelectedStep(null);
    setModalErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (step) => {
    setSelectedStep(step);
    setModalErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStep(null);
    setModalErrors({});
  };

  const handleFormSubmit = async (formData) => {
    setModalErrors({});
    const result = selectedStep
      ? await updateStep(selectedStep.id, formData)
      : await addStep(formData);

    if (result.success) {
      closeModal();
    } else {
      setModalErrors(result.errors || { general: ['Erreur inattendue. Veuillez réessayer.'] });
    }
  };

  const handleDelete = async (stepId) => {
    if (!window.confirm('Supprimer cette étape de chantier ?')) return;
    const result = await deleteStep(stepId);
    if (!result.success) alert(result.error);
  };

  /* ── Skeleton loading (premier chargement) ── */
  const isInitialLoading = loading && rawSteps.length === 0;

  return (
    <div className="bg-background min-h-screen text-on-surface">

      {/* ── Header ── */}
      <div className="bg-surface-white border-b border-outline-variant px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
            Étapes du Chantier
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Planifiez, suivez et mettez à jour la progression de ce chantier.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:opacity-90 text-on-primary font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center gap-2 focus:outline-none whitespace-nowrap"
        >
          <span className="material-symbols-outlined" aria-hidden="true">add</span>
          Ajouter une étape
        </button>
      </div>

      {/* ── Contenu principal ── */}
      <div className="max-w-[1400px] mx-auto p-6 md:p-12 space-y-6">

        {/* Barre de recherche (visible seulement si des étapes existent) */}
        {rawSteps.length > 0 && (
          <div className="max-w-md">
            <StepSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        )}

        {/* Erreur API */}
        {error && (
          <div role="alert" className="p-4 rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20 max-w-2xl">
            <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* États dynamiques */}
        {isInitialLoading ? (
          <StepsSkeleton />
        ) : rawSteps.length === 0 ? (
          <EmptyStepsState onCreateFirst={openAddModal} />
        ) : steps.length === 0 && searchQuery ? (
          /* Aucun résultat de recherche */
          <div className="flex flex-col items-center text-center py-16 gap-4">
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '48px' }} aria-hidden="true">search_off</span>
            <div>
              <p className="text-headline-md text-on-surface">Aucun résultat</p>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Aucune étape ne correspond à « {searchQuery} »
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary font-semibold text-body-sm hover:underline focus:outline-none"
            >
              Effacer la recherche
            </button>
          </div>
        ) : (
          <StepsList steps={steps} onEdit={openEditModal} onDelete={handleDelete} />
        )}
      </div>

      {/* Modale ajout / modification */}
      <AddStepModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        loading={loading}
        errors={modalErrors}
        initialStep={selectedStep}
      />
    </div>
  );
}
