import React, { useEffect, useRef } from 'react';
import { SignIn } from './SignIn';

interface SignInWrapperProps {
  onSignInError?: (error: Error) => void;
}

export const SignInWrapper: React.FC<SignInWrapperProps> = ({ onSignInError }) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      const handleSignInError = (event: CustomEvent) => {
        onSignInError?.(event.detail);
      };

      ref.current.addEventListener('signInError', handleSignInError as EventListener);
      return () => {
        ref.current?.removeEventListener('signInError', handleSignInError as EventListener);
      };
    }
  }, [onSignInError]);

  return <app-signin ref={ref} />;
}; 