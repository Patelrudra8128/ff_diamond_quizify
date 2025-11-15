import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import QuizResultComponent from '../components/QuizResult';
import { type QuizResult } from '../types';
import { type Category } from '../components/CategoryList';

export default function QuizResultPage() {
  const { category, quizIndex } = useParams<{ category: Category; quizIndex: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result as QuizResult | undefined;

  if (!category || !quizIndex || !result) {
    return <Navigate to={category ? `/quiz/${category}` : '/'} replace />;
  }

  const handleRestart = () => {
    navigate(`/quiz/${category}/${quizIndex}`);
  };

  const handleBackToQuizzes = () => {
    navigate(`/quiz/${category}`);
  };

  return (
    <QuizResultComponent
      result={result}
      onRestart={handleRestart}
      onBackToQuizzes={handleBackToQuizzes}
    />
  );
}

