import { useEffect, useState } from 'react';
import { dashboardService } from '../services/dashboardService';

/**
 * Composant d'affichage des statistiques du dashboard.
 * Affiche : résumé stock, alertes, derniers mouvements, consommation.
 *
 * @param {number|string} chantierId - ID du chantier actif
 */
export default function DashboardStats({ chantierId }) {
  const [stockSummary, setStockSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [consumption, setConsumption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chantierId) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, alertsRes, movementsRes, consumptionRes] = await Promise.all([
          dashboardService.getStockSummary(chantierId),
          dashboardService.getAlerts(chantierId),
          dashboardService.getMovements(chantierId, { limit: 5 }),
          dashboardService.getWeeklyConsumption(chantierId),
        ]);

        setStockSummary(summaryRes.data);
        setAlerts(alertsRes.data || []);
        setMovements(movementsRes.data || []);
        setConsumption(consumptionRes.data);
      } catch (err) {
        setError('Impossible de charger les statistiques du dashboard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [chantierId]);

  if (loading) {
    return (
      <div className="space-y-4" aria-busy="true">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-white rounded-xl border border-outline-variant p-4 h-24 skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
        <span className="material-symbols-outlined text-alert-red" aria-hidden="true">error</span>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Résumé Stock (4 colonnes) ── */}
      {stockSummary && (
        <div className="grid grid-cols-2 gap-3">
          {/* Total Materials */}
          <div className="bg-primary-container rounded-xl p-4 flex flex-col gap-2 border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-on-primary-container text-label-caps font-semibold">Matériaux</span>
              <span className="material-symbols-outlined text-primary" aria-hidden="true">inventory_2</span>
            </div>
            <p className="text-headline-md text-on-primary-container font-bold">
              {stockSummary.total_materials || 0}
            </p>
          </div>

          {/* Total Quantity */}
          <div className="bg-secondary-container rounded-xl p-4 flex flex-col gap-2 border border-secondary/20">
            <div className="flex items-center justify-between">
              <span className="text-on-secondary-container text-label-caps font-semibold">Quantité</span>
              <span className="material-symbols-outlined text-secondary" aria-hidden="true">scale</span>
            </div>
            <p className="text-headline-md text-on-secondary-container font-bold">
              {stockSummary.total_quantity || 0}
            </p>
          </div>

          {/* Low Stock */}
          <div className="bg-tertiary-container rounded-xl p-4 flex flex-col gap-2 border border-tertiary/20">
            <div className="flex items-center justify-between">
              <span className="text-on-tertiary-container text-label-caps font-semibold">Faibles stocks</span>
              <span className="material-symbols-outlined text-tertiary" aria-hidden="true">warning</span>
            </div>
            <p className="text-headline-md text-on-tertiary-container font-bold">
              {alerts.length}
            </p>
          </div>

          {/* Weekly Consumption */}
          <div className="bg-error-container rounded-xl p-4 flex flex-col gap-2 border border-error/20">
            <div className="flex items-center justify-between">
              <span className="text-on-error-container text-label-caps font-semibold">Conso. sem.</span>
              <span className="material-symbols-outlined text-error" aria-hidden="true">trending_down</span>
            </div>
            <p className="text-headline-md text-on-error-container font-bold">
              {consumption?.weekly_consumption || 0}
            </p>
          </div>
        </div>
      )}

      {/* ── Alertes ── */}
      {alerts.length > 0 && (
        <section className="bg-surface-white rounded-xl border border-outline-variant overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-error" aria-hidden="true">notifications_active</span>
            <h3 className="text-headline-md text-on-surface">Alertes</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {alerts.slice(0, 5).map((alert, idx) => (
              <div key={idx} className="p-4 flex items-start gap-3 hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-alert-red mt-0.5" aria-hidden="true">priority_high</span>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm text-on-surface font-semibold truncate">
                    {alert.material_name}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Stock: {alert.current_quantity} / Seuil: {alert.threshold}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Derniers Mouvements ── */}
      {movements.length > 0 && (
        <section className="bg-surface-white rounded-xl border border-outline-variant overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" aria-hidden="true">history</span>
            <h3 className="text-headline-md text-on-surface">Mouvements récents</h3>
          </div>
          <div className="divide-y divide-outline-variant max-h-72 overflow-y-auto">
            {movements.map((mov, idx) => (
              <div key={idx} className="p-4 flex items-start gap-3 hover:bg-surface-container-low transition-colors">
                <span
                  className={`material-symbols-outlined mt-0.5 ${
                    mov.type === 'entrée' ? 'text-secondary' : 'text-tertiary'
                  }`}
                  aria-hidden="true"
                >
                  {mov.type === 'entrée' ? 'arrow_downward' : 'arrow_upward'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm text-on-surface font-semibold truncate">
                    {mov.material_name}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {mov.type === 'entrée' ? '+' : '-'}{mov.quantity} • {mov.etape_name || 'Sans étape'}
                  </p>
                </div>
                <span className="text-xs text-on-surface-variant shrink-0">
                  {new Date(mov.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Empty State ── */}
      {alerts.length === 0 && movements.length === 0 && (
        <div className="flex flex-col items-center text-center py-12 gap-3">
          <span className="material-symbols-outlined text-outline text-5xl" aria-hidden="true">inbox</span>
          <p className="text-body-sm text-on-surface-variant">Aucune alerte ni mouvement pour l'instant</p>
        </div>
      )}
    </div>
  );
}
