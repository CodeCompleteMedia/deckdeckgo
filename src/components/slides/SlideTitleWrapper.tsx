import React, { useEffect, useRef } from 'react';
import { SlideTitle } from './SlideTitle';

interface SlideTitleWrapperProps {
  title: string;
}

export const SlideTitleWrapper: React.FC<SlideTitleWrapperProps> = ({ title }) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      (ref.current as any).title = title;
    }
  }, [title]);

  return <slide-title ref={ref} />;
}; 