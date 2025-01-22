'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    { 
        id: 1, 
        question: "Who painted the Mona Lisa?", 
        answer: "Leonardo da Vinci" 
    },
    { 
        id: 2, 
        question: "What is the art movement characterized by a focus on light and color, often painted outdoors?", 
        answer: "Impressionism" 
    },
    { 
        id: 3, 
        question: "Who is known for the painting 'Starry Night'?", 
        answer: "Vincent van Gogh" 
    },
    { 
        id: 4, 
        question: "What is the term for a three-dimensional artwork created by shaping or combining materials?", 
        answer: "Sculpture" 
    },
    { 
        id: 5, 
        question: "What is the technique of painting on wet plaster called?", 
        answer: "Fresco" 
    },
    { 
        id: 6, 
        question: "Who created the statue of David?", 
        answer: "Michelangelo" 
    },
    { 
        id: 7, 
        question: "What is the term for a painting or drawing of an arrangement of objects?", 
        answer: "Still life" 
    },
    { 
        id: 8, 
        question: "What is the primary element of art used to create the outline or contour of a shape?", 
        answer: "Line" 
    },
    { 
        id: 9, 
        question: "What is the art style that uses geometric shapes and is often associated with Pablo Picasso?", 
        answer: "Cubism" 
    },
    { 
        id: 10, 
        question: "What is the term for the visual art of designing typefaces and layouts?", 
        answer: "Typography" 
    },
    { 
        id: 11, 
        question: "What art movement is Salvador Dalí associated with?", 
        answer: "Surrealism" 
    },
    { 
        id: 12, 
        question: "What is the name of the technique where small dots of color are applied in patterns to form an image?", 
        answer: "Pointillism" 
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