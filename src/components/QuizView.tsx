import { useState } from 'react';
import { type Quiz, type QuizResult } from '../types';
import QuizQuestion from './QuizQuestion';

interface QuizViewProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onBack?: () => void;
}

export default function QuizView({ quiz, onComplete, onBack }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex] || null;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    const answers = quiz.questions.map((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const isCorrect = selectedAnswer === question.answer;
      return {
        questionIndex: index,
        selectedAnswer: selectedAnswer || '',
        isCorrect,
      };
    });

    const score = answers.filter((a) => a.isCorrect).length;

    const result: QuizResult = {
      quizName: quiz.name,
      score,
      totalQuestions: quiz.questions.length,
      answers,
    };

    onComplete(result);
  };

  const canProceed = selectedAnswer !== null;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn w-full overflow-x-hidden px-4">
      <div className="mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-white/80 hover:text-white font-semibold mb-6 transition-colors duration-200"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quizzes
          </button>
        )}
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              {quiz.name}
            </h2>
            <p className="text-gray-300 text-sm">Test your knowledge</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-xl border border-white/20">
            <span className="text-white font-bold text-lg">
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-lg border border-white/20">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20 animate-slideUp">
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          showResult={false}
        />

        <div className="flex justify-between mt-10 gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              currentQuestionIndex === 0
                ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transform hover:scale-105 active:scale-95'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              canProceed
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
            }`}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
