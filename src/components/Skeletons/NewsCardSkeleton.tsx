import { Skeleton } from '@/components/shadcn_ui/skeleton';

export function NewsCardSkeleton() {
  return (
    <div className="rounded-md shadow p-4 space-y-3">
      <Skeleton className="w-full aspect-[16/9] rounded-md" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
