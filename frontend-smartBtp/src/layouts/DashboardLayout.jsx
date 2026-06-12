import { NavLink, Link, Outlet } from 'react-router-dom';

/**
 * Layout principal de l'application SMART-BTP avec :
 * - Top AppBar fixe
 * - Bottom Navigation Bar mobile-first (5 onglets)
 * - Slot <Outlet /> pour les pages enfants
 *
 * Correspond exactement à la maquette Stitch.
 */

const NAV_ITEMS = [
  { to: '/dashboard',   icon: 'dashboard',   label: 'Dashboard'   },
  { to: '/stocks',      icon: 'inventory_2', label: 'Stocks'      },
  { to: '/mouvements',  icon: 'swap_horiz',  label: 'Mouvements'  },
  { to: '/chantiers',   icon: 'foundation',  label: 'Chantiers'   },
  { to: '/plus',        icon: 'more_horiz',  label: 'Plus'        },
];

export default function DashboardLayout() {
  return (
    <div className="bg-surface min-h-screen pb-20 text-on-surface">

      {/* ── Top AppBar ── */}
      <header className="bg-surface-white border-b border-outline-variant shadow-sm flex justify-between items-center w-full px-container-margin h-touch-target-min fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" aria-hidden="true">construction</span>
          <h1 className="text-headline-md text-primary">SMART-BTP</h1>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="hover:bg-surface-container-low p-2 rounded-full transition-colors focus:outline-none flex items-center justify-center"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">notifications</span>
          </button>
          <Link
            to="/profile"
            className="hover:bg-surface-container-low p-2 rounded-full transition-colors focus:outline-none flex items-center justify-center text-on-surface-variant w-10 h-10"
            aria-label="Profil"
          >
            <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">account_circle</span>
          </Link>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="pt-touch-target-min">
        <Outlet />
      </main>

      {/* ── Bottom Navigation Bar ── */}
      <nav
        className="fixed bottom-0 left-0 w-full flex justify-around items-center px-gutter py-2 bg-surface-white border-t border-outline-variant shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50 rounded-t-xl h-20"
        aria-label="Navigation principale"
      >
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-2 py-1 w-16 h-12 rounded-xl transition-all duration-100 ease-out focus:outline-none ${
                isActive
                  ? 'bg-primary-container text-on-primary-container scale-90'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
            aria-label={label}
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24" : undefined }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span className="text-label-caps mt-0.5">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
