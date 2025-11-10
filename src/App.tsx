import { useState } from 'react';
import { type Quiz, type QuizResult } from './types';
import {
  charactersQuizzesList,
  petsQuizzesList,
  weaponsQuizzesList,
} from './data/quizzes';
import CategoryList, { type Category } from './components/CategoryList';
import QuizList from './components/QuizList';
import QuizView from './components/QuizView';
import QuizResultComponent from './components/QuizResult';
import Profile from './components/Profile';

type View = 'categories' | 'quiz-list' | 'quiz' | 'result' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<View>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const getCategoryQuizzes = (category: Category): Quiz[] => {
    switch (category) {
      case 'characters':
        return charactersQuizzesList;
      case 'pets':
        return petsQuizzesList;
      case 'weapons':
        return weaponsQuizzesList;
      default:
        return [];
    }
  };

  const getCategoryName = (category: Category): string => {
    switch (category) {
      case 'characters':
        return 'Characters';
      case 'pets':
        return 'Pets';
      case 'weapons':
        return 'Weapons';
      default:
        return '';
    }
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('quiz-list');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setCurrentQuiz(null);
    setQuizResult(null);
  };

  const handleStartQuiz = (quizIndex: number) => {
    if (!selectedCategory) return;
    const categoryQuizzes = getCategoryQuizzes(selectedCategory);
    const quiz = categoryQuizzes[quizIndex];
    if (quiz) {
      setCurrentQuiz(quiz);
      setCurrentView('quiz');
      setQuizResult(null);
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentView('result');
  };

  const handleBackToQuizzes = () => {
    setCurrentView('quiz-list');
    setCurrentQuiz(null);
    setQuizResult(null);
  };

  const handleRestartQuiz = () => {
    if (currentQuiz) {
      setCurrentView('quiz');
      setQuizResult(null);
    }
  };

  const handleShowProfile = () => {
    setCurrentView('profile');
  };

  const categoryCounts = {
    characters: charactersQuizzesList.length,
    pets: petsQuizzesList.length,
    weapons: weaponsQuizzesList.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <header className="absolute top-0 left-0 right-0 flex justify-end p-4 z-20">
        <button
          onClick={handleShowProfile}
          className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </header>

      <div className="relative z-10 py-8 px-4 max-w-full overflow-x-hidden min-h-screen">
        {currentView === 'categories' && (
          <CategoryList
            onSelectCategory={handleSelectCategory}
            categoryCounts={categoryCounts}
          />
        )}
        {currentView === 'quiz-list' && selectedCategory && (
          <QuizList
            quizzes={getCategoryQuizzes(selectedCategory)}
            category={selectedCategory}
            categoryName={getCategoryName(selectedCategory)}
            onStartQuiz={handleStartQuiz}
            onBackToCategories={handleBackToCategories}
          />
        )}
        {currentView === 'quiz' && currentQuiz && (
          <QuizView
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            onBack={handleBackToQuizzes}
          />
        )}
        {currentView === 'result' && quizResult && (
          <QuizResultComponent
            result={quizResult}
            onRestart={handleRestartQuiz}
            onBackToQuizzes={handleBackToQuizzes}
          />
        )}
        {currentView === 'profile' && <Profile onBack={handleBackToCategories} />}
      </div>
    </div>
  );
}

export default App;
