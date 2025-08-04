import type { NewsArticle } from '@/types/NewsArticle';

const BASE_URL = 'https://newsdata.io/api/1/news';

type NewsDataResponse = {
  results: NewsArticle[];
};
export async function getNews(): Promise<NewsArticle[]> {
  const fullUrl = `${BASE_URL}?apikey=${import.meta.env.VITE_NEWSDATA_API_KEY}&q=crypto&language=en`;

  const res = await fetch(fullUrl);
  if (!res.ok) {
    throw new Error(`NewsData API error: ${res.status} ${res.statusText}`);
  } else {
    const data: NewsDataResponse = await res.json();
    const seenTitles = new Set<string>();

    const filteredArticles = data.results.filter(article => {
      if (seenTitles.has(article.title)) {
        return false; // Duplicate title → exclude
      }
      seenTitles.add(article.title);
      return true; // First occurrence → include
    });
    return filteredArticles;
  }
}
