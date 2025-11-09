import { type Quiz } from '../types';
import QuizCard from './QuizCard';
import { type Category } from './CategoryList';

interface QuizListProps {
  quizzes: Quiz[];
  category: Category;
  categoryName: string;
  onStartQuiz: (quizIndex: number) => void;
  onBackToCategories: () => void;
}

export default function QuizList({
  quizzes,
  category,
  categoryName,
  onStartQuiz,
  onBackToCategories,
}: QuizListProps) {
  return (
    <div className="max-w-6xl mx-auto animate-fadeIn w-full overflow-x-hidden px-4">
      <div className="mb-8">
        <button
          onClick={onBackToCategories}
          className="group flex items-center gap-2 text-white/80 hover:text-white font-semibold mb-6 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Categories
        </button>
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4 animate-slideDown">
            {categoryName} Quizzes
          </h2>
          <p className="text-xl text-gray-300 font-light">
            Select a quiz to begin
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-hidden">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <QuizCard quiz={quiz} quizIndex={index} onStart={onStartQuiz} />
          </div>
        ))}
      </div>
    </div>
  );
}
