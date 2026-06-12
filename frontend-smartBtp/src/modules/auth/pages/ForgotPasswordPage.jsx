import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // TODO: authService.forgotPassword({ email })
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Réinitialisez votre mot de passe">
      <div className="login-card bg-surface-white p-8 rounded-xl flex flex-col gap-6">

        {error && (
          <div role="alert" className="p-4 rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
            <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 bg-secondary-container text-on-secondary-container flex items-center justify-center rounded-full">
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }} aria-hidden="true">mark_email_read</span>
            </div>
            <div>
              <h2 className="text-headline-md text-on-surface mb-1">E-mail envoyé !</h2>
              <p className="text-body-sm text-on-surface-variant">
                Un lien de réinitialisation a été envoyé à <strong>{email}</strong>.
                Vérifiez votre boîte de réception.
              </p>
            </div>
            <Link
              to="/login"
              className="w-full h-[56px] bg-primary text-on-primary rounded-lg text-headline-md flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
            <div>
              <h2 className="text-headline-md text-on-surface mb-1">Mot de passe oublié ?</h2>
              <p className="text-body-sm text-on-surface-variant">
                Entrez votre adresse e-mail et nous vous enverrons un lien de réinitialisation.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-label-caps text-on-surface-variant px-1 block" htmlFor="fp-email">
                Adresse e-mail
              </label>
              <div className="relative flex items-center border border-outline rounded-lg bg-surface-container-lowest h-[56px] form-input-focus focus-within:ring-2 focus-within:ring-primary/20">
                <span className="material-symbols-outlined px-3 text-on-surface-variant" aria-hidden="true">mail</span>
                <input
                  id="fp-email" type="email" required
                  placeholder="contact@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface text-body-lg px-0 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full h-[56px] bg-primary text-on-primary rounded-lg text-headline-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin" aria-hidden="true">sync</span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer le lien
                  <span className="material-symbols-outlined" aria-hidden="true">send</span>
                </>
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-body-sm text-primary font-semibold hover:underline inline-flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }} aria-hidden="true">arrow_back</span>
                Retour à la connexion
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
