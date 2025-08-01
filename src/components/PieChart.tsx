'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { formatToUsd } from '@/lib/utils';

export const description = 'A pie chart with a label list';

const chartConfig = {
  name: {
    label: 'Token',
  },
  value: {
    label: 'Value',
  },
} satisfies ChartConfig;

type Props = {
  data: { name: string; value: number; fill: string }[];
};

export const ChartPieLabelList: React.FC<Props> = ({ data }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Wallet Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-muted dark:[&_.recharts-text]:fill-white"
        >
          <PieChart>
            <ChartTooltip
              content={({ payload }) => {
                if (!payload?.[0]) return null;
                const data = payload[0].payload;
                const total = data.value;
                return (
                  <div className="rounded-lg bg-background p-2 shadow-md border">
                    <p className="text-sm font-medium">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {`${formatToUsd(String(total))}`}
                    </p>
                  </div>
                );
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={'75%'}
              minAngle={10}
              labelLine={{ stroke: 'rgb(156 163 175)', strokeWidth: 0 }}
            >
              <LabelList
                dataKey="name"
                position="outside"
                className="fill-background"
                stroke="none"
                fontSize={12}
                offset={15}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};
