import { useNavigate } from 'react-router-dom';
import { Home, Users, BookOpen, DollarSign, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../api/authapi';
import type { AppDispatch, RootState } from '../../store/store';
import toast from 'react-hot-toast';
import { logout } from '../../reducers/user/userslice';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();
const {user}=useSelector((state:RootState)=>state.user)
  const navItems = [
    { icon: <Home />, label: 'Dashboard', path: '/admin' },
    { icon: <Users />, label: 'Users', path: '/admin/users' },
    { icon: <BookOpen />, label: 'Books', path: '/admin/books' },
    { icon: <DollarSign />, label: 'Revenue', path: '/admin/sales' },
  ];

  const handleLogout = async() => {
    if(!user)
    {
      toast.error('Something Problem please Login First')
      return
    }
    await dispatch(logoutUser(user.id)).unwrap()
    dispatch(logout())

    navigate('/login');     // redirect to login page
  };

  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6 text-blue-600">📘 Admin Panel</h2>
      <nav className="space-y-3">
        {navItems.map(({ icon, label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            {icon}
            <span className="text-gray-800">{label}</span>
          </button>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-red-50 transition text-red-600 mt-6"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
