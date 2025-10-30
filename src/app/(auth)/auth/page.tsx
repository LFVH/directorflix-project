// app/(auth)/auth/page.tsx - Versão com Abas
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/app/(auth)/login/form';
import { SignupForm } from '@/app/(auth)/signup/form';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/letsgo');
  };

  const handleSignupSuccess = () => {
    router.push('/letsgo');
  };

  return (
    <div className="flex flex-col p-6 max-w-md mx-auto">
      {/* Abas */}
      <div className="flex border-b border-gray-600 mb-6">
        <button
          onClick={() => setMode('login')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            mode === 'login'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            mode === 'signup'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          {mode === 'login' ? 'Welcome Back' : 'Create Account' 
          }
        </h1>
        <p className="text-gray-300 mt-2">
          {mode === 'login' 
            ? 'Entre com suas credenciais para acessar sua conta'
            : 'Junte-se a nós hoje e mude para melhor'
          }
        </p>
      </div>

      {/* Form */}
      <div className="mt-4">
        {mode === 'login' ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <SignupForm onLoginSuccess={handleSignupSuccess} />
        )}
      </div>
    </div>
  );
}