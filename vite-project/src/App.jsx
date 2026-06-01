import React, { useState } from 'react';
import './App.css';
import Question from './components/Question';
import ScoreSummary from './components/ScoreSummary';
import questionsData from './data/questions.json';

const shuffleQuestions = (questions) => {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const buildQuestionSet = (data) => {
  const easyQuestions = data.questions.filter(q => q.difficulty === 'easy').slice(0, 20);
  const mediumQuestions = data.questions.filter(q => q.difficulty === 'medium').slice(0, 20);
  const hardQuestions = data.questions.filter(q => q.difficulty === 'hard').slice(0, 10);

  return shuffleQuestions([...easyQuestions, ...mediumQuestions, ...hardQuestions]);
};

function App() {
  const [questions, setQuestions] = useState(() => buildQuestionSet(questionsData));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowFeedback(false);
    setShowScore(false);
    setQuestions(buildQuestionSet(questionsData));
  };

  if (questions.length === 0) {
    return (
      <div className="app loading-screen">
        <div className="loading-card">
          <span className="loading-pulse" aria-hidden="true" />
          <h2>Loading questions</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand-row">
          <span className="brand-mark">PG</span>
          <span className="session-label">Clinical practice session</span>
        </div>
        <h1>NEET PG Preparation</h1>
        <p>50 focused questions across easy, medium, and hard levels.</p>
      </header>

      <main className="quiz-shell">
        {showScore ? (
          <ScoreSummary
            questions={questions}
            answers={answers}
            onRestart={restartQuiz}
          />
        ) : (
          <Question
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            showFeedback={showFeedback}
            nextQuestion={handleNextQuestion}
          />
        )}
      </main>
    </div>
  );
}

export default App;
