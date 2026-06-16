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
    <div className="pb-24 px-container-margin max-w-2xl mx-auto">
      {/* Header Section */}
      <section className="mt-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">Gestion des Étapes</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">Planifiez et suivez l'avancement du chantier.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-primary text-on-primary h-touch-target-min px-6 rounded-lg font-bold shadow-md active:scale-95 transition-all w-full md:w-auto"
        >
          <span className="material-symbols-outlined" data-icon="add">add</span>
          Ajouter une étape
        </button>
      </section>

      {/* Erreur API */}
      {error && (
        <div role="alert" className="mb-6 p-4 rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
          <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Search/Filter (Visible seulement s'il y a des étapes ou si une recherche est active) */}
      {(rawSteps.length > 0 || searchQuery) && (
        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <StepSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <button className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-lg bg-surface-white active:bg-surface-container-low transition-colors shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant" data-icon="filter_list">filter_list</span>
          </button>
        </div>
      )}

      {/* List / Loading / Empty States */}
      {isInitialLoading ? (
        <StepsSkeleton />
      ) : rawSteps.length === 0 ? (
        <EmptyStepsState onCreateFirst={openAddModal} />
      ) : steps.length === 0 && searchQuery ? (
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
            className="text-primary font-bold text-body-sm hover:underline focus:outline-none mt-2"
          >
            Effacer la recherche
          </button>
        </div>
      ) : (
        <StepsList steps={steps} onEdit={openEditModal} onDelete={handleDelete} />
      )}

      {/* Modal: Add Step */}
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
