import {
  Card as ShadCard,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CardProps = {
  title?: string;
  children?: React.ReactNode;
  cardClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
};

export function Card({
  title,
  children,
  cardClassName,
  contentClassName,
  headerClassName,
  titleClassName,
}: CardProps) {
  return (
    <ShadCard className={`shadow-lg w-full ${cardClassName}`}>
      {title && (
        <CardHeader className={headerClassName}>
          <CardTitle
            className={`text-muted-foreground text-sm font-medium tracking-wide ${titleClassName}`}
          >
            {title}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className={contentClassName}>{children}</CardContent>
    </ShadCard>
  );
}
