import { useState, useEffect } from 'react';
import './Question.css';

const Question = ({ question, questionNumber, totalQuestions, onAnswer, showFeedback, nextQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question.id]);

  const handleOptionClick = (optionIndex) => {
    if (!isAnswered) {
      setSelectedOption(optionIndex);
      setIsAnswered(true);
      onAnswer(question.id, optionIndex);
    }
  };

  const isCorrect = selectedOption !== null && selectedOption === question.correctAnswer;
  const correctOption = question.options[question.correctAnswer];
  const nextButtonLabel = questionNumber === totalQuestions ? 'View score' : 'Next question';
  const progressPercentage = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="question-topline">
          <span className={`question-difficulty ${question.difficulty}`}>
            {question.difficulty}
          </span>
          <span className="question-count">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Question progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progressPercentage}
        >
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      <div className="question-text">
        <h2>{question.question}</h2>
      </div>

      <div className="options-container">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = question.correctAnswer === index;
          const showResult = isAnswered && (isSelected || isCorrectOption);

          let optionClass = "option-button";
          if (showResult) {
            if (isCorrectOption && isSelected) {
              optionClass += " correct";
            } else if (isCorrectOption && !isSelected) {
              optionClass += " correct";
            } else if (isSelected && !isCorrectOption) {
              optionClass += " incorrect";
            }
          }

          return (
            <button
              type="button"
              key={index}
              className={optionClass}
              onClick={() => handleOptionClick(index)}
              disabled={isAnswered}
              aria-pressed={isSelected}
            >
              <div className="option-label">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="option-text">
                {option}
              </div>
              {showResult && (
                <div className="option-indicator">
                  {isCorrectOption ? (
                    <span className="indicator-text">Correct</span>
                  ) : (
                    isSelected ? (
                      <span className="indicator-text">Your pick</span>
                    ) : null
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`feedback-section ${isCorrect ? 'correct' : 'incorrect'}`} aria-live="polite">
          {isCorrect ? (
            <p className="feedback-title">Correct. Nice work.</p>
          ) : (
            <p className="feedback-title">
              Not quite. The correct answer is <strong>{correctOption}</strong>.
            </p>
          )}
          <div className="feedback-explanation">
            <strong>Explanation:</strong> {question.explanation}
          </div>
        </div>
      )}

      {isAnswered && (
        <div className="nav-controls">
          <button
            className="next-button"
            onClick={nextQuestion}
          >
            {nextButtonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
