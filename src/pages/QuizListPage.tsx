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

export default function QuizListPage() {
  const { category } = useParams<{ category: Category }>();
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);

    const fetchCompletedQuizzes = async () => {
      if (userId) {
        const userDocRef = doc(db, 'users', userId);
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
    />
  );
}