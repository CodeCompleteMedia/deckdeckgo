'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'OAuthCallback') {
      // Redirect to sign in page after a short delay
      const timer = setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-gray-600">
          {error === 'OAuthCallback'
            ? 'There was an error during the authentication process. You will be redirected to the sign-in page.'
            : 'An unexpected error occurred. Please try again.'}
        </p>
      </div>
    </div>
  );
} 