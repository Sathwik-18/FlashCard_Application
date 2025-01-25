import React, { useState, useEffect } from 'react';
import { Timer, Pause, Play, X, Moon, Sun } from 'lucide-react';

const StudyTimer = () => {
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSetup, setIsSetup] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [duration, setDuration] = useState(10);
  const [time, setTime] = useState(duration * 60);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsTimerVisible(!isTimerVisible);
    setIsSetup(true);
    setTime(duration * 60);
  };

  const startTimer = () => {
    setIsSetup(false);
    setTime(duration * 60);
  };

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsSetup(true);
    setIsRunning(false);
    setTime(duration * 60);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`study-timer-container ${isDarkMode ? 'dark-mode' : ''}`}>

      {!isTimerVisible ? (
        <div 
          className="alarm-icon" 
          onClick={toggleTimer}
        >
          <Timer size={44} />
        </div>
      ) : (
        <div className="timer-line-container">
          <div className="timer-line">
            <X 
              size={24} 
              className="close-icon" 
              onClick={toggleTimer}
            />
            {isSetup ? (
              <div className="timer-setup">
                <input 
                  type="number" 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  min="1"
                  max="60"
                  className="duration-input"
                  placeholder="Min"
                />
                <button 
                  onClick={startTimer} 
                  className="start-timer-btn"
                >
                  Start
                </button>
              </div>
            ) : (
              <div className="timer-content">
                <div className="timer-display">
                  {formatTime(time)}
                </div>
                <div className="timer-controls">
                  {isRunning ? (
                    <Pause 
                      size={24} 
                      onClick={startPauseTimer} 
                      className="control-icon"
                    />
                  ) : (
                    <Play 
                      size={24} 
                      onClick={startPauseTimer} 
                      className="control-icon"
                    />
                  )}
                  <button 
                    onClick={resetTimer} 
                    className="reset-button"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyTimer;