export interface QuizQuestion {
  question: string;
  answer: string; // 'A', 'B', 'C', or 'D'
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Quiz {
  imagePath: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizName: string;
  score: number;
  totalQuestions: number;
  answers: { questionIndex: number; selectedAnswer: string; isCorrect: boolean }[];
}
