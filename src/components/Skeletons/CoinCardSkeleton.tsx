import { Card, CardContent, CardHeader } from '@/components/shadcn_ui/card';
import { Skeleton } from '@/components/shadcn_ui/skeleton';

export function CoinCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-7 h-7 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        <Skeleton className="h-5 w-10 rounded-full" />
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-[60px] w-full" />
      </CardContent>
    </Card>
  );
}
