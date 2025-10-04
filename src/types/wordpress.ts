export interface WordPressPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: Date;
  modified: Date;
  featuredImage?: {
    source_url: string;
    alt_text: string;
    caption: string;
    width: number;
    height: number;
  };
  author?: {
    name: string;
    avatar_urls?: Record<string, string>;
  };
  categories: any[];
  tags: any[];
  link: string;
}