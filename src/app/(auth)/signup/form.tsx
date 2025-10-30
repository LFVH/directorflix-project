'use client';

import { Label } from '@/components/signinsignup/label';
import { Input } from '@/components/signinsignup/input';
import { signup } from '@/app/api/auth/auth/signup';
import { useFormStatus } from 'react-dom';
import { useActionState, useState } from 'react';
import { signIn } from "next-auth/react"
import { SignupFormSchema } from '@/app/api/auth/auth/definitions';
import { useRouter, useSearchParams } from 'next/navigation';
interface SignupFormProps {
  onLoginSuccess: () => void;
}
export function SignupForm({ onLoginSuccess }: SignupFormProps) {
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Pega o ID da assinatura da URL
  const assinaturaId = searchParams.get('plan');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      setIsLoading(false);
      return;
    }

     const email = formData.get('email') as string;
      if (email) {
        formData.set('email', email.toLowerCase());
      }
    const result = await signup(undefined, formData);

    setIsLoading(false);

    if (result?.errors) {
      setErrors({
        email: result.errors.email?.[0],
        password: result.errors.password?.[0],
        name: result.errors.name?.[0],
      });
      return;
    }

    if (result?.message) {
      setErrors({ general: result.message });
      return;
    }
    await signIn("credentials", {
      email: result?.data?.email,
      password: formData.get("password"),
      redirect: false,
    });
    if (assinaturaId) {
      router.push(`/?plan=${assinaturaId}`);
    } else {
      onLoginSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Macgo" />
        </div>
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="john@example.com" />
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        {errors.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
             {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </ul>
          </div>
        )}
        
        {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

        <SignupButton isLoading={isLoading} />
      </div>
    </form>
  );
}

export function SignupButton({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="mt-2">
      <button 
        disabled={isLoading} 
        type="submit" 
        className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium text-sm hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Sign up'}
      </button>
    </div>
  );
}