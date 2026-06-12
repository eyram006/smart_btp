import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import GoogleLoginButton from './GoogleLoginButton';
//import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';


export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, success, errors, setErrors } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, (data) => {
      // TODO: stocker token + rediriger vers la page principale
      localStorage.setItem('token', data.token);
      navigate('/chantiers');
    });
  }; 

  // LoginForm.jsx - Remplacer le TODO
// const handleLogout = async () => {
//   try {
//     await authService.logout();
//   } finally {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   }
// };
  
  const handleGoogleLogin = () => {
    // TODO: intégration OAuth Google
    console.log('OAuth Google...');
  };

  return (
    <div className="flex flex-col gap-6 p-8 login-card bg-surface-white rounded-xl">

      {/* Erreur globale */}
      {errors.general && (
        <div role="alert" className="flex items-center gap-2 p-4 border rounded-lg bg-error-container text-on-error-container text-body-sm border-error/20">
          <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
          <span>{errors.general}</span>
        </div>
      )}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>

        {/* Google */}
        <GoogleLoginButton onClick={handleGoogleLogin} disabled={loading || success} />

        {/* Séparateur */}
        <div className="flex items-center gap-4">
          <div className="flex-grow border-t opacity-50 border-outline-variant" />
          <span className="text-label-caps text-on-surface-variant">ou</span>
          <div className="flex-grow border-t opacity-50 border-outline-variant" />
        </div>

        {/* Email */}
        <div className="floating-label-group">
          <input
            id="email"
            type="email"
            placeholder=" "
            required
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full min-h-[64px] px-4 rounded-lg border-2 bg-surface-bright transition-all focus:outline-none focus:ring-0 ${
              errors.email ? 'border-error' : 'border-outline-variant focus:border-primary'
            }`}
          />
          <label htmlFor="email" className="text-body-lg">Adresse e-mail</label>
          {errors.email && (
            <span id="email-error" className="block px-1 mt-1 text-xs text-error" role="alert">
              {errors.email[0]}
            </span>
          )}
        </div>

        {/* Mot de passe */}
        <div className="relative floating-label-group">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder=" "
            required
            value={formData.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={`w-full min-h-[64px] px-4 pr-12 rounded-lg border-2 bg-surface-bright transition-all focus:outline-none focus:ring-0 ${
              errors.password ? 'border-error' : 'border-outline-variant focus:border-primary'
            }`}
          />
          <label htmlFor="password" className="text-body-lg">Mot de passe</label>
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            className="absolute p-2 transition-colors -translate-y-1/2 right-4 top-1/2 text-on-surface-variant hover:text-primary focus:outline-none"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
          {errors.password && (
            <span id="password-error" className="block px-1 mt-1 text-xs text-error" role="alert">
              {errors.password[0]}
            </span>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              id="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
              className="w-5 h-5 rounded cursor-pointer border-outline-variant text-primary focus:ring-primary"
            />
            <span className="transition-colors text-body-sm text-on-surface-variant group-hover:text-on-surface">
              Se souvenir
            </span>
          </label>
          <Link to="/forgot-password" className="transition-all text-label-caps text-primary hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Bouton submit */}
        {success ? (
          <button
            type="button"
            disabled
            aria-live="polite"
            className="w-full h-[56px] bg-secondary text-on-secondary rounded-lg text-headline-md shadow-sm flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
            Bienvenue
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            aria-live="polite"
            className="w-full h-[56px] bg-primary text-on-primary rounded-lg text-headline-md shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin" aria-hidden="true">sync</span>
                Connexion...
              </>
            ) : (
              <>
                Se connecter
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </>
            )}
          </button>
        )}

        {/* Lien inscription */}
        <div className="text-center">
          <p className="text-body-sm text-on-surface-variant">
            Pas encore de compte ?{' '}
            <Link to="/register" className="font-semibold transition-all text-primary hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
