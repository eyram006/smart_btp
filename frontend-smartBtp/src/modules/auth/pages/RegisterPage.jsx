import React from 'react';
import AuthLayout from '../../../layouts/AuthLayout';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout subtitle="Optimisez la gestion de vos stocks et chantiers.">
      <RegisterForm />
    </AuthLayout>
  );
}
