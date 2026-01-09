import { useMemo, useState } from 'react';
import { TopicCard } from '../../components/TopicCard';
import { NotebookList } from '../../components/NotebookList';
import { notebooks, topics } from '../../data/notebooks';
import './MainPage.css';

export function MainPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredNotebooks = useMemo(() => {
    if (!selectedTopic) return notebooks;
    const topic = topics.find((t) => t.id === selectedTopic);
    if (!topic) return notebooks;
    return notebooks.filter((n) =>
      n.tags.some((tag) => tag.name.toLowerCase() === topic.name.toLowerCase())
    );
  }, [selectedTopic]);

  const featuredNotebooks = useMemo(
    () => filteredNotebooks.filter((n) => n.featured),
    [filteredNotebooks]
  );

  const bestToStartNotebooks = useMemo(
    () => filteredNotebooks.filter((n) => n.bestToStart),
    [filteredNotebooks]
  );

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic((prev) => (prev === topicId ? null : topicId));
  };

  const selectedTopicName = selectedTopic
    ? topics.find((t) => t.id === selectedTopic)?.name
    : null;

  return (
    <div className="main-page">
      <section className="topics-section">
        <h1 className="section-title">Topics</h1>
        <div className="topics-grid">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={handleTopicClick}
              isSelected={selectedTopic === topic.id}
            />
          ))}
        </div>
      </section>

      {selectedTopic && (
        <div className="filter-badge">
          <span>Filtered by: {selectedTopicName}</span>
          <button
            className="filter-clear-btn"
            onClick={() => setSelectedTopic(null)}
          >
            Clear
          </button>
        </div>
      )}

      <NotebookList
        notebooks={bestToStartNotebooks}
        title="Best to start"
      />

      <NotebookList
        notebooks={featuredNotebooks}
        title="Featured cookbooks"
      />

      <NotebookList
        notebooks={filteredNotebooks}
        title={selectedTopic ? `${selectedTopicName} Notebooks` : 'All Notebooks'}
      />
    </div>
  );
}
