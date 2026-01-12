import { Skeleton } from '@/components/shadcn_ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="p-4 shadow rounded-md space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}
