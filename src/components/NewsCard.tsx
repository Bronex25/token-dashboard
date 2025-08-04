import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

type NewsCardProps = {
  title: string;
  imageUrl?: string;
  author?: string;
  publishedAt: string;
  tokenRelated?: string;
  url: string;
};

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  imageUrl,
  author,
  publishedAt,
  url,
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const FALLBACK_IMAGE = './no-image.png';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Card className="flex flex-col overflow-hidden hover:shadow-lg transition duration-200 h-full">
        <img
          src={imageUrl || FALLBACK_IMAGE}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <CardHeader className="pb-2 px-4 pt-3">
          <CardTitle className="text-base font-semibold line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 text-xs text-muted-foreground space-y-2">
          {author && <p>By {author}</p>}
          <p className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            {formattedDate}
          </p>
        </CardContent>
      </Card>
    </a>
  );
};
