import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
          setUser(userSnapshot.data() as User);
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
                    <label className="block text-sm font-medium text-gray-400">Coins</label>
                    <p className="mt-1 text-lg">{user.coins}</p>
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