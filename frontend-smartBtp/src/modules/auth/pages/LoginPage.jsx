// eslint-disable-next-line no-unused-vars
import React from 'react';
import AuthLayout from '../../../layouts/AuthLayout';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout subtitle="Gestion des stocks & chantiers Togo">
      <LoginForm />
    </AuthLayout>
  );
}
