import { NewsCardSkeleton } from './skeletons/NewsCardSkeleton';
import { NewsCard } from './NewsCard';
import type { NewsArticle } from '@/types/NewsArticle';

type Props = {
  news: NewsArticle[] | undefined;
  isLoading: boolean;
};

const NewsTable = ({ news, isLoading }: Props) => {
  return (
    <section className="w-full">
      <h1 className="text-2xl font-medium mb-10 text-center">
        Last Crypto News
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {isLoading || !news ? (
          Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
        ) : news.length > 0 ? (
          news.map(article => (
            <NewsCard
              title={article.title}
              key={article.article_id}
              author={
                article.creator && article.creator.length > 0
                  ? article.creator[0]
                  : 'Unknown'
              }
              imageUrl={article.image_url}
              publishedAt={article.pubDate}
              url={article.link}
            />
          ))
        ) : (
          <p>There are no news at the moment</p>
        )}
      </div>
    </section>
  );
};

export default NewsTable;
