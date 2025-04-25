"use client";

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  slot?: string;
}

export function Skeleton({ className, slot, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      slot={slot}
      {...props}
    />
  );
} 