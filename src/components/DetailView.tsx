import { type Quiz } from '../types';
import { type Category } from './CategoryList';
import { getDetail } from '../data/details';

interface DetailViewProps {
  quiz: Quiz;
  category: Category;
  onBack: () => void;
}

export default function DetailView({ quiz, category, onBack }: DetailViewProps) {
  const detail = getDetail(quiz.name);
  return (
    <div className="max-w-4xl mx-auto w-full px-4 min-h-screen py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Image */}
        {quiz.imagePath && quiz.imagePath !== 'placeholder' ? (
          <img 
            src={`src/assets/${category}/${quiz.imagePath}`}
            alt={quiz.name}
            className="w-full bg-cover rounded-xl mb-6 shadow-lg"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-6 shadow-lg flex items-center justify-center">
            <span className="text-8xl font-bold text-white opacity-80">{quiz.name.charAt(0)}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
          {quiz.name}
        </h1>

        {/* Title (if available in detail) */}
        {detail?.title && (
          <p className="text-2xl text-purple-300 mb-4 font-semibold">
            {detail.title}
          </p>
        )}

        {/* Description */}
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          {detail?.description || quiz.description}
        </p>

        {/* Detail Information Section */}
        {detail ? (
          <div className="mt-8 space-y-6">
            {/* Role (for characters) */}
            {detail.role && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Role</h3>
                <p className="text-gray-300">{detail.role}</p>
              </div>
            )}

            {/* Type (for pets and weapons) */}
            {detail.type && !detail.role && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Type</h3>
                <p className="text-gray-300">
                  {detail.type}
                  {detail.weapon_type && (
                    <span className="ml-2 text-gray-400">({detail.weapon_type})</span>
                  )}
                </p>
              </div>
            )}

            {/* Weapon Stats */}
            {detail.weapon_type && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Weapon Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.damage !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Damage:</span>
                      <span className="text-white font-medium">{detail.damage}</span>
                    </div>
                  )}
                  {detail.healing_per_second !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Healing/Second:</span>
                      <span className="text-green-300 font-medium">{detail.healing_per_second} HP/s</span>
                    </div>
                  )}
                  {detail.fire_rate !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Fire Rate:</span>
                      <span className="text-white font-medium">{detail.fire_rate}</span>
                    </div>
                  )}
                  {detail.range && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Range:</span>
                      <span className="text-white font-medium">{detail.range}</span>
                    </div>
                  )}
                  {detail.magazine_size !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Magazine Size:</span>
                      <span className="text-white font-medium">{detail.magazine_size}</span>
                    </div>
                  )}
                  {detail.reload_time !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Reload Time:</span>
                      <span className="text-white font-medium">{detail.reload_time}s</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Special Features (for weapons) */}
            {detail.special_features && detail.special_features.length > 0 && (
              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">Special Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  {detail.special_features.map((feature, index) => (
                    <li key={index} className="text-gray-300">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ability (for characters) */}
            {detail.ability && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Ability: {detail.ability.name}</h3>
                <p className="text-gray-400 mb-4">Type: {detail.ability.type}</p>
                
                {detail.ability.details && (
                  <div className="space-y-3">
                    {Object.entries(detail.ability.details).map(([key, value]) => {
                      // Skip effects arrays, we'll display them separately
                      if ((key === 'effects' || key === 'special_effects') && Array.isArray(value)) return null;
                      
                      // Format key names for display
                      const displayKey = key
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                      
                      // Format boolean values
                      const displayValue = typeof value === 'boolean' 
                        ? (value ? 'Yes' : 'No')
                        : String(value);
                      
                      return (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-gray-400">{displayKey}:</span>
                          <span className="text-white font-medium">{displayValue}</span>
                        </div>
                      );
                    })}
                    
                    {detail.ability.details.effects && Array.isArray(detail.ability.details.effects) && (
                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-white mb-2">Effects:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {detail.ability.details.effects.map((effect, index) => (
                            <li key={index} className="text-gray-300">{effect}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {detail.ability.details.special_effects && Array.isArray(detail.ability.details.special_effects) && (
                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-white mb-2">Special Effects:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {detail.ability.details.special_effects.map((effect, index) => (
                            <li key={index} className="text-gray-300">{effect}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Skill (for pets) */}
            {detail.skill && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Skill: {detail.skill.name}</h3>
                <p className="text-gray-400 mb-4">Type: {detail.skill.type}</p>
                
                {detail.skill.details && (
                  <div className="space-y-3">
                    {Object.entries(detail.skill.details).map(([key, value]) => {
                      // Skip effects arrays, we'll display them separately
                      if ((key === 'effects' || key === 'special_effects') && Array.isArray(value)) return null;
                      
                      // Format key names for display
                      const displayKey = key
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                      
                      // Format boolean values
                      const displayValue = typeof value === 'boolean' 
                        ? (value ? 'Yes' : 'No')
                        : String(value);
                      
                      return (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-gray-400">{displayKey}:</span>
                          <span className="text-white font-medium">{displayValue}</span>
                        </div>
                      );
                    })}
                    
                    {detail.skill.details.effects && Array.isArray(detail.skill.details.effects) && (
                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-white mb-2">Effects:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {detail.skill.details.effects.map((effect, index) => (
                            <li key={index} className="text-gray-300">{effect}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {detail.skill.details.special_effects && Array.isArray(detail.skill.details.special_effects) && (
                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-white mb-2">Special Effects:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {detail.skill.details.special_effects.map((effect, index) => (
                            <li key={index} className="text-gray-300">{effect}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Strengths (for characters/pets) */}
            {detail.strengths && detail.strengths.length > 0 && (
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Strengths</h3>
                <ul className="list-disc list-inside space-y-2">
                  {detail.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-300">{strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best For (for weapons) */}
            {detail.best_for && detail.best_for.length > 0 && (
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Best For</h3>
                <ul className="list-disc list-inside space-y-2">
                  {detail.best_for.map((use, index) => (
                    <li key={index} className="text-gray-300">{use}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {detail.weaknesses && detail.weaknesses.length > 0 && (
              <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
                <h3 className="text-lg font-semibold text-red-300 mb-4">Weaknesses</h3>
                <ul className="list-disc list-inside space-y-2">
                  {detail.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-300">{weakness}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best Combinations */}
            {detail.best_combinations && detail.best_combinations.length > 0 && (
              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">Best Combinations</h3>
                <div className="space-y-4">
                  {detail.best_combinations.map((combo, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {combo.combo.map((character, charIndex) => (
                          <span
                            key={charIndex}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium"
                          >
                            {character}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm">{combo.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips (for weapons) */}
            {detail.tips && detail.tips.length > 0 && (
              <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
                <h3 className="text-lg font-semibold text-yellow-300 mb-4">Tips</h3>
                <ul className="list-disc list-inside space-y-2">
                  {detail.tips.map((tip, index) => (
                    <li key={index} className="text-gray-300">{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Release Info */}
            {detail.release && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Release Information</h3>
                <p className="text-gray-300">
                  <span className="font-medium">{detail.release.type}</span> - Update {detail.release.update}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
              <p className="text-gray-400">Detailed information not available for this item.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

