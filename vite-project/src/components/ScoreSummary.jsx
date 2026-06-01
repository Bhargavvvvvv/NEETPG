import React from 'react';
import './ScoreSummary.css';

const ScoreSummary = ({ questions, answers, onRestart }) => {
  const totalQuestions = questions.length;
  let correctAnswers = 0;

  questions.forEach(question => {
    if (answers[question.id] === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const missedAnswers = totalQuestions - correctAnswers;
  const scoreLabel = scorePercentage >= 80
    ? 'Strong finish'
    : scorePercentage >= 60
      ? 'Good foundation'
      : 'Keep building';

  return (
    <div className="score-summary">
      <div className="score-hero">
        <div className="score-ring" style={{ '--score': `${scorePercentage}%` }}>
          <span>{scorePercentage}%</span>
        </div>
        <div>
          <p className="score-eyebrow">Quiz completed</p>
          <h2>{scoreLabel}</h2>
          <p className="score-copy">
            You answered {correctAnswers} of {totalQuestions} questions correctly.
          </p>
        </div>
      </div>

      <div className="score-stats">
        <div className="score-stat">
          <span className="stat-label">Correct</span>
          <strong className="stat-value">{correctAnswers}</strong>
        </div>
        <div className="score-stat">
          <span className="stat-label">Review</span>
          <strong className="stat-value">{missedAnswers}</strong>
        </div>
        <div className="score-stat">
          <span className="stat-label">Total</span>
          <strong className="stat-value">{totalQuestions}</strong>
        </div>
      </div>

      <div className="review-section">
        <h3>Answer review</h3>
        <div className="review-list">
        {questions.map(question => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;
          return (
            <article key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="review-item-header">
                <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? 'Correct' : 'Needs review'}
                </span>
                <span className="review-id">Q{question.id}</span>
              </div>
              <p className="review-question">{question.question}</p>
              <div className="review-answers">
                <span className="user-answer">
                  Your answer: {isCorrect ?
                    question.options[userAnswer] :
                    userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                </span>
                {!isCorrect && (
                  <>
                    <span className="correct-answer">
                      Correct answer: {question.options[question.correctAnswer]}
                    </span>
                  </>
                )}
              </div>
              {!isCorrect && (
                <div className="review-explanation">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}
            </article>
          );
        })}
        </div>
      </div>

      <button className="restart-button" onClick={onRestart}>
        Retake Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;
