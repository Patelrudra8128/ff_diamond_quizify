import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getUserCoins } from '../utils/firestore';

interface User {
  ff_player_data: {
    basicInfo: {
      nickname: string;
      level: number;
      exp: number;
      liked: number;
      region: string;
    };
    clanBasicInfo: {
      clanName: string;
      clanLevel: number;
    };
    socialInfo: {
      signature: string;
    };
  };
  coins: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const path = window.location.pathname;
      const userId = path.split('/')[2];

      if (userId) {
        const userDoc = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as User;
          // Ensure coins field exists, if not fetch it separately
          if (userData.coins === undefined) {
            const coins = await getUserCoins(userId);
            userData.coins = coins || 0;
          }
          setUser(userData);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4 min-h-screen">
      <div className="mb-8">
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white/10 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Player Profile</h1>
          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Player Info</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Nickname</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.basicInfo.nickname}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Level</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.basicInfo.level}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Experience</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.basicInfo.exp}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Likes</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.basicInfo.liked}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Region</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.basicInfo.region}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Coins</label>
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <p className="mt-1 text-2xl font-bold text-yellow-300">{user.coins || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Clan Info</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Clan Name</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.clanBasicInfo.clanName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Clan Level</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.clanBasicInfo.clanLevel}</p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Social Info</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Signature</label>
                    <p className="mt-1 text-lg">{user.ff_player_data.socialInfo.signature}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">User not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;