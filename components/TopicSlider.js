import { useState } from 'react';

export default function TopicSlider({ topics, onTopicSelect }) {
  const [hoveredTopic, setHoveredTopic] = useState(null);

  return (
    <div className="slider" style={{"--quantity": topics.length}}>
      {topics.map((topic, index) => (
        <div 
          key={topic.id}
          className={`item ${hoveredTopic === topic.id ? 'hovered' : ''}`}
          style={{"--position": index + 1}}
          onClick={() => onTopicSelect(topic.path)}
          onMouseEnter={() => setHoveredTopic(topic.id)}
          onMouseLeave={() => setHoveredTopic(null)}
        >
          <img src={topic.image} alt={topic.title} />
          <div className="topic-info">
            <h3>{topic.title}</h3>
            <div className="card-count">{topic.cardCount} Cards</div>
            <p className="description">{topic.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}