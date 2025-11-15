import { useParams, Navigate } from 'react-router-dom';
import QuizList from '../components/QuizList';
import {
  charactersQuizzesList,
  petsQuizzesList,
  weaponsQuizzesList,
} from '../data/quizzes';
import { type Category } from '../components/CategoryList';

export default function QuizListPage() {
  const { category } = useParams<{ category: Category }>();

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
      onStartQuiz={() => {}}
      onBackToCategories={() => {}}
    />
  );
}

