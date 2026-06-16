import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stockService } from '../services/stockService';
import { chantierService } from '../../chantiers/services/chantierService';

/**
 * Page Liste des Stocks / Inventaire Matériaux pour SMART-BTP.
 * Totalement connectée au backend Laravel.
 */
export default function StocksPage() {
  const { chantierId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chantier, setChantier] = useState(null);

  // Données brutes
  const [materiaux, setMateriaux] = useState([]);
  const [stocks, setStocks] = useState([]);

  // Recherche & Tri
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc'); // name-asc, qty-asc, qty-desc, status-alert
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [materiauxRes, stocksRes, chantierRes] = await Promise.all([
          stockService.getMateriaux(),
          stockService.getStocks(),
          chantierId ? chantierService.getChantier(chantierId) : Promise.resolve(null)
        ]);

        setMateriaux(materiauxRes.data || []);
        setStocks(stocksRes.data || []);
        if (chantierRes) {
          setChantier(chantierRes.data);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des stocks :', err);
        setError('Impossible de charger l\'inventaire des stocks. Veuillez vérifier votre connexion.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [chantierId]);

  // Détermine la quantité de stock et le seuil d'alerte pour chaque matériau
  const mergedInventory = materiaux.map((m) => {
    // Si chantierId est spécifié, on cherche le stock lié à ce chantier
    // Sinon, on calcule le stock global en sommant le stock de tous les chantiers
    const matchingStocks = stocks.filter((s) => Number(s.materiau_id) === Number(m.id));

    let quantite = 0;
    let seuil_alerte = 10; // Valeur par défaut

    if (chantierId) {
      const stockForChantier = matchingStocks.find((s) => Number(s.chantier_id) === Number(chantierId));
      if (stockForChantier) {
        quantite = Number(stockForChantier.quantite);
        seuil_alerte = Number(stockForChantier.seuil_alerte);
      }
    } else {
      // Stock global : somme des quantités
      quantite = matchingStocks.reduce((sum, s) => sum + Number(s.quantite), 0);
      // Pour le seuil d'alerte global, on prend le premier ou 10 par défaut
      if (matchingStocks.length > 0) {
        seuil_alerte = Number(matchingStocks[0].seuil_alerte);
      }
    }

    // Logique de statut du stock
    let status = 'OK';
    if (quantite <= 0) {
      status = 'RUPTURE';
    } else if (quantite <= seuil_alerte) {
      status = 'FAIBLE';
    }

    return {
      ...m,
      quantite,
      seuil_alerte,
      status
    };
  });

  // Filtrage par recherche (nom ou catégorie)
  const filteredInventory = mergedInventory.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesNom = item.nom?.toLowerCase().includes(term);
    const matchesCategorie = item.categorie?.toLowerCase().includes(term);
    return matchesNom || matchesCategorie;
  });

  // Tri de l'inventaire
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return (a.nom || '').localeCompare(b.nom || '');
      case 'qty-asc':
        return a.quantite - b.quantite;
      case 'qty-desc':
        return b.quantite - a.quantite;
      case 'status-alert':
        // RUPTURE d'abord, puis FAIBLE, puis OK
        { const score = (status) => {
          if (status === 'RUPTURE') return 0;
          if (status === 'FAIBLE') return 1;
          return 2;
        };
        return score(a.status) - score(b.status); }
      default:
        return 0;
    }
  });

  // Obtenir l'image correspondante ou un fallback visuel professionnel
  const getMaterialImage = (item) => {
    if (item.image) return item.image;
    
    const name = (item.nom || '').toLowerCase();
    const cat = (item.categorie || '').toLowerCase();

    if (name.includes('ciment')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuATx8-R2gY4FjvWNtHAN0Dfn97qyR5JF8oLy56CLQ8C9njdsj437uHVcpX0lWVwMJZlXXLTmOibM6Pjuw3bvofOF9GgujCKMc_QY6_HV1-zvKIKJtJWtyvTt6PQrHNow2UJLNpe5TU-07NZhVqhjNtypl2WmkeaXl7D7bpZw7nEhE5J1SNn9QiEDRZ2iOA4-2mPZ24U57JyA_bpDtmUj7iwfIFxVRawsUIdXNqo_j4v1CWZYIFklubjcbNZL5BCaaQD08pAfgVslosu';
    }
    if (name.includes('fer') || name.includes('béton')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0P489WX2XobYxq913kWs04IQZiqC3NaZtgINQaPmYL090u7CozdcKPa329_MUqnfiT4uPDg_bZQ5ddaRoHYZlE3sLOYIs8GKWRSbNs5R-OrcgkLEEgiC8Z_Pgp_HwkNvWMSKDYiK3XuqYhAeAF-yWfCucTZm9MpnEyaVzP5Y2FYVkLRPnRnULTx2NnGQyoQszrJMKivO1FR0LW-TQbMVjKJMR55Y6jeVsjLJ56R5eyKqtRDc2LYkxDoDerlIsDfgYvzJGwWOw0rI4';
    }
    if (name.includes('sable')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYMng8ZQJLGdbRLIbij_LKHukcgVcavNRtCNFqXzVa85sjXrUD-Acn5BV9IECMexkR_N1hbY4YVkyxq05YbvsnjbjJ1I_jIGD0EaAqmMiylnsj33rMp3iWPGPyCTI6urkSg-2VMoiHICxEisYyVAx7pdOin1q0LH7a00kDPycUMNudI4-vtMmYgCJGN-JP5zDEq7-qbQa-E2WaGYAo9Ipunn9DMYZPgo7hc3ZtRiULq1G2I4lhcJdTrgL_f5YU5WKrTsOm_CKyKEAR';
    }
    if (name.includes('gaine') || name.includes('icta') || cat.includes('elec') || cat.includes('élec')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGC95X3ZVJbPZ-q3sdbXraZqPrR0tpKc9j3nzD0JAR6tyslUNOG9qdgg_pyI1EPAaOcZZS9hDfGYtC3pNixSJgJlnRuIDZYLh2NMdTT_5ndI_n6KKfXOr-L7j7DYdSzChHgz4hNi2P59_e5n5t_QYF0epNfqD5vAtfLWTT3Tx0rRsnO5PLFD3Mc4Y4ITum3kp0u2zEjV8BwkvOMil4nqTlJjp7W7gxRMPm9NQnBfNRLPYyeBCp3GZP24C0IULLxxZcfThEVd4g7lO';
    }
    if (name.includes('tuyau') || name.includes('pvc') || cat.includes('plomb')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPnuiy06j-TOfwdPmc_ZIJS-6r70q_A7_c-55rzhWXAq17l_x7sFkXRVTN_x9bL5Hat2eb-PbCVrpyrWbytmbUxbM9XTpMsoK3wEyrkMLaYL8gNkSrnsbU2hasEn4QGbhUVQ2A0ZAiCtWaQf4806Vtd7IFYAuD-6FeZq5UJ1305Z8n3Lmu6Y8LLIvOgD9hGgRubMtRc5NCrlaQW_6YkxnEGd3vzLNB9xKBuplLhjVInkDe1VfJ5xCxc5l4Udu5Iqzdnk0llHysbyFd';
    }
    if (name.includes('brique') || cat.includes('macon') || cat.includes('maçon')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuKg_7F0tpcPj5oWLeVaBI7OFPOIm9a_CjW-8zRXkTlOExcdRg29KPTTpykLAzT3gQ0X7bB77ofG9wiT0A9q28RCIuxcxYVTkPXIKMsJ7yuIMsnR13pzuz9jSpjZStjKYJV-TMZX8JaNbWIQhSd-H4qr8D5DqtFoZxJOyNmOOKom56YMVvSH8mldL2kGetvGUrpaACTEk3G2O54aVP8wIXpWQpyoAehv_iAGPDUpQHpkY3I89VEFEyySKrwwjziKfLxZRZBZ2SDlIx';
    }

    return 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=200&auto=format&fit=crop';
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'RUPTURE':
        return 'bg-error-container text-on-error-container';
      case 'FAIBLE':
        return 'bg-tertiary-container text-on-tertiary-container';
      default:
        return 'bg-secondary-container text-on-secondary-container';
    }
  };

  const getQtyTextClass = (status) => {
    switch (status) {
      case 'RUPTURE':
        return 'text-error';
      case 'FAIBLE':
        return 'text-tertiary';
      default:
        return 'text-secondary';
    }
  };

  const formatCategory = (cat) => {
    if (!cat) return '';
    const map = {
      liants: 'Liants',
      metaux: 'Métaux',
      agregats: 'Agrégats',
      maconnerie: 'Maçonnerie',
      finition: 'Finition',
      autres: 'Autres'
    };
    return map[cat.toLowerCase()] || cat;
  };

  return (
    <div className="min-h-screen pb-24 bg-surface text-on-surface">
      <main className="max-w-[1200px] mx-auto px-container-margin pt-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate(`/chantiers/${chantierId}/materiaux/nouveau`)}
            className="flex items-center gap-2 px-4 font-semibold transition-all shadow-sm bg-primary text-on-primary h-touch-target-min rounded-xl text-label-caps hover:opacity-90 active:scale-95 focus:outline-none"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">add</span>
            Nouveau Matériau
          </button>
        </div>

        {/* Barre de Recherche */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative group">
            <span className="absolute -translate-y-1/2 material-symbols-outlined left-4 top-1/2 text-outline" aria-hidden="true">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 transition-all border shadow-sm outline-none h-14 bg-surface-white border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Rechercher un matériau..."
            />
          </div>
        </div>

        {/* Titre de Section & Compteur */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">
              {chantier ? `Stocks - ${chantier.name}` : 'Inventaire Matériaux'}
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              {loading ? 'Chargement...' : `${sortedInventory.length} article${sortedInventory.length !== 1 ? 's' : ''} trouvé${sortedInventory.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Bouton de Tri */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-1 font-bold transition-all text-primary text-body-sm hover:opacity-80 active:scale-95 focus:outline-none"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                sort
              </span>
              Trier
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 z-50 w-48 py-1 mt-2 overflow-hidden border shadow-lg bg-surface-white border-outline-variant rounded-xl">
                <button
                  onClick={() => { setSortBy('name-asc'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-4 py-3 text-body-sm hover:bg-surface-container transition-colors ${sortBy === 'name-asc' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface'}`}
                >
                  Nom (A-Z)
                </button>
                <button
                  onClick={() => { setSortBy('qty-desc'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-4 py-3 text-body-sm hover:bg-surface-container transition-colors ${sortBy === 'qty-desc' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface'}`}
                >
                  Quantité décroissante
                </button>
                <button
                  onClick={() => { setSortBy('qty-asc'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-4 py-3 text-body-sm hover:bg-surface-container transition-colors ${sortBy === 'qty-asc' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface'}`}
                >
                  Quantité croissante
                </button>
                <button
                  onClick={() => { setSortBy('status-alert'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-4 py-3 text-body-sm hover:bg-surface-container transition-colors ${sortBy === 'status-alert' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface'}`}
                >
                  Alerte stock d'abord
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div role="alert" className="flex items-center gap-2 p-4 mb-6 border rounded-xl bg-error-container text-on-error-container text-body-sm border-error/20">
            <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        {/* Squelette de chargement */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Chargement de l'inventaire...">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4 p-4 border bg-surface-white border-outline-variant rounded-xl card-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-surface-container skeleton" />
                  <div className="flex-1 py-1 space-y-2">
                    <div className="w-3/4 h-5 rounded skeleton" />
                    <div className="w-1/2 h-4 rounded skeleton" />
                  </div>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-surface-container-low">
                  <div className="space-y-1">
                    <div className="w-12 h-3 rounded skeleton" />
                    <div className="w-8 h-6 rounded skeleton" />
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="w-10 h-3 rounded skeleton" />
                    <div className="w-12 h-5 rounded skeleton" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liste vide */}
        {!loading && !error && sortedInventory.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-container text-on-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }} aria-hidden="true">
                inventory_2
              </span>
            </div>
            <div>
              <h3 className="text-headline-md text-on-surface">Aucun article</h3>
              <p className="max-w-xs mt-1 text-body-sm text-on-surface-variant">
                Aucun matériau ne correspond à votre recherche ou aucun stock n'est enregistré.
              </p>
            </div>
          </div>
        )}

        {/* Bento Grid des Matériaux */}
        {!loading && !error && sortedInventory.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedInventory.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(chantierId ? `/chantiers/${chantierId}/mouvements` : `/mouvements`)}
                className="relative p-4 overflow-hidden text-left transition-all duration-150 border cursor-pointer bg-surface-white border-outline-variant rounded-xl card-shadow active:scale-95 hover:shadow-md hover:border-primary/20 group"
              >
                {/* Badge de Statut */}
                <div className="absolute top-0 right-0 p-2">
                  <span className={`px-2 py-1 text-label-caps rounded-lg font-bold text-[10px] ${getStatusBadgeClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 overflow-hidden border rounded-lg bg-surface-container border-outline-variant/30">
                    <img
                      className="object-cover w-full h-full"
                      alt={item.nom}
                      src={getMaterialImage(item)}
                      loading="lazy"
                    />
                  </div>
                  <div className="pr-16">
                    <h3 className="font-bold truncate transition-colors text-body-lg text-on-surface group-hover:text-primary">
                      {item.nom}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Catégorie: {formatCategory(item.categorie)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                  <div className="flex flex-col">
                    <span className="text-label-caps text-[10px] text-on-surface-variant">QUANTITÉ</span>
                    <span className={`text-headline-md font-bold ${getQtyTextClass(item.status)}`}>
                      {item.quantite}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-label-caps text-[10px] text-on-surface-variant">UNITÉ</span>
                    <span className="font-bold capitalize text-body-lg">
                      {item.unite || 'unités'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 transition-opacity opacity-0 group-hover:opacity-100">
                  <span className="font-bold text-body-sm text-primary">Enregistrer mouvement</span>
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    chevron_right
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate(chantierId ? `/chantiers/${chantierId}/mouvements` : `/mouvements`)}
        className="fixed z-50 flex items-center justify-center transition-all duration-150 shadow-lg bottom-24 right-container-margin w-14 h-14 bg-primary text-on-primary rounded-xl active:scale-90 hover:scale-105 focus:outline-none"
        aria-label="Enregistrer un nouveau mouvement"
      >
        <span className="material-symbols-outlined text-[32px]" aria-hidden="true">
          add
        </span>
      </button>
    </div>
  );
}
