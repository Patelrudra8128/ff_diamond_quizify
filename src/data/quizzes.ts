import { type Quiz } from '../types';
import charactersData from './characters_quiz.json';
import petsData from './pets_quiz.json';
import weaponsData from './weapons_quiz.json';

// Type assert the imported JSON data
const charactersQuizzes = charactersData as Quiz[];
const petsQuizzes = petsData as Quiz[];
const weaponsQuizzes = weaponsData as Quiz[];

// Combine all quizzes: Characters (each character is a separate quiz), Pets, and Weapons
export const quizzes: Quiz[] = [
  ...charactersQuizzes,
  ...petsQuizzes,
  ...weaponsQuizzes,
];

// Export quizzes by category for potential future use
export const charactersQuizzesList: Quiz[] = charactersQuizzes;
export const petsQuizzesList: Quiz[] = petsQuizzes;
export const weaponsQuizzesList: Quiz[] = weaponsQuizzes;
