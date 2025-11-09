interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  count: number;
  gradientFrom: string;
  gradientTo: string;
  onClick: () => void;
}

export default function CategoryCard({
  name,
  description,
  icon,
  count,
  gradientFrom,
  gradientTo,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="sgroup relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
          {name}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
        <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full w-fit mx-auto">
          <span className="text-sm text-gray-300 font-medium">
            {count} {count === 1 ? 'Quiz' : 'Quizzes'}
          </span>
        </div>
      </div>
    </div>
  );
}

