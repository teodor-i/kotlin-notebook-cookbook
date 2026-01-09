import type { Notebook, Topic } from '../types';
import { TAG_COLORS } from './constants';
import data from './notebooks.json';

// Convert tag strings to tag objects with colors
const convertTags = (tagNames: string[]) =>
  tagNames.map((name) => ({
    name,
    color: TAG_COLORS[name as keyof typeof TAG_COLORS] || '#6b7280',
  }));

export const topics: Topic[] = data.topics;

export const notebooks: Notebook[] = data.notebooks.map((notebook) => ({
  ...notebook,
  tags: convertTags(notebook.tags),
}));
