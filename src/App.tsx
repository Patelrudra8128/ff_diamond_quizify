import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuizListPage from './pages/QuizListPage';
import QuizViewPage from './pages/QuizViewPage';
import QuizResultPage from './pages/QuizResultPage';
import DetailsListPage from './pages/DetailsListPage';
import DetailViewPage from './pages/DetailViewPage';
import Profile from './components/Profile';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
    </BrowserRouter>
  );
}

export default App;