import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import { chantierService } from '../../chantiers/services/chantierService';

/**
 * Page Dashboard SMART-BTP.
 * Affiche un résumé des statistiques et alertes du chantier actif.
 * Backend-ready : chargement via API, skeleton loading, empty state.
 */

export default function DashboardPage() {
  const navigate = useNavigate();
  const [chantiers, setChantiers] = useState([]);
  const [activeChantier, setActiveChantier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger la liste des chantiers au montage
  useEffect(() => {
    const loadChantiers = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await chantierService.getChantiers();
        const list = resp.data || [];
        setChantiers(list);

        // Sélectionner le premier chantier par défaut
        if (list.length > 0) {
          setActiveChantier(list[0]);
        }
      } catch (err) {
        setError('Impossible de charger les chantiers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChantiers();
  }, []);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen pb-8">
        <main className="pt-6 pb-24 px-container-margin max-w-lg mx-auto w-full">
          <div className="skeleton h-8 w-1/3 rounded mb-8" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-xl" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen pb-8">
      <main className="pt-6 pb-24 px-container-margin max-w-lg mx-auto w-full">

        {/* ── En-tête ── */}
        <div className="mb-8">
          <h2 className="text-headline-lg-mobile text-on-surface">Dashboard</h2>
          <p className="text-body-lg text-on-surface-variant mt-1">
            Suivi en temps réel de vos stocks et mouvements
          </p>
        </div>

        {/* ── Erreur ── */}
        {error && (
          <div role="alert" className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
            <span className="material-symbols-outlined text-alert-red" aria-hidden="true">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* ── Aucun chantier ── */}
        {!error && chantiers.length === 0 && (
          <div className="flex flex-col items-center text-center py-20 gap-4">
            <div className="w-20 h-20 bg-primary-container text-on-primary flex items-center justify-center rounded-full">
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }} aria-hidden="true">foundation</span>
            </div>
            <div>
              <h3 className="text-headline-md text-on-surface">Aucun chantier</h3>
              <p className="text-body-sm text-on-surface-variant mt-1 max-w-xs">
                Creez votre premier chantier pour voir le dashboard.
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

        {/* ── Contenu principal ── */}
        {!error && chantiers.length > 0 && activeChantier && (
          <>
            {/* Sélecteur de chantier (si multiple) */}
            {chantiers.length > 1 && (
              <div className="mb-8">
                <label className="text-label-caps text-on-surface-variant block mb-2">CHANTIER ACTIF</label>
                <div className="relative">
                  <select
                    value={activeChantier.id}
                    onChange={(e) => {
                      const ch = chantiers.find((c) => c.id === Number(e.target.value));
                      setActiveChantier(ch);
                    }}
                    className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-body-sm"
                  >
                    {chantiers.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none" aria-hidden="true">
                    expand_more
                  </span>
                </div>
              </div>
            )}

            {/* Informations du chantier */}
            <div className="bg-primary-container rounded-xl p-4 mb-6 border border-primary/20">
              <h3 className="text-headline-md text-on-primary-container font-bold">{activeChantier.name}</h3>
              {activeChantier.location && (
                <p className="text-body-sm text-on-primary-container/80 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">location_on</span>
                  {activeChantier.location}
                </p>
              )}
            </div>

            {/* Statistiques du chantier actif */}
            <DashboardStats chantierId={activeChantier.id} />

            {/* Bouton d'accès rapide aux stocks */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate(`/chantiers/${activeChantier.id}/stocks`)}
                className="flex-1 bg-primary text-on-primary font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm focus:outline-none"
              >
                <span className="material-symbols-outlined" aria-hidden="true">inventory_2</span>
                Voir les stocks
              </button>
              <button
                onClick={() => navigate(`/chantiers/${activeChantier.id}/mouvements`)}
                className="flex-1 bg-surface-container-high text-on-surface font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-highest active:scale-[0.98] transition-all shadow-sm focus:outline-none border border-outline-variant"
              >
                <span className="material-symbols-outlined" aria-hidden="true">swap_horiz</span>
                Mouvements
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
