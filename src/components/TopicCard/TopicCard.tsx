import type { Topic } from '../../types';
import './TopicCard.css';

interface TopicCardProps {
  topic: Topic;
  onClick?: (topicId: string) => void;
  isSelected?: boolean;
}

export function TopicCard({ topic, onClick, isSelected }: TopicCardProps) {
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
      role="button"
      tabIndex={0}
      className={`topic-card ${isSelected ? 'topic-card-selected' : ''}`}
      style={{ background: topic.backgroundImage }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {topic.name}
    </div>
  );
}
