import { type Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    imagePath: 'placeholder',
    name: 'Nero',
    description: 'Tactical fighter with explosive instincts',
    questions: [
      {
        question: "What is Nero's main skill type in Free Fire?",
        answer: 'B',
        A: 'Healing Boost',
        B: 'Explosive Tactics',
        C: 'Time Control',
        D: 'Stealth Cloak',
      },
      {
        question: "Which ability boosts Nero's damage output?",
        answer: 'A',
        A: 'Blast Core',
        B: 'Rapid Heal',
        C: 'Focus Aim',
        D: 'Silent Shot',
      },
      {
        question: 'Nero excels most in which play style?',
        answer: 'C',
        A: 'Sniping',
        B: 'Support',
        C: 'Rushing',
        D: 'Camouflage',
      },
      {
        question: "What does Nero's passive skill enhance?",
        answer: 'D',
        A: 'Jump height',
        B: 'Speed',
        C: 'Accuracy',
        D: 'Grenade damage',
      },
      {
        question: "Nero's background story connects to?",
        answer: 'A',
        A: 'Military squad',
        B: 'DJ crew',
        C: 'Street racer',
        D: 'Detective agency',
      },
    ],
  },
];
