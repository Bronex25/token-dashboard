import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn_ui/card';
import { Skeleton } from '@/components/shadcn_ui/skeleton';

export function PieChartSkeleton() {
  return (
    <Card className="flex flex-col max-h-fit">
      <CardHeader className="items-center pb-0">
        <CardTitle>Wallet Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="max-h-full w-full flex items-center justify-center">
          {/* Circular skeleton for the pie chart */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <Skeleton className="w-64 h-64 rounded-full" />
            {/* Inner circle to create donut effect */}
            <div className="absolute w-32 h-32 bg-background rounded-full" />
            {/* Center content skeleton */}
            <div className="absolute flex flex-col items-center justify-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>

        {/* Legend items skeleton */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-14" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-18" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
