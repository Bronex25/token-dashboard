export type NewsArticle = {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator: string[]; // authors
  video_url?: string;
  description?: string;
  content?: string;
  pubDate: string;
  image_url?: string;
  source_id: string;
  source_url?: string;
  category?: string[];
  language: string;
  country?: string[];
  content_type?: string;
  ai_tag?: string[];
  sentiment?: {
    type: 'positive' | 'neutral' | 'negative';
    score: number;
  };
};
