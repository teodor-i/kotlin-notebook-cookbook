import type { Notebook, Topic } from '../types';

export const topics: Topic[] = [
  { id: 'dataframe', name: 'DataFrame', backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'kandy', name: 'Kandy', backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'kotlindl', name: 'KotlinDL', backgroundImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'coroutines', name: 'Coroutines', backgroundImage: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 'ktor', name: 'Ktor', backgroundImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'basics', name: 'Basics', backgroundImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
];

export const notebooks: Notebook[] = [
  {
    id: 'basics',
    title: 'Basics',
    date: 'Jan 5, 2026',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [
      { name: 'Basics', color: '#22c55e' },
      { name: 'DataFrame', color: '#3b82f6' },
    ],
    path: '/assets/actual_notebooks/Basics.ipynb',
    featured: true,
  },
  {
    id: 'features',
    title: 'Features',
    date: 'Jan 3, 2026',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [{ name: 'Features', color: '#8b5cf6' }],
    path: '/assets/actual_notebooks/Features.ipynb',
    featured: true,
    popular: true,
  },
  {
    id: 'http-example',
    title: 'HTTP Example',
    date: 'Dec 28, 2025',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [
      { name: 'Ktor', color: '#ef4444' },
      { name: 'HTTP', color: '#f97316' },
    ],
    path: '/assets/actual_notebooks/http-example.ipynb',
    featured: true,
  },
  {
    id: 'weather-notebook',
    title: 'Weather Notebook',
    date: 'Dec 20, 2025',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [
      { name: 'API', color: '#06b6d4' },
      { name: 'DataFrame', color: '#3b82f6' },
    ],
    path: '/assets/actual_notebooks/Weather Notebook.ipynb',
    popular: true,
  },
  {
    id: 'import',
    title: 'Import',
    date: 'Dec 15, 2025',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [{ name: 'Basics', color: '#22c55e' }],
    path: '/assets/actual_notebooks/import.ipynb',
  },
  {
    id: 'benchmarks',
    title: 'Benchmarks',
    date: 'Dec 10, 2025',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [{ name: 'Performance', color: '#eab308' }],
    path: '/assets/actual_notebooks/benchmarks.ipynb',
    popular: true,
  },
  {
    id: 'currency-rates',
    title: 'Get Currency Rates',
    date: 'Dec 5, 2025',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [
      { name: 'API', color: '#06b6d4' },
      { name: 'Finance', color: '#10b981' },
    ],
    path: '/assets/actual_notebooks/Get Currency Rates.ipynb',
  },
  {
    id: 'kotlin-22-features',
    title: 'Learn Kotlin 2.2 features',
    date: 'Nov 28, 2025',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [
      { name: 'Kotlin 2.2', color: '#a855f7' },
      { name: 'Features', color: '#8b5cf6' },
    ],
    path: '/assets/actual_notebooks/Learn Kotlin 2.2 features.ipynb',
  },
  {
    id: 'new-library-documentation',
    title: 'New Library documentation',
    date: 'Nov 20, 2025',
    authors: [{ name: 'Kotlin team', verified: true }],
    tags: [{ name: 'Documentation', color: '#6b7280' }],
    path: '/assets/actual_notebooks/New Library documentation.ipynb',
  },
];
