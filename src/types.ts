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
  role?: string; // For characters
  type?: string; // For pets and weapons
  weapon_type?: string; // For weapons only
  ability?: {
    name: string;
    type: string;
    details: {
      [key: string]: any;
      effects?: string[];
      special_effects?: string[];
    };
  };
  skill?: {
    name: string;
    type: string;
    details: {
      [key: string]: any;
      effects?: string[];
      special_effects?: string[];
    };
  };
  // Weapon-specific fields
  damage?: number;
  healing_per_second?: number;
  fire_rate?: number;
  range?: string;
  magazine_size?: number | string;
  reload_time?: number;
  special_features?: string[];
  best_for?: string[]; // For weapons (similar to strengths)
  tips?: string[]; // For weapons
  // Common fields
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