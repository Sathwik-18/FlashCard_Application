'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    { 
      id: 1, 
      question: "What is the value of π (pi)?", 
      answer: "3.14159... (An irrational number representing the ratio of a circle's circumference to its diameter)" 
    },
    { 
      id: 2, 
      question: "What is the Pythagorean theorem?", 
      answer: "a² + b² = c², where c is the hypotenuse and a, b are the other two sides of a right triangle" 
    },
    { 
      id: 3, 
      question: "What is the derivative of x²?", 
      answer: "2x (Using the power rule: multiply by the power and reduce the power by 1)" 
    },
    { 
      id: 4, 
      question: "What is the quadratic formula?", 
      answer: "x = (-b ± √(b² - 4ac)) / 2a, used to solve equations in the form ax² + bx + c = 0" 
    },
    { 
      id: 5, 
      question: "What is the formula for the area of a circle?", 
      answer: "A = πr², where r is the radius of the circle" 
    },
    { 
      id: 6, 
      question: "What is the definition of a prime number?", 
      answer: "A number greater than 1 that has no positive divisors other than 1 and itself" 
    },
    { 
      id: 7, 
      question: "What is the formula for the volume of a sphere?", 
      answer: "V = (4/3)πr³, where r is the radius of the sphere" 
    },
    { 
      id: 8, 
      question: "What is the sum of the angles in a triangle?", 
      answer: "180 degrees (or π radians)" 
    },
    { 
      id: 9, 
      question: "What is the formula for arithmetic sequence?", 
      answer: "an = a₁ + (n-1)d, where an is the nth term, a₁ is the first term, and d is the common difference" 
    },
    { 
      id: 10, 
      question: "What is the derivative of sin(x)?", 
      answer: "cos(x)" 
    },
    { 
      id: 11, 
      question: "What is the definition of a factorial?", 
      answer: "n! = n x (n-1) x (n-2) x ... x 2 x 1, representing the product of all positive integers less than or equal to n" 
    },
    { 
      id: 12, 
      question: "What is the formula for the slope of a line?", 
      answer: "m = (y₂ - y₁)/(x₂ - x₁), where (x₁,y₁) and (x₂,y₂) are two points on the line" 
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