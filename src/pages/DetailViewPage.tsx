import { useParams, Navigate, useNavigate } from 'react-router-dom';
import DetailView from '../components/DetailView';
import { type Category } from '../components/CategoryList';
import {
  charactersQuizzesList,
  petsQuizzesList,
  weaponsQuizzesList,
} from '../data/quizzes';

export default function DetailViewPage() {
  const { category, quizIndex } = useParams<{ category: Category; quizIndex: string }>();
  const navigate = useNavigate();

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

  if (!category || !quizIndex || !['characters', 'pets', 'weapons'].includes(category)) {
    return <Navigate to="/" replace />;
  }

  const quizzes = getCategoryQuizzes(category);
  const index = parseInt(quizIndex, 10);
  const quiz = quizzes[index];

  if (!quiz) {
    return <Navigate to={`/details/${category}`} replace />;
  }

  const handleBack = () => {
    navigate(`/details/${category}`);
  };

  return (
    <DetailView
      quiz={quiz}
      category={category}
      onBack={handleBack}
    />
  );
}

