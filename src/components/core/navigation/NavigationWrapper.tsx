import React, { useEffect, useRef } from 'react';
import { Navigation } from './Navigation';

interface NavigationWrapperProps {
  actions?: 'all' | 'none' | 'editor-less';
  onMenuToggle?: () => void;
  children?: React.ReactNode;
}

export const NavigationWrapper: React.FC<NavigationWrapperProps> = ({
  actions = 'editor-less',
  onMenuToggle,
  children
}) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      (ref.current as any).actions = actions;
      
      const handleMenuToggle = () => {
        onMenuToggle?.();
      };

      ref.current.addEventListener('menuToggle', handleMenuToggle);
      return () => {
        ref.current?.removeEventListener('menuToggle', handleMenuToggle);
      };
    }
  }, [actions, onMenuToggle]);

  return (
    <app-navigation ref={ref}>
      {children}
    </app-navigation>
  );
}; 