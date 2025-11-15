import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import QuizView from '../components/QuizView';
import { type Quiz, type QuizResult } from '../types';
import {
  charactersQuizzesList,
  petsQuizzesList,
  weaponsQuizzesList,
} from '../data/quizzes';
import { type Category } from '../components/CategoryList';
import { calculateCoinsEarned, updateUserCoins } from '../utils/firestore';

export default function QuizViewPage() {
  const { category, quizIndex } = useParams<{ category: Category; quizIndex: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const getCategoryQuizzes = (cat: Category): Quiz[] => {
    switch (cat) {
      case 'characters':
        return charactersQuizzesList;
      case 'pets':
        return petsQuizzesList;
      case 'weapons':
        return weaponsQuizzesList;
      default:
        return [];
    }
  };

  if (!category || !quizIndex || !['characters', 'pets', 'weapons'].includes(category)) {
    return <Navigate to="/" replace />;
  }

  const quizzes = getCategoryQuizzes(category);
  const index = parseInt(quizIndex, 10);
  const quiz = quizzes[index];

  if (!quiz) {
    return <Navigate to={`/quiz/${category}`} replace />;
  }

  const handleQuizComplete = async (result: QuizResult) => {
    // Calculate coins earned based on score
    const coinsEarned = calculateCoinsEarned(result.score, result.totalQuestions);
    
    // Get userId from localStorage
    const userId = localStorage.getItem('userId');
    
    // Update coins in Firestore if userId is available
    if (userId) {
      try {
        const success = await updateUserCoins(userId, coinsEarned);
        if (success) {
          console.log(`Coins updated successfully: +${coinsEarned}`);
        } else {
          console.error('Failed to update coins in Firestore');
        }
      } catch (error) {
        console.error('Error updating coins:', error);
      }
    }
    
    // Store result in location state
    navigate(`/quiz/${category}/${quizIndex}/result`, {
      state: {
        result: {
          ...result,
          coinsEarned
        }
      }
    });
  };

  const handleBack = () => {
    navigate(`/quiz/${category}`);
  };

  return (
    <QuizView
      quiz={quiz}
      onComplete={handleQuizComplete}
      onBack={handleBack}
    />
  );
}

