import CategoryList from '../components/CategoryList';
import {
  charactersQuizzesList,
  petsQuizzesList,
  weaponsQuizzesList,
} from '../data/quizzes';

export default function Home() {
  const categoryCounts = {
    characters: charactersQuizzesList.length,
    pets: petsQuizzesList.length,
    weapons: weaponsQuizzesList.length,
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="max-w-6xl mx-auto animate-fadeIn w-full overflow-x-hidden px-4">
        <div className="text-center mb-4">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 animate-slideDown">
            FF Diamond Quizify
          </h1>
          <p className="text-2xl text-gray-300 font-light">
            Choose a category to test your knowledge
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
        <CategoryList
          onSelectCategory={() => {
            // This will be handled by Link in CategoryCard
          }}
          categoryCounts={categoryCounts}
          mode="quiz"
        />
      </div>

      {/* Details Section */}
      <div className="max-w-6xl mx-auto animate-fadeIn w-full overflow-x-hidden px-4">
        <div className="text-center mb-4">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 animate-slideDown">
            Details
          </h1>
          <p className="text-2xl text-gray-300 font-light">
            Choose a category to gain knowledge
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
        <CategoryList
          onSelectCategory={() => {
            // This will be handled by Link in CategoryCard
          }}
          categoryCounts={categoryCounts}
          mode="details"
        />
      </div>
    </div>
  );
}