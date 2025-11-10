import React from 'react';

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1 234 567 890',
  };

  return (
      <div className="max-w-6xl mx-auto w-full px-4 min-h-screen">
          <div className="mb-8">
              <button
                  onClick={onBack}
                  className="group flex items-center gap-2 text-white/80 hover:text-white font-semibold mb-6 transition-colors duration-200"
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
                  Back to Categories
              </button>
              <div className="max-w-md mx-auto mt-10 p-6 bg-white/10 rounded-lg shadow-lg text-white">
                  <h1 className="text-3xl font-bold mb-6">Profile</h1>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-400">Name</label>
                          <p className="mt-1 text-lg">{user.name}</p>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-400">Email</label>
                          <p className="mt-1 text-lg">{user.email}</p>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-400">Mobile</label>
                          <p className="mt-1 text-lg">{user.mobile}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Profile;