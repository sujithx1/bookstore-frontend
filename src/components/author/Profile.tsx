import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Sidebar from './SideBar';

const AuthorProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
     <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Your Profile</h2>

        <div className="flex flex-col items-center text-center">
          <img
            src={user?.profile || "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=sujith"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <h3 className="text-lg font-medium text-gray-900 mt-4">{user?.name || 'Unknown User'}</h3>
          <p className="text-sm text-gray-600">{user?.email || 'No email provided'}</p>

          {user?.Address && user.Address.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              {user.Address[user.Address.length - 1].city},{" "}
              {user.Address[user.Address.length - 1].state}
            </p>
          )}
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/profile/edit')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default AuthorProfile;
