import CategoryCard from './CategoryCard';

export type Category = 'characters' | 'pets' | 'weapons';

interface CategoryListProps {
  onSelectCategory: (category: Category) => void;
  categoryCounts: {
    characters: number;
    pets: number;
    weapons: number;
  };
}

export default function CategoryList({
  onSelectCategory,
  categoryCounts,
}: CategoryListProps) {
  const categories = [
    {
      id: 'characters' as Category,
      name: 'Characters',
      description: 'Test your knowledge about Free Fire characters',
      icon: '🎮',
      count: categoryCounts.characters,
      gradientFrom: 'from-purple-500/20',
      gradientTo: 'to-pink-500/20',
    },
    {
      id: 'pets' as Category,
      name: 'Pets',
      description: 'Challenge yourself with pet-related questions',
      icon: '🐾',
      count: categoryCounts.pets,
      gradientFrom: 'from-blue-500/20',
      gradientTo: 'to-cyan-500/20',
    },
    {
      id: 'weapons' as Category,
      name: 'Weapons',
      description: 'Master your weapon knowledge in Free Fire',
      icon: '⚔️',
      count: categoryCounts.weapons,
      gradientFrom: 'from-orange-500/20',
      gradientTo: 'to-red-500/20',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn w-full overflow-x-hidden px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 animate-slideDown">
          Quiz Master
        </h1>
        <p className="text-2xl text-gray-300 font-light">
          Choose a category to test your knowledge
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 overflow-x-hidden">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CategoryCard
              name={category.name}
              description={category.description}
              icon={category.icon}
              count={category.count}
              gradientFrom={category.gradientFrom}
              gradientTo={category.gradientTo}
              onClick={() => onSelectCategory(category.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

