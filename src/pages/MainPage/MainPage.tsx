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

  const springAiTutorials = useMemo(
    () => filteredNotebooks.filter((n) =>
      n.tags.some((tag) => tag.name === 'Spring AI Tutorials')
    ),
    [filteredNotebooks]
  );

  const kotlinLanguageNotebooks = useMemo(
    () => filteredNotebooks.filter((n) =>
      n.tags.some((tag) => tag.name === 'Kotlin Language')
    ),
    [filteredNotebooks]
  );

  const chartsNotebooks = useMemo(
    () => filteredNotebooks.filter((n) =>
      n.tags.some((tag) => tag.name === 'Charts')
    ),
    [filteredNotebooks]
  );

  const dataFrameExamples = useMemo(
    () => filteredNotebooks.filter((n) =>
      n.tags.some((tag) => tag.name === 'DataFrame Examples')
    ),
    [filteredNotebooks]
  );

  const moreNotebooks = useMemo(() => {
    const shownIds = new Set([
      ...bestToStartNotebooks.map((n) => n.id),
      ...featuredNotebooks.map((n) => n.id),
      ...springAiTutorials.map((n) => n.id),
      ...kotlinLanguageNotebooks.map((n) => n.id),
      ...chartsNotebooks.map((n) => n.id),
      ...dataFrameExamples.map((n) => n.id),
    ]);
    return filteredNotebooks.filter((n) => !shownIds.has(n.id));
  }, [filteredNotebooks, bestToStartNotebooks, featuredNotebooks, springAiTutorials, kotlinLanguageNotebooks, chartsNotebooks, dataFrameExamples]);

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
        title="Getting Started"
      />

      <NotebookList
        notebooks={featuredNotebooks}
        title="Featured Notebooks"
      />

      {springAiTutorials.length > 0 && (
        <NotebookList
          notebooks={springAiTutorials}
          title="Spring AI Tutorials"
        />
      )}

      {kotlinLanguageNotebooks.length > 0 && (
        <NotebookList
          notebooks={kotlinLanguageNotebooks}
          title="Kotlin Language Features"
        />
      )}

      {chartsNotebooks.length > 0 && (
        <NotebookList
          notebooks={chartsNotebooks}
          title="Charts"
        />
      )}

      {dataFrameExamples.length > 0 && (
        <NotebookList
          notebooks={dataFrameExamples}
          title="DataFrame Examples"
        />
      )}

      {moreNotebooks.length > 0 && (
        <NotebookList
          notebooks={moreNotebooks}
          title="More Notebooks"
        />
      )}
    </div>
  );
}
