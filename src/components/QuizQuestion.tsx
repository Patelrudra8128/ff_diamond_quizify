import { type QuizQuestion as QuizQuestionType } from '../types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult,
}: QuizQuestionProps) {
  const options = [
    { key: 'A', text: question.A },
    { key: 'B', text: question.B },
    { key: 'C', text: question.C },
    { key: 'D', text: question.D },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
        {question.question}
      </h3>
      <div className="space-y-4">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option.key;
          const isCorrect = option.key === question.answer;
          const isWrong = isSelected && !isCorrect;

          let buttonClass = 'group w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ';
          
          if (showResult) {
            if (isCorrect) {
              buttonClass += 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400 text-green-100 shadow-lg shadow-green-500/20';
            } else if (isWrong) {
              buttonClass += 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400 text-red-100 shadow-lg shadow-red-500/20';
            } else {
              buttonClass += 'bg-white/5 border-white/10 text-gray-400';
            }
          } else {
            if (isSelected) {
              buttonClass += 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 text-white shadow-lg shadow-purple-500/20';
            } else {
              buttonClass += 'bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/40 text-white backdrop-blur-sm';
            }
          }

          return (
            <button
              key={option.key}
              onClick={() => !showResult && onAnswerSelect(option.key)}
              disabled={showResult}
              className={buttonClass}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                    showResult && isCorrect
                      ? 'bg-green-500 text-white'
                      : showResult && isWrong
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-white/70'
                  } transition-all duration-300`}>
                    {option.key}
                  </div>
                  <span className="text-lg font-medium">{option.text}</span>
                </div>
                {showResult && isCorrect && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {showResult && isWrong && (
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {!showResult && isSelected && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
