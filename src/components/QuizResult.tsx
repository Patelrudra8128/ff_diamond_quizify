import { type QuizResult as QuizResultType } from '../types';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
  onBackToQuizzes: () => void;
}

export default function QuizResult({ result, onRestart, onBackToQuizzes }: QuizResultProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  let resultColor = 'from-red-400 to-rose-500';
  let resultBgColor = 'bg-red-500/20 border-red-400/30';
  let resultMessage = 'Keep practicing!';
  let resultIcon = '😊';
  
  if (percentage >= 80) {
    resultColor = 'from-green-400 to-emerald-500';
    resultBgColor = 'bg-green-500/20 border-green-400/30';
    resultMessage = 'Excellent work!';
    resultIcon = '🎉';
  } else if (percentage >= 60) {
    resultColor = 'from-yellow-400 to-amber-500';
    resultBgColor = 'bg-yellow-500/20 border-yellow-400/30';
    resultMessage = 'Good job!';
    resultIcon = '👍';
  }

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn w-full overflow-x-hidden px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-white/20 animate-scaleIn">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">{resultIcon}</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
            Quiz Complete!
          </h2>
          <p className="text-xl text-gray-300 mb-8">{result.quizName}</p>
        </div>
        
        <div className={`${resultBgColor} rounded-2xl p-8 mb-8 border backdrop-blur-sm`}>
          <div className="text-center">
            <div className={`text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${resultColor} mb-4 animate-pulse`}>
              {percentage}%
            </div>
            <p className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${resultColor} mb-4`}>
              {resultMessage}
            </p>
            <p className="text-gray-300 text-lg">
              You scored <span className="font-bold text-white">{result.score}</span> out of{' '}
              <span className="font-bold text-white">{result.totalQuestions}</span> questions
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="group flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
          <button
            onClick={onBackToQuizzes}
            className="group flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quizzes
          </button>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Answer Review
        </h3>
        <div className="space-y-3">
          {result.answers.map((answer, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] ${
                answer.isCorrect
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30'
                  : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                  answer.isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {answer.isCorrect ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-white font-semibold">
                    Question {index + 1}:
                  </span>
                  <span className={`ml-2 font-medium ${
                    answer.isCorrect ? 'text-green-200' : 'text-red-200'
                  }`}>
                    {answer.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                  {!answer.isCorrect && (
                    <span className="ml-2 text-gray-400 text-sm">
                      (Selected: {answer.selectedAnswer || 'None'})
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
