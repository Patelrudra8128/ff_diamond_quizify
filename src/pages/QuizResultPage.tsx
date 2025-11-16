import { useParams, Navigate, useLocation } from 'react-router-dom';
import QuizResultComponent from '../components/QuizResult';
import { type QuizResult } from '../types';
import { type Category } from '../components/CategoryList';

export default function QuizResultPage() {
  const { category, quizIndex } = useParams<{ category: Category; quizIndex: string }>();
  const location = useLocation();

  const result = location.state?.result as QuizResult | undefined;

  if (!category || !quizIndex || !result) {
    return <Navigate to={category ? `/quiz/${category}` : '/'} replace />;
  }

  return (
    <QuizResultComponent
      result={result}
    />
  );
}

