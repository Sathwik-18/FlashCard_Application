'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    { 
        id: 1, 
        question: "What is the meaning of 'benevolent'?", 
        answer: "Well meaning and kindly" 
    },
    { 
        id: 2, 
        question: "What is a synonym for 'gregarious'?", 
        answer: "Sociable" 
    },
    { 
        id: 3, 
        question: "What does 'ubiquitous' mean?", 
        answer: "Present, appearing, or found everywhere" 
    },
    { 
        id: 4, 
        question: "What is the antonym of 'loquacious'?", 
        answer: "Taciturn" 
    },
    { 
        id: 5, 
        question: "What does 'ephemeral' mean?", 
        answer: "Lasting for a very short time" 
    },
    { 
        id: 6, 
        question: "What is the definition of 'enigma'?", 
        answer: "A person or thing that is mysterious or difficult to understand" 
    },
    { 
        id: 7, 
        question: "What is a synonym for 'altruistic'?", 
        answer: "Selfless" 
    },
    { 
        id: 8, 
        question: "What does 'ambivalent' mean?", 
        answer: "Having mixed feelings or contradictory ideas about something or someone" 
    },
    { 
        id: 9, 
        question: "What is the meaning of 'incessant'?", 
        answer: "Continuing without pause or interruption" 
    },
    { 
        id: 10, 
        question: "What is the antonym of 'arduous'?", 
        answer: "Easy" 
    },
    { 
        id: 11, 
        question: "What does 'vindicate' mean?", 
        answer: "Clear (someone) of blame or suspicion" 
    },
    { 
        id: 12, 
        question: "What is a synonym for 'perplexing'?", 
        answer: "Confusing" 
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