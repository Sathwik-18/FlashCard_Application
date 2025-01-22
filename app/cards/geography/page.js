'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    { 
        id: 1, 
        question: "What is the longest river in the world?", 
        answer: "The Nile River" 
    },
    { 
        id: 2, 
        question: "What is the highest mountain in the world?", 
        answer: "Mount Everest" 
    },
    { 
        id: 3, 
        question: "What is the capital city of Japan?", 
        answer: "Tokyo" 
    },
    { 
        id: 4, 
        question: "Which desert is the largest in the world?", 
        answer: "The Sahara Desert" 
    },
    { 
        id: 5, 
        question: "What are the seven continents of the world?", 
        answer: "Asia, Africa, North America, South America, Antarctica, Europe, and Australia" 
    },
    { 
        id: 6, 
        question: "What is the smallest country in the world?", 
        answer: "Vatican City" 
    },
    { 
        id: 7, 
        question: "What is the longest mountain range in the world?", 
        answer: "The Andes" 
    },
    { 
        id: 8, 
        question: "Which ocean is the largest?", 
        answer: "The Pacific Ocean" 
    },
    { 
        id: 9, 
        question: "What is the capital city of Australia?", 
        answer: "Canberra" 
    },
    { 
        id: 10, 
        question: "What river runs through Paris?", 
        answer: "The Seine River" 
    },
    { 
        id: 11, 
        question: "What is the largest country by land area?", 
        answer: "Russia" 
    },
    { 
        id: 12, 
        question: "What is the capital city of Canada?", 
        answer: "Ottawa" 
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