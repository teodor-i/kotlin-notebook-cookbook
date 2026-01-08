import type { Notebook } from '../../types';
import { NotebookCard } from '../NotebookCard';
import './NotebookList.css';

interface NotebookListProps {
  notebooks: Notebook[];
  title: string;
}

export function NotebookList({ notebooks, title }: NotebookListProps) {
  if (notebooks.length === 0) {
    return null;
  }

  return (
    <section className="notebook-list-section">
      <h2 className="notebook-list-title">{title}</h2>
      <div className="notebook-list-grid">
        {notebooks.map((notebook) => (
          <NotebookCard key={notebook.id} notebook={notebook} />
        ))}
      </div>
    </section>
  );
}
