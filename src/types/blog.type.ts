export type BlogList = {
  kind: string;
  items: Blog[];
  etag: string;
};

export type Blog = {
  kind: string;
  id: string;
  blog: {
    id: string;
  };
  published: string;
  updated: string;
  url: string;
  selfLink: string;
  title: string;
  content: string;
  images: BlogImage[];
  replies: Replies;
};

export type Replies = {
  totalItems: number;
  selfLink: string;
};

export type BlogImage = {
  url: string;
};
