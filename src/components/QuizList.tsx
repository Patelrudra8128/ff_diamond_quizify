import { type Quiz } from '../types';
import QuizCard from './QuizCard';

interface QuizListProps {
  quizzes: Quiz[];
  onStartQuiz: (quizIndex: number) => void;
}

export default function QuizList({ quizzes, onStartQuiz }: QuizListProps) {
  return (
    <div className="max-w-6xl mx-auto animate-fadeIn w-full overflow-x-hidden px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 animate-slideDown">
          Quiz Master
        </h1>
        <p className="text-2xl text-gray-300 font-light">
          Test your knowledge and challenge yourself
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-hidden">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="animate-fadeInUp overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <QuizCard quiz={quiz} quizIndex={index} onStart={onStartQuiz} />
          </div>
        ))}
      </div>
    </div>
  );
}
