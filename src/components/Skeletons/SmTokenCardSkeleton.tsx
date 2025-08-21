import { Skeleton } from '@/components/ui/skeleton';

export function SmTokenCardSkeleton() {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-1">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
}
