'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { registerLitComponents } from '@/lib/lit-init';

export const NavigationWrapper: React.FC = () => {
  const pathname = usePathname();
  const navigationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register Lit components
    registerLitComponents();

    // Initialize the Lit component
    const navigation = document.createElement('app-navigation');
    navigation.setAttribute('current-path', pathname);

    // Append the navigation element
    if (navigationRef.current) {
      navigationRef.current.appendChild(navigation);
    }

    // Cleanup function
    return () => {
      if (navigationRef.current && navigation.parentNode === navigationRef.current) {
        navigationRef.current.removeChild(navigation);
      }
    };
  }, [pathname]);

  return <div ref={navigationRef} />;
}; 