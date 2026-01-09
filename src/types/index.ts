export interface Author {
  name: string;
  avatar?: string;
  verified?: boolean;
}

export interface Notebook {
  id: string;
  title: string;
  date: string;
  authors: Author[];
  tags: Tag[];
  path: string;
  featured?: boolean;
  bestToStart?: boolean;
}

export interface Tag {
  name: string;
  color: string;
}

export interface Topic {
  id: string;
  name: string;
  backgroundImage: string;
  description: string;
  relatedTags?: string[];
}

export interface NotebookCell {
  id: string;
  type: 'code' | 'markdown';
  source: string;
  outputs?: string[];
}

export interface ParsedNotebook {
  title: string;
  cells: NotebookCell[];
}
