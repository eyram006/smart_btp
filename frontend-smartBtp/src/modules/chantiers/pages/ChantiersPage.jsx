import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chantierService } from '../services/chantierService';
import { CHANTIER_STATUSES } from '../constants/chantierStatuses';

/**
 * Page liste des chantiers SMART-BTP.
 * Backend-ready : chargement via API, skeleton loading, empty state.
 */

function StatusBadge({ status }) {
  const meta = CHANTIER_STATUSES.find((s) => s.value === status) || CHANTIER_STATUSES[0];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${meta.bg} ${meta.text} ${meta.border}`}>
      {meta.label}
    </span>
  );
}

function ChantierCardSkeleton() {
  return (
    <div className="bg-surface-white rounded-xl border border-outline-variant p-5 flex flex-col gap-3">
      <div className="skeleton h-5 w-3/4 rounded" />
      <div className="skeleton h-4 w-1/2 rounded" />
      <div className="skeleton h-6 w-24 rounded-full" />
    </div>
  );
}

export default function ChantiersPage() {
  const navigate = useNavigate();
  const [chantiers,   setChantiers]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await chantierService.getChantiers();
        setChantiers(resp.data || []);
      } catch {
        setError('Impossible de charger les chantiers. Verifiez votre connexion.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-surface min-h-screen pb-8">
      <main className="pt-6 pb-24 px-container-margin max-w-lg mx-auto w-full">

        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-headline-lg-mobile text-on-surface">Mes chantiers</h2>
            <p className="text-body-sm text-on-surface-variant mt-1">
              {!loading && !error && `${chantiers.length} chantier${chantiers.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={() => navigate('/chantiers/nouveau')}
            className="bg-primary text-on-primary h-touch-target-min px-4 rounded-xl text-label-caps font-semibold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm focus:outline-none"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">add</span>
            Nouveau
          </button>
        </div>

        {/* Erreur */}
        {error && (
          <div role="alert" className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
            <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="space-y-4" aria-busy="true" aria-label="Chargement des chantiers...">
            {Array.from({ length: 3 }).map((_, i) => <ChantierCardSkeleton key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && chantiers.length === 0 && (
          <div className="flex flex-col items-center text-center py-20 gap-4">
            <div className="w-20 h-20 bg-primary-container text-on-primary flex items-center justify-center rounded-full">
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }} aria-hidden="true">foundation</span>
            </div>
            <div>
              <h3 className="text-headline-md text-on-surface">Aucun chantier</h3>
              <p className="text-body-sm text-on-surface-variant mt-1 max-w-xs">
                Creez votre premier chantier pour commencer le suivi.
              </p>
            </div>
            <button
              onClick={() => navigate('/chantiers/nouveau')}
              className="bg-primary text-on-primary font-semibold py-3 px-6 rounded-xl flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm focus:outline-none"
            >
              <span className="material-symbols-outlined" aria-hidden="true">add</span>
              Creer un chantier
            </button>
          </div>
        )}

        {/* Liste */}
        {!loading && chantiers.length > 0 && (
          <div className="space-y-4">
            {chantiers.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/chantiers/${c.id}/stocks`)}
                className="w-full bg-surface-white rounded-xl border border-outline-variant p-5 flex flex-col gap-3 text-left hover:shadow-md hover:scale-[1.01] transition-all focus:outline-none group"
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-headline-md text-on-surface group-hover:text-primary transition-colors">
                    {c.name}
                  </h3>
                  <StatusBadge status={c.status} />
                </div>
                {c.location && (
                  <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }} aria-hidden="true">location_on</span>
                    {c.location}
                  </div>
                )}
                {c.start_date && (
                  <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }} aria-hidden="true">calendar_today</span>
                    Debut : {new Date(c.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
