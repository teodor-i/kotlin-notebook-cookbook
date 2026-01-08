import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { notebooks } from '../../data/notebooks';
import { CodeBlock } from '../../components';
import './NotebookPage.css';

interface NotebookCell {
  cell_type: 'code' | 'markdown';
  source: string[];
  outputs?: Array<{
    output_type: string;
    text?: string[];
    data?: Record<string, string[]>;
  }>;
  metadata?: Record<string, unknown>;
}

interface RawNotebook {
  cells: NotebookCell[];
  metadata?: Record<string, unknown>;
}

export function NotebookPage() {
  const { id } = useParams<{ id: string }>();
  const [notebookContent, setNotebookContent] = useState<RawNotebook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const notebook = useMemo(
    () => notebooks.find((n) => n.id === id),
    [id]
  );

  const headings = useMemo(() => {
    if (!notebookContent) return [];

    return notebookContent.cells
      .filter((cell) => cell.cell_type === 'markdown')
      .flatMap((cell) => {
        const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
        const matches = source.match(/^#{1,3}\s+(.+)$/gm);
        return matches ? matches.map((m) => {
          const level = m.match(/^#+/)?.[0].length || 1;
          const text = m.replace(/^#+\s+/, '');
          return { level, text, id: text.toLowerCase().replace(/\s+/g, '-') };
        }) : [];
      });
  }, [notebookContent]);

  useEffect(() => {
    if (!notebook) {
      setError('Notebook not found');
      setLoading(false);
      return;
    }

    const fetchNotebook = async () => {
      try {
        const response = await fetch(notebook.path);
        if (!response.ok) {
          throw new Error('Failed to load notebook');
        }
        const data = await response.json();
        setNotebookContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load notebook');
      } finally {
        setLoading(false);
      }
    };

    fetchNotebook();
  }, [notebook]);

  if (loading) {
    return (
      <div className="notebook-page">
        <div className="notebook-loading">Loading notebook...</div>
      </div>
    );
  }

  if (error || !notebook) {
    return (
      <div className="notebook-page">
        <div className="notebook-error">
          <h2>Error</h2>
          <p>{error || 'Notebook not found'}</p>
          <Link to="/" className="back-link">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="notebook-page">
      <div className="notebook-container">
        <div className="notebook-content-wrapper">
          <aside className="notebook-sidebar">
            <nav className="notebook-toc">
              <ul>
                {headings.map((heading, index) => (
                  <li key={index} style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
                    <a href={`#${heading.id}`} className="toc-link">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="notebook-main">
            <header className="notebook-header">
              <span className="notebook-date">{notebook.date}</span>
              <h1 className="notebook-title">{notebook.title}</h1>

              <div className="notebook-meta">
                <div className="notebook-authors">
                  {notebook.authors.map((author) => (
                    <div key={author.name} className="author-info">
                      <div className="author-avatar-small">
                        {author.avatar ? (
                          <img src={author.avatar} alt={author.name} />
                        ) : (
                          <span>{author.name[0]}</span>
                        )}
                      </div>
                      <span className="author-name">
                        {author.name}
                        {author.verified && <span className="author-verified-text">(Kotlin)</span>}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="notebook-actions">
                  <a
                    href={`https://github.com/teodor-i/kotlin-notebook-cookbook/blob/main/public${notebook.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="notebook-action-link"
                  >
                    <GitHubIcon />
                    <span className="action-text">Open in GitHub</span>
                  </a>
                </div>
              </div>
            </header>

            <article className="notebook-cells">
              {notebookContent?.cells.map((cell, index) => (
                <NotebookCellView key={index} cell={cell} />
              ))}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

interface NotebookCellViewProps {
  cell: NotebookCell;
}

function NotebookCellView({ cell }: NotebookCellViewProps) {
  const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

  if (cell.cell_type === 'markdown') {
    return (
      <div className="cell cell-markdown">
        <MarkdownContent content={source} />
      </div>
    );
  }

  const outputs = cell.outputs || [];
  const outputText = outputs
    .map((output) => {
      if (output.text) {
        return Array.isArray(output.text) ? output.text.join('') : output.text;
      }
      if (output.data?.['text/plain']) {
        return Array.isArray(output.data['text/plain'])
          ? output.data['text/plain'].join('')
          : output.data['text/plain'];
      }
      return '';
    })
    .filter(Boolean)
    .join('\n');

  return (
    <div className="cell cell-code">
      <CodeBlock code={source} language="kotlin" />
      {outputText && (
        <div className="cell-output">
          <pre>{outputText}</pre>
        </div>
      )}
    </div>
  );
}

interface MarkdownContentProps {
  content: string;
}

function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown parsing
  const html = content
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 id="$1">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>');

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  );
}

