import { Link } from 'react-router-dom';
import { type Quiz } from '../types';

interface DetailCardProps {
  quiz: Quiz;
  quizIndex: number;
  onReadMore?: (quizIndex: number) => void;
  category: string;
}

export default function DetailCard({ quiz, quizIndex, onReadMore, category }: DetailCardProps) {
  const linkTo = `/details/${category}/${quizIndex}`;
  
  return (
    <Link
      to={linkTo}
      className="group relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:-translate-y-2 hover:scale-[1.02] will-change-transform block"
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
            <div
                className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 shadow-lg flex items-center justify-center">
              <span className="text-6xl font-bold text-white opacity-80">{quiz.name.charAt(0)}</span>
            </div>
        )}

        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
          {quiz.name}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">{quiz.description}</p>

        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 overflow-hidden group-button">
            <span className="relative z-10 flex items-center gap-2 justify-center">
              Read More
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </Link>
  );
}

