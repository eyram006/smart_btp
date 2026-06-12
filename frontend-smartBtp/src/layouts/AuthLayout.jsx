import React from 'react';

/**
 * Layout centré pour les pages d'authentification (Login, Register, ForgotPassword).
 * Correspond exactement à la maquette Stitch.
 */
export default function AuthLayout({ children, subtitle }) {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-4">

      {/* Container principal */}
      <main className="w-full max-w-[440px] flex flex-col gap-8">

        {/* Brand Header */}
        <header className="flex flex-col items-center text-center gap-2">
          <div className="w-16 h-16 bg-primary-container text-on-primary flex items-center justify-center rounded-xl mb-2 shadow-md">
            <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>construction</span>
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
            SMART-BTP
          </h1>
          {subtitle && (
            <p className="text-body-lg text-on-surface-variant">{subtitle}</p>
          )}
        </header>

        {/* Slot contenu (formulaire) */}
        {children}

        {/* Footer */}
        <footer className="text-center">
          <p className="text-body-sm text-on-surface-variant">
            Première connexion ?{' '}
            <a className="text-primary font-semibold hover:underline" href="#">
              Contactez l'administrateur
            </a>
          </p>
        </footer>
      </main>

      {/* Décorations desktop */}
      <div className="hidden lg:block fixed -bottom-20 -left-20 w-96 h-96 bg-primary-container opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden lg:block fixed -top-20 -right-20 w-96 h-96 bg-secondary-container opacity-5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
