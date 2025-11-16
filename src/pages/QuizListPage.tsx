import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuizList from '../components/QuizList';
import {
  charactersQuizzesList,
  petsQuizzesList,
  weaponsQuizzesList,
} from '../data/quizzes';
import { type Category } from '../components/CategoryList';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { resetCompletedQuiz } from '../utils/firestore';

export default function QuizListPage() {
  const { category } = useParams<{ category: Category }>();
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }

    const fetchCompletedQuizzes = async () => {
      if (storedUserId) {
        const userDocRef = doc(db, 'users', storedUserId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData && userData.completed_quiz) {
            setCompletedQuizzes(userData.completed_quiz);
          }
        }
      }
    };

    fetchCompletedQuizzes();
  }, []);

  const handleResetQuiz = async (quizName: string) => {
    if (userId) {
      const success = await resetCompletedQuiz(userId, quizName);
      if (success) {
        setCompletedQuizzes(prev => prev.filter(q => q !== quizName));
      }
    }
  };

  const getCategoryQuizzes = (cat: Category) => {
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

  const getCategoryName = (cat: Category): string => {
    switch (cat) {
      case 'characters':
        return 'Characters';
      case 'pets':
        return 'Pets';
      case 'weapons':
        return 'Weapons';
      default:
        return '';
    }
  };

  if (!category || !['characters', 'pets', 'weapons'].includes(category)) {
    return <Navigate to="/" replace />;
  }

  const quizzes = getCategoryQuizzes(category);

  return (
    <QuizList
      quizzes={quizzes}
      category={category}
      categoryName={getCategoryName(category)}
      completedQuizzes={completedQuizzes}
      isLoggedIn={isLoggedIn}
      onStartQuiz={() => {}}
      onResetQuiz={handleResetQuiz}
      userId={userId}
    />
  );
}