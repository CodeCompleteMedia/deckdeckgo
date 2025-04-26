'use client';

import React, { useEffect, useRef } from 'react';
import { SignIn } from './SignIn';

interface SignInWrapperProps {
  providers: any;
}

export const SignInWrapper: React.FC<SignInWrapperProps> = ({ providers }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        // Handle click outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <SignIn providers={providers} />
    </div>
  );
}; 