import { Link } from 'react-router-dom';
import { useState } from 'react';
import { type Quiz } from '../types';
import Modal from './Modal';

interface QuizCardProps {
  quiz: Quiz;
  quizIndex: number;
  onStart?: (quizIndex: number) => void;
  category: string;
  isCompleted: boolean;
  isLoggedIn: boolean;
}

export default function QuizCard({ quiz, quizIndex, onStart, category, isCompleted, isLoggedIn }: QuizCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const linkTo = `/quiz/${category}/${quizIndex}`;

  const handleStartClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };
  
  return (
    <>
      <div
        className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 transition-all duration-300 border border-white/20 ${
          isCompleted ? 'opacity-60' : 'hover:bg-white/20 hover:border-white/40 transform hover:-translate-y-2 hover:scale-[1.02] will-change-transform'
        } block`}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <div className="relative z-10">
          {quiz.imagePath && quiz.imagePath !== 'placeholder' ? (
            <img 
              src={`../src/assets/${category}/${quiz.imagePath}`}
              alt={quiz.name}
              className="w-full bg-cover rounded-xl mb-4 shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 shadow-lg flex items-center justify-center">
              <span className="text-6xl font-bold text-white opacity-80">{quiz.name.charAt(0)}</span>
            </div>
          )}
          
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
            {quiz.name}
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">{quiz.description}</p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <span className="text-sm text-gray-300 font-medium">
                {quiz.questions.length} Questions
              </span>
            </div>
            <Link
              to={isCompleted ? '#' : linkTo}
              onClick={handleStartClick}
              className={`relative text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg overflow-hidden group-button w-full sm:w-auto text-center ${
                isCompleted
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-xl transform hover:scale-105 active:scale-95'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isCompleted ? 'Completed' : 'Start Quiz'}
                {!isCompleted && (
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </span>
              {!isCompleted && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
        <p className="text-gray-300">Please log in to start the quiz.</p>
      </Modal>
    </>
  );
}
