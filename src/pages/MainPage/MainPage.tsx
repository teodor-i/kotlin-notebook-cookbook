import { useMemo } from 'react';
import { TopicCard } from '../../components/TopicCard';
import { NotebookList } from '../../components/NotebookList';
import { notebooks, topics } from '../../data/notebooks';
import './MainPage.css';

export function MainPage() {
  const featuredNotebooks = useMemo(
    () => notebooks.filter((n) => n.featured),
    []
  );

  const popularNotebooks = useMemo(
    () => notebooks.filter((n) => n.popular),
    []
  );

  const handleTopicClick = (topicId: string) => {
    console.log('Topic clicked:', topicId);
    // TODO: Implement filtering by topic
  };

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
            />
          ))}
        </div>
      </section>

      <NotebookList
        notebooks={featuredNotebooks}
        title="Featured cookbooks"
      />

      <NotebookList
        notebooks={popularNotebooks}
        title="Popular cookbooks"
      />

      <NotebookList
        notebooks={notebooks}
        title={`All ${notebooks.length} cookbooks`}
      />
    </div>
  );
}
