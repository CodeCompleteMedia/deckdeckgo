'use client';

import { getProviders } from 'next-auth/react';
import { SignInWrapper } from '@/components/auth/SignInWrapper';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    fetchProviders();
  }, []);

  if (!providers) {
    return <div>Loading...</div>;
  }

  return <SignInWrapper providers={providers} />;
} 