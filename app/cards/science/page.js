'use client';
import React, { useState, useEffect } from 'react';
import { Home, Moon, Sun, Shuffle, Plus, X, Star, BookOpen, CheckCheck, TriangleAlert } from 'lucide-react';
import '../cards.css';
import Timer from '@/components/Timer';

const Flashcards = () => {
  const [mockData, setMockData] = useState([
    {
      id: 1,
      question: "What is Newton's First Law of Motion?",
      answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force (Law of Inertia)",
      difficulty: "normal",
    },
    {
      id: 2,
      question: "What is the formula for photosynthesis?",
      answer: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂ (Carbon dioxide + water + light produces glucose + oxygen)",
      difficulty: "mastered",
    },
    {
      id: 3,
      question: "What is the atomic number?",
      answer: "The number of protons in an atom's nucleus, which determines the chemical element",
      difficulty: "normal",
    },
    {
      id: 4,
      question: "What is the theory of evolution?",
      answer: "The process by which organisms change over time through natural selection and genetic variation",
      difficulty: "difficult",
    },
    {
      id: 5,
      question: "What is Ohm's Law?",
      answer: "V = IR, where V is voltage, I is current, and R is resistance",
      difficulty: "normal",
    },
    {
      id: 6,
      question: "What are the states of matter?",
      answer: "Solid, liquid, gas, and plasma (characterized by different molecular arrangements and energy levels)",
      difficulty: "mastered",
    },
    {
      id: 7,
      question: "What is the periodic law?",
      answer: "The properties of elements are periodic functions of their atomic numbers, forming the basis for the periodic table",
      difficulty: "normal",
    },
    {
      id: 8,
      question: "What is cellular respiration?",
      answer: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (Glucose + oxygen produces carbon dioxide + water + energy)",
      difficulty: "difficult",
    },
    {
      id: 9,
      question: "What is Newton's Law of Universal Gravitation?",
      answer: "F = G(m₁m₂)/r², where F is force, G is gravitational constant, m₁ and m₂ are masses, and r is distance",
      difficulty: "mastered",
    },
    {
      id: 10,
      question: "What is the First Law of Thermodynamics?",
      answer: "Energy cannot be created or destroyed, only transformed from one form to another (Conservation of Energy)",
      difficulty: "normal",
    },
    {
      id: 11,
      question: "What is DNA?",
      answer: "Deoxyribonucleic acid, a double-helix molecule containing genetic instructions for development and functioning of organisms",
      difficulty: "difficult",
    },
    {
      id: 12,
      question: "What is momentum?",
      answer: "p = mv, where p is momentum, m is mass, and v is velocity",
      difficulty: "mastered",
    },
    {
      id: 13,
      question: "What is acid-base neutralization?",
      answer: "Acid + Base → Salt + Water (Example: HCl + NaOH → NaCl + H₂O)",
      difficulty: "normal",
    },
    {
      id: 14,
      question: "What is cell theory?",
      answer: "All living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells",
      difficulty: "normal",
    },
    {
      id: 15,
      question: "What is Boyle's Law?",
      answer: "P₁V₁ = P₂V₂, where P is pressure and V is volume (at constant temperature)",
      difficulty: "difficult",
    },
  ]);   

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  const filteredCards = reviewMode 
    ? mockData.filter(card => card.difficulty === 'difficult') 
    : mockData;

  const shuffleCards = () => {
    const shuffledCards = [...filteredCards]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setMockData(shuffledCards);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddCard = () => {
    if (newCard.question.trim() && newCard.answer.trim()) {
      const newCardWithId = {
        ...newCard,
        id: mockData.length + 1,
        difficulty: 'normal'
      };
      
      setMockData(prevCards => [...prevCards, newCardWithId]);
      setNewCard({ question: '', answer: '' });
      setIsAddingCard(false);
    }
  };

  const updateCardDifficulty = (difficulty) => {
    const updatedCards = mockData.map(card => 
      card.id === filteredCards[currentCard].id 
        ? { ...card, difficulty } 
        : card
    );
    setMockData(updatedCards);

    if (reviewMode && difficulty !== 'difficult') {
      const newFilteredCards = filteredCards.filter((_, index) => index !== currentCard);
      
      if (newFilteredCards.length === 0) {
        setReviewMode(false);
        setCurrentCard(0);
        return;
      }

      setCurrentCard(prev => prev >= newFilteredCards.length ? newFilteredCards.length - 1 : prev);
    }
  };

  const handleNext = () => {
    if (currentCard < filteredCards.length - 1) {
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
    <div className={`flashcard-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {isAddingCard && (
        <div className="add-card-modal">
          <div className="add-card-content">
            <div 
              className="close-add-card" 
              onClick={() => setIsAddingCard(false)}
            >
              <X size={24} />
            </div>
            <h2>Add New Flashcard</h2>
            <div className="add-card-input">
              <textarea 
                placeholder="Enter your question"
                value={newCard.question}
                onChange={(e) => setNewCard(prev => ({
                  ...prev, 
                  question: e.target.value
                }))}
                rows={3}
              />
            </div>
            <div className="add-card-input">
              <textarea 
                placeholder="Enter your answer"
                value={newCard.answer}
                onChange={(e) => setNewCard(prev => ({
                  ...prev, 
                  answer: e.target.value
                }))}
                rows={3}
              />
            </div>
            <button 
              onClick={handleAddCard}
              className="add-card-button"
            >
              Add Card
            </button>
          </div>
        </div>
      )}
      
      <div 
        className="mode-toggle" 
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </div>
      
      <div className="top-controls">
        <a href="/" className="home-icon">
          <Home className="w-8 h-8 text-white hover:scale-110 transition-transform" />
        </a>
        
        <div 
          className="shuffle-icon" 
          onClick={shuffleCards}
          title="Shuffle Cards"
        >
          <Shuffle size={48} />
        </div>

        <div 
          className="add-card-icon" 
          onClick={() => setIsAddingCard(true)}
          title="Add New Card"
        >
          <Plus size={48} />
        </div>

        <div 
          className={`review-mode-icon ${reviewMode ? 'active' : ''}`}
          onClick={() => {
            if (!reviewMode) {
              const difficultCards = mockData.filter(card => card.difficulty === 'difficult');
              if (difficultCards.length > 0) {
                setReviewMode(true);
                setCurrentCard(0);
              } else {
                alert('No difficult cards to review');
              }
            } else {
              setReviewMode(false);
              setCurrentCard(0);
            }
          }}
          title="Toggle Review Mode"
        >
          <BookOpen size={48} />
        </div>
      </div>

      <Timer />
      <div className="progress-container">
        <div className="progress-text">
          Card {currentCard + 1} of {filteredCards.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentCard + 1) / filteredCards.length) * 100}%` }}
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
              {filteredCards[currentCard]?.question}
            </div>
          </div>
          <div className="card-back">
            <div className="card-content">
              {filteredCards[currentCard]?.answer}
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
          className={currentCard === filteredCards.length - 1 ? 'disabled' : ''}
        >
          Next
        </button>
      </div>

      <div className="difficulty-buttons">
        <button 
          className="difficulty-easy"
          onClick={() => updateCardDifficulty('mastered')}
          title="Mark as Mastered"
        >
          <CheckCheck size={24} />
          <span className="difficulty-label">Easy</span>
        </button>
        <button 
          className="difficulty-hard"
          onClick={() => updateCardDifficulty('difficult')}
          title="Mark as Difficult"
        >
          <TriangleAlert size={24} />
          <span className="difficulty-label">Difficult</span>
        </button>
      </div>
    </div>
  );
};

export default Flashcards;