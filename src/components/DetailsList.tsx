import { type Quiz } from '../types';
import DetailCard from './DetailCard';
import { type Category } from './CategoryList';

interface DetailsListProps {
  quizzes: Quiz[];
  category: Category;
  categoryName: string;
}

export default function DetailsList({
  quizzes,
  category,
  categoryName
}: DetailsListProps) {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 min-h-screen">
      <div className="mb-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
            {categoryName} Details
          </h2>
          <p className="text-xl text-gray-300 font-light">
            Explore detailed information about {categoryName.toLowerCase()}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
        {quizzes.map((quiz, index) => (
          <div
            key={`${category}-${quiz.name}-${index}`}
            className="will-change-transform"
          >
            <DetailCard quiz={quiz} quizIndex={index} category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

