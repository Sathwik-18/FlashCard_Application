'use client';
import React, { useState, useEffect } from 'react';
import { Home, Moon, Sun, Shuffle, Plus, X, Star, BookOpen, CheckCheck, TriangleAlert } from 'lucide-react';
import '../cards.css';
import Timer from '@/components/Timer';

const Flashcards = () => {
  const [mockData, setMockData] = useState([
    { 
        id: 1, 
        question: "Who was the first President of the United States?", 
        answer: "George Washington",
        difficulty: "easy"
    },
    { 
        id: 2, 
        question: "What year did the Titanic sink?", 
        answer: "1912",
        difficulty: "normal"
    },
    { 
        id: 3, 
        question: "What was the primary cause of World War I?", 
        answer: "The assassination of Archduke Franz Ferdinand of Austria",
        difficulty: "difficult"
    },
    { 
        id: 4, 
        question: "Who was the British Prime Minister during World War II?", 
        answer: "Winston Churchill",
        difficulty: "normal"
    },
    { 
        id: 5, 
        question: "What ancient civilization built the pyramids?", 
        answer: "The Egyptians",
        difficulty: "easy"
    },
    { 
        id: 6, 
        question: "Who was the first man to walk on the moon?", 
        answer: "Neil Armstrong",
        difficulty: "mastered"
    },
    { 
        id: 7, 
        question: "What was the name of the ship on which the Pilgrims traveled to America?", 
        answer: "The Mayflower",
        difficulty: "normal"
    },
    { 
        id: 8, 
        question: "What year did the Berlin Wall fall?", 
        answer: "1989",
        difficulty: "normal"
    },
    { 
        id: 9, 
        question: "Who was known as the 'Iron Lady'?", 
        answer: "Margaret Thatcher",
        difficulty: "difficult"
    },
    { 
        id: 10, 
        question: "What was the name of the first successful English colony in America?", 
        answer: "Jamestown",
        difficulty: "difficult"
    },
    { 
        id: 11, 
        question: "What year did the American Civil War begin?", 
        answer: "1861",
        difficulty: "normal"
    },
    { 
        id: 12, 
        question: "Who wrote the Declaration of Independence?", 
        answer: "Thomas Jefferson",
        difficulty: "easy"
    }
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