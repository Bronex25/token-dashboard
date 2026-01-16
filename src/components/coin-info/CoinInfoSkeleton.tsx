import React from 'react';
import { Skeleton } from '@/components/shadcn_ui/skeleton';

export const CoinInfoSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-12 w-1/2 mx-auto" />
      <Skeleton className="h-6 w-1/3 mx-auto" />
      <Skeleton className="h-[400px] w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
};

