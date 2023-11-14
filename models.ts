export interface Content {
  id?: number;
  title: string;
  description?: string;
  text?: string;
  created_at: string;
  updated_at?: string;
  author_id?: number;
  is_public: boolean;
  tags?: Tag[];
  authors?: Author;
}

export interface Tag {
  id: number;
  name: string;
  cnt: number;
}

export interface Author {
  id?: number,
  name: string,
  email: string
}

export const newContent = () => {
  return {
    title: '',
    description: '',
    text: '',
    created_at: new Date().toISOString(),
    is_public: false,
    tags: [],
    authors: {
      name: '',
      email: ''
    }
  } as Content
}
