'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    { 
        id: 1, 
        question: "Who was the first President of the United States?", 
        answer: "George Washington" 
    },
    { 
        id: 2, 
        question: "What year did the Titanic sink?", 
        answer: "1912" 
    },
    { 
        id: 3, 
        question: "What was the primary cause of World War I?", 
        answer: "The assassination of Archduke Franz Ferdinand of Austria" 
    },
    { 
        id: 4, 
        question: "Who was the British Prime Minister during World War II?", 
        answer: "Winston Churchill" 
    },
    { 
        id: 5, 
        question: "What ancient civilization built the pyramids?", 
        answer: "The Egyptians" 
    },
    { 
        id: 6, 
        question: "Who was the first man to walk on the moon?", 
        answer: "Neil Armstrong" 
    },
    { 
        id: 7, 
        question: "What was the name of the ship on which the Pilgrims traveled to America?", 
        answer: "The Mayflower" 
    },
    { 
        id: 8, 
        question: "What year did the Berlin Wall fall?", 
        answer: "1989" 
    },
    { 
        id: 9, 
        question: "Who was known as the 'Iron Lady'?", 
        answer: "Margaret Thatcher" 
    },
    { 
        id: 10, 
        question: "What was the name of the first successful English colony in America?", 
        answer: "Jamestown" 
    },
    { 
        id: 11, 
        question: "What year did the American Civil War begin?", 
        answer: "1861" 
    },
    { 
        id: 12, 
        question: "Who wrote the Declaration of Independence?", 
        answer: "Thomas Jefferson" 
    }
];

const MathFlashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (currentCard < mockData.length - 1) {
      setIsAnimating(true);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCard(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setIsAnimating(true);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCard(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === ' ') setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCard, isFlipped]);

  return (
    <div className="flashcard-container">
      <a href="/" className="home-icon">
        <Home className="w-8 h-8 text-white hover:scale-110 transition-transform" />
      </a>
      
      <div className="progress-container">
        <div className="progress-text">
          Card {currentCard + 1} of {mockData.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentCard + 1) / mockData.length) * 100}%` }}
          />
        </div>
      </div>

      <div 
        className={`card ${isFlipped ? 'flipped' : ''} ${isAnimating ? 'animating' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="card-content">
              {mockData[currentCard].question}
            </div>
          </div>
          <div className="card-back">
            <div className="card-content">
              {mockData[currentCard].answer}
            </div>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button 
          onClick={handlePrevious}
          className={currentCard === 0 ? 'disabled' : ''}
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          className={currentCard === mockData.length - 1 ? 'disabled' : ''}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MathFlashcards;