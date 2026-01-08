import { Link } from 'react-router-dom';
import type { Notebook } from '../../types';
import './NotebookCard.css';

interface NotebookCardProps {
  notebook: Notebook;
}

export function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <Link to={`/notebook/${notebook.id}`} className="notebook-card">
      <div className="notebook-card-header">
        <span className="notebook-card-date">{notebook.date}</span>
        <div className="notebook-card-authors">
          {notebook.authors.map((author, index) => (
            <div
              key={author.name}
              className="author-avatar"
              style={{ zIndex: notebook.authors.length - index }}
              title={author.name}
            >
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="author-avatar-img" />
              ) : (
                <span className="author-avatar-initials">
                  {getInitials(author.name)}
                </span>
              )}
              {author.verified && (
                <div className="author-verified">
                  <VerifiedIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="notebook-card-content">
        <div className="notebook-card-tags">
          {notebook.tags.map((tag) => (
            <span
              key={tag.name}
              className="notebook-tag"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <h3 className="notebook-card-title">{notebook.title}</h3>
      </div>
    </Link>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function VerifiedIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="256" fill="#7B68EE"/>
      <path d="M256 128L288 192L352 208L304 256L320 320L256 288L192 320L208 256L160 208L224 192L256 128Z" fill="white"/>
    </svg>
  );
}
