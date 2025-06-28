import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../api/authapi';
import { logout } from '../reducers/user/userslice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setProfilePic(user.profile || 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=user');
    }
  }, [user]);

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser(user.id))
        .unwrap()
        .then(() => {
          dispatch(logout());
          navigate('/login');
        });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-amber-800 font-serif">
          Shakespeare
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/books" className="hover:text-yellow-700 transition">
            📚 Books
          </Link>

          <Link to="/profile" className="hover:text-yellow-700 transition hidden md:inline">
            👤 Profile
          </Link>

          {/* User Info */}
          {username && (
            <div className="flex items-center gap-2">
              <img
                src={profilePic!}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <span className="text-gray-800 hidden sm:inline">
                Hi, <span className="font-semibold">{username}</span>
              </span>
            </div>
          )}

          {/* Logout */}
          <button
            className="text-red-600 hover:text-red-700 transition"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
