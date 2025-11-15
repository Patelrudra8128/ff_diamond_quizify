import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserCoins } from '../utils/firestore';

// Component to display user coins in header
function UserCoinsDisplay({ userId }: { userId: string }) {
  const [coins, setCoins] = useState<number | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      const userCoins = await getUserCoins(userId);
      setCoins(userCoins);
    };
    fetchCoins();
    
    // Refresh coins every 5 seconds
    const interval = setInterval(fetchCoins, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  if (coins === null) {
    return <span className="text-yellow-300 font-semibold">Loading...</span>;
  }

  return <span className="text-yellow-300 font-semibold">{coins}</span>;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get userId from URL or localStorage
    const path = window.location.pathname;
    const pathUserId = path.split('/')[2];
    
    if (pathUserId && path.includes('/profile/')) {
      setUserId(pathUserId);
      localStorage.setItem('userId', pathUserId);
    } else {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [location]);

  const isHomePage = location.pathname === '/';
  const pathParts = location.pathname.split('/');
  const isDetailView = location.pathname.includes('/details/') && pathParts.length > 3;

  const handleBack = () => {
    if (location.pathname.includes('/details/')) {
      const pathParts = location.pathname.split('/');
      if (pathParts.length > 3) {
        // In detail view, go back to details list
        navigate(`/details/${pathParts[2]}`);
      } else {
        navigate('/');
      }
    } else if (location.pathname.includes('/quiz/') && location.pathname.includes('/result')) {
      // From result page, go back to quiz list
      const pathParts = location.pathname.split('/');
      navigate(`/quiz/${pathParts[2]}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <header className="flex p-4 z-20 justify-between max-w-6xl mx-auto w-full overflow-x-hidden items-center">
        <div>
          {!isHomePage && (
            <button
              onClick={handleBack}
              className="group flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {isDetailView ? 'Back to List' : 'Back to Home'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {userId && (
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <UserCoinsDisplay userId={userId} />
            </div>
          )}
          <Link
            to="/profile"
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </header>

      <div className="relative z-10 pb-8 px-4 max-w-full overflow-x-hidden min-h-screen">
        {children}
      </div>
    </div>
  );
}

