/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

/** Champ de formulaire avec icône et gestion d'erreur */
function FormField({ label, id, name, icon, error, children }) {
  return (
    <div className="space-y-1">
      <label className="text-label-caps text-on-surface-variant px-1 block" htmlFor={id}>
        {label}
      </label>
      <div className={`relative flex items-center border rounded-lg bg-surface-container-lowest h-[56px] transition-all duration-150 form-input-focus focus-within:ring-2 ${
        error ? 'border-error focus-within:ring-error/20' : 'border-outline focus-within:ring-primary/20'
      }`}>
        {icon && (
          <span className="material-symbols-outlined px-3 text-on-surface-variant" aria-hidden="true">{icon}</span>
        )}
        {children}
      </div>
      {error && (
        <span className="text-error text-xs px-1 block mt-1" role="alert">{error[0]}</span>
      )}
    </div>
  );
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nom_complet: '',
    telephone: '',
    email: '',
    date_naissance: '',
    role: '',
    password: '',
    password_confirmation: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setErrors({ terms: ["Vous devez accepter les conditions d'utilisation."] });
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      await authService.register(formData);
      setSuccess(true);
      setFormData({ nom_complet: '', telephone: '', email: '', date_naissance: '', role: '', password: '', password_confirmation: '' });
      setAcceptTerms(false);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: error.response?.data?.message || 'Une erreur de communication est survenue.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-transparent border-none focus:ring-0 text-on-surface text-body-lg px-0 focus:outline-none";

  return (
    <div className="login-card bg-surface-white p-6 md:p-8 rounded-xl flex flex-col gap-5 w-full">

      <h2 className="text-headline-md text-on-surface">Créer un compte</h2>

      {/* Erreur globale */}
      {errors.general && (
        <div role="alert" className="p-4 rounded-lg bg-error-container text-on-error-container text-body-sm flex items-center gap-2 border border-error/20">
          <span className="material-symbols-outlined text-alert-red" style={{ fontSize: '20px' }} aria-hidden="true">error</span>
          <span>{errors.general}</span>
        </div>
      )}

      {/* Succès */}
      {success && (
        <div role="status" className="p-4 rounded-lg bg-secondary-container text-on-secondary-container text-body-sm flex items-center gap-2 border border-secondary/20">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">check_circle</span>
          <span>Votre compte SMART-BTP a été créé avec succès ! Vous pouvez maintenant vous connecter.</span>
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>

        {/* Nom complet */}
        <FormField label="Nom complet" id="nom_complet" name="nom_complet" icon="person" error={errors.nom_complet}>
          <input
            id="nom_complet" name="nom_complet" type="text"
            placeholder="Ex: Jean Dupont" required
            value={formData.nom_complet} onChange={handleChange}
            aria-invalid={!!errors.nom_complet}
            className={inputClass}
          />
        </FormField>

        {/* Téléphone */}
        <FormField label="Numéro de téléphone" id="telephone" name="telephone" icon="call" error={errors.telephone}>
          <input
            id="telephone" name="telephone" type="tel"
            placeholder="+228 XX XX XX XX" required
            value={formData.telephone} onChange={handleChange}
            aria-invalid={!!errors.telephone}
            className={inputClass}
          />
        </FormField>

        {/* Email */}
        <FormField label="Adresse e-mail" id="email" name="email" icon="mail" error={errors.email}>
          <input
            id="email" name="email" type="email"
            placeholder="contact@example.com" required
            value={formData.email} onChange={handleChange}
            aria-invalid={!!errors.email}
            className={inputClass}
          />
        </FormField>

        {/* Date de naissance */}
        <FormField label="Date de naissance" id="date_naissance" name="date_naissance" icon="calendar_month" error={errors.date_naissance}>
          <input
            id="date_naissance" name="date_naissance" type="date" required
            value={formData.date_naissance} onChange={handleChange}
            aria-invalid={!!errors.date_naissance}
            className={`${inputClass} pr-3`}
          />
        </FormField>

        {/* Rôle */}
        <FormField label="Rôle" id="role" name="role" icon="badge" error={errors.role}>
          <select
            id="role" name="role" required
            value={formData.role} onChange={handleChange}
            aria-invalid={!!errors.role}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Choisir un rôle</option>
            <option value="owner">Propriétaire de chantier</option>
            <option value="manager">Maître de chantier</option>
            <option value="stockkeeper">Magasinier</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant" aria-hidden="true">expand_more</span>
        </FormField>

        {/* Mot de passe */}
        <FormField label="Mot de passe" id="password" name="password" icon="lock" error={errors.password}>
          <input
            id="password" name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••" required
            value={formData.password} onChange={handleChange}
            aria-invalid={!!errors.password}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? 'Masquer' : 'Afficher'}
            className="px-3 flex items-center text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </FormField>

        {/* Confirmation mot de passe */}
        <FormField label="Confirmer le mot de passe" id="password_confirmation" name="password_confirmation" icon="verified_user" error={errors.password_confirmation}>
          <input
            id="password_confirmation" name="password_confirmation"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••" required
            value={formData.password_confirmation} onChange={handleChange}
            aria-invalid={!!errors.password_confirmation}
            className={inputClass}
          />
        </FormField>

        {/* CGU */}
        <div className="flex items-start gap-3 pt-1">
          <input
            id="terms" type="checkbox" required
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 rounded border-outline text-primary focus:ring-primary h-5 w-5 cursor-pointer"
          />
          <label htmlFor="terms" className="text-body-sm text-on-surface-variant">
            J'accepte les{' '}
            <a href="#" className="text-primary font-semibold hover:underline">conditions d'utilisation</a>
            {' '}et la{' '}
            <a href="#" className="text-primary font-semibold hover:underline">politique de confidentialité</a>.
          </label>
        </div>
        {errors.terms && (
          <span className="text-error text-xs px-1 block" role="alert">{errors.terms[0]}</span>
        )}

        {/* Bouton submit */}
        {success ? (
          <button
            type="button" disabled aria-live="polite"
            className="w-full h-[56px] bg-secondary text-on-secondary rounded-xl text-headline-md shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
            Compte créé !
          </button>
        ) : (
          <button
            type="submit" disabled={loading} aria-live="polite"
            className="w-full h-[56px] bg-primary hover:opacity-90 text-on-primary text-headline-md font-bold rounded-xl transition-all duration-150 active:scale-95 shadow-md flex justify-center items-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin" aria-hidden="true">sync</span>
                Enregistrement...
              </>
            ) : (
              <>
                Créer un compte
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </>
            )}
          </button>
        )}
      </form>

      {/* Lien connexion */}
      <div className="text-center">
        <p className="text-body-sm text-on-surface-variant">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline transition-all">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
