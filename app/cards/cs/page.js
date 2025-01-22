'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    { 
        id: 1, 
        question: "What does CPU stand for?", 
        answer: "Central Processing Unit" 
    },
    { 
        id: 2, 
        question: "What is the time complexity of binary search?", 
        answer: "O(log n)" 
    },
    { 
        id: 3, 
        question: "What does HTML stand for?", 
        answer: "HyperText Markup Language" 
    },
    { 
        id: 4, 
        question: "What is the main function of an operating system?", 
        answer: "To manage computer hardware and software resources" 
    },
    { 
        id: 5, 
        question: "What is a recursive function?", 
        answer: "A function that calls itself" 
    },
    { 
        id: 6, 
        question: "What is polymorphism in object-oriented programming?", 
        answer: "The ability of different objects to respond to the same method call in different ways" 
    },
    { 
        id: 7, 
        question: "What is the primary purpose of a database?", 
        answer: "To store and organize data" 
    },
    { 
        id: 8, 
        question: "What is the difference between a stack and a queue?", 
        answer: "A stack uses LIFO (last in, first out) while a queue uses FIFO (first in, first out)" 
    },
    { 
        id: 9, 
        question: "What is the name of the algorithm that finds the shortest path in a graph?", 
        answer: "Dijkstra's algorithm" 
    },
    { 
        id: 10, 
        question: "What does API stand for?", 
        answer: "Application Programming Interface" 
    },
    { 
        id: 11, 
        question: "What is the purpose of a firewall in network security?", 
        answer: "To monitor and control incoming and outgoing network traffic based on predetermined security rules" 
    },
    { 
        id: 12, 
        question: "What is the difference between HTTP and HTTPS?", 
        answer: "HTTPS is the secure version of HTTP, using encryption to secure data transfer" 
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