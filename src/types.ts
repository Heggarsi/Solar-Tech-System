export interface ServiceItem {
  /** Also the route slug: the site is addressed as "/<slug>", no .html. */
  slug: string;
  title: string;
  desc: string;
  img: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface TestimonialItem {
  avatar: string;
  name: string;
  role: string;
  quote: string;
}

export interface GalleryPhoto {
  file: string;
  width: number;
  height: number;
  orientation: 'landscape' | 'portrait' | 'square';
  title: string;
  caption?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  featuredImage: string;
  excerpt: string;
  content: string[];
  keyPoints: string[];
}
