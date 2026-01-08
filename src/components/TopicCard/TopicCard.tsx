import type { Topic } from '../../types';
import './TopicCard.css';

interface TopicCardProps {
  topic: Topic;
  onClick?: (topicId: string) => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  const handleClick = () => {
    onClick?.(topic.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(topic.id);
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      className="topic-card"
      style={{ background: topic.backgroundImage }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {topic.name}
    </div>
  );
}
