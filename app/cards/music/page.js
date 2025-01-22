'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    { 
        id: 1, 
        question: "Who composed the Four Seasons?", 
        answer: "Antonio Vivaldi" 
    },
    { 
        id: 2, 
        question: "What is the highest female singing voice?", 
        answer: "Soprano" 
    },
    { 
        id: 3, 
        question: "What is the largest string instrument in an orchestra?", 
        answer: "Double bass" 
    },
    { 
        id: 4, 
        question: "Who is known as the King of Pop?", 
        answer: "Michael Jackson" 
    },
    { 
        id: 5, 
        question: "What is the name of the musical symbol that indicates the pitch of written notes?", 
        answer: "Clef" 
    },
    { 
        id: 6, 
        question: "Which composer was deaf and still composed music?", 
        answer: "Ludwig van Beethoven" 
    },
    { 
        id: 7, 
        question: "What is the tempo marking for a slow and broad pace?", 
        answer: "Largo" 
    },
    { 
        id: 8, 
        question: "What are the black keys on a piano called?", 
        answer: "Sharps and flats" 
    },
    { 
        id: 9, 
        question: "Who is the lead singer of the band Queen?", 
        answer: "Freddie Mercury" 
    },
    { 
        id: 10, 
        question: "What is the oldest surviving musical instrument?", 
        answer: "Flute" 
    },
    { 
        id: 11, 
        question: "What is the term for a piece of music written for a solo instrument?", 
        answer: "Sonata" 
    },
    { 
        id: 12, 
        question: "What is the musical term for the speed of the beat?", 
        answer: "Tempo" 
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