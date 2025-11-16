import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuizListPage from './pages/QuizListPage';
import QuizViewPage from './pages/QuizViewPage';
import QuizResultPage from './pages/QuizResultPage';
import DetailsListPage from './pages/DetailsListPage';
import DetailViewPage from './pages/DetailViewPage';
import Profile from './components/Profile';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }, [location.search]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:category" element={<QuizListPage />} />
        <Route path="/quiz/:category/:quizIndex" element={<QuizViewPage />} />
        <Route path="/quiz/:category/:quizIndex/result" element={<QuizResultPage />} />
        <Route path="/details/:category" element={<DetailsListPage />} />
        <Route path="/details/:category/:quizIndex" element={<DetailViewPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;