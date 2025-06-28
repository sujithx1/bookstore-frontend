import { TrendingUp, BookOpen, DollarSign, User, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../api/authapi';
import { logout } from '../../reducers/user/userslice';

const Sidebar = () => {
  const menuItems = [
    { id: 'author', label: 'Dashboard', icon: TrendingUp },
    { id: 'books', label: 'My Books', icon: BookOpen },
    { id: 'sales', label: 'Sales History', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const lastSegment = location.pathname.split('/').filter(Boolean).pop();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

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
    <div className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b flex items-center space-x-4">
        <img
          src={user?.profile || 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=user'}
          alt="Profile"
          className="w-12 h-12 rounded-full border object-cover"
        />
        <div>
          <h3 className="text-base font-semibold text-gray-800">{user?.name || 'Unknown'}</h3>
          <p className="text-xs text-gray-500">{user?.email || 'No email'}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === lastSegment;

          return (
            <button
              key={item.id}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => {
                if (item.id === 'author') {
                  navigate(`/author`);
                } else {
                  navigate(`/author/${item.id}`);
                }
              }}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
