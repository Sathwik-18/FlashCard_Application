'use client';
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import '../cards.css';

const mockData = [
    {
        id: 1,
        question: "What is Newton's First Law of Motion?",
        answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force (Law of Inertia)"
    },
    {
        id: 2,
        question: "What is the formula for photosynthesis?",
        answer: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂ (Carbon dioxide + water + light produces glucose + oxygen)"
    },
    {
        id: 3,
        question: "What is the atomic number?",
        answer: "The number of protons in an atom's nucleus, which determines the chemical element"
    },
    {
        id: 4,
        question: "What is the theory of evolution?",
        answer: "The process by which organisms change over time through natural selection and genetic variation"
    },
    {
        id: 5,
        question: "What is Ohm's Law?",
        answer: "V = IR, where V is voltage, I is current, and R is resistance"
    },
    {
        id: 6,
        question: "What are the states of matter?",
        answer: "Solid, liquid, gas, and plasma (characterized by different molecular arrangements and energy levels)"
    },
    {
        id: 7,
        question: "What is the periodic law?",
        answer: "The properties of elements are periodic functions of their atomic numbers, forming the basis for the periodic table"
    },
    {
        id: 8,
        question: "What is cellular respiration?",
        answer: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (Glucose + oxygen produces carbon dioxide + water + energy)"
    },
    {
        id: 9,
        question: "What is Newton's Law of Universal Gravitation?",
        answer: "F = G(m₁m₂)/r², where F is force, G is gravitational constant, m₁ and m₂ are masses, and r is distance"
    },
    {
        id: 10,
        question: "What is the First Law of Thermodynamics?",
        answer: "Energy cannot be created or destroyed, only transformed from one form to another (Conservation of Energy)"
    },
    {
        id: 11,
        question: "What is DNA?",
        answer: "Deoxyribonucleic acid, a double-helix molecule containing genetic instructions for development and functioning of organisms"
    },
    {
        id: 12,
        question: "What is momentum?",
        answer: "p = mv, where p is momentum, m is mass, and v is velocity"
    },
    {
        id: 13,
        question: "What is acid-base neutralization?",
        answer: "Acid + Base → Salt + Water (Example: HCl + NaOH → NaCl + H₂O)"
    },
    {
        id: 14,
        question: "What is cell theory?",
        answer: "All living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells"
    },
    {
        id: 15,
        question: "What is Boyle's Law?",
        answer: "P₁V₁ = P₂V₂, where P is pressure and V is volume (at constant temperature)"
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