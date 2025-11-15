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

export interface CharacterDetail {
  name: string;
  title?: string;
  description: string;
  role?: string;
  ability?: {
    name: string;
    type: string;
    details: {
      [key: string]: any;
      effects?: string[];
      special_effects?: string[];
    };
  };
  strengths?: string[];
  weaknesses?: string[];
  best_combinations?: Array<{
    combo: string[];
    reason: string;
  }>;
  release?: {
    update: string;
    type: string;
  };
}