import {
  FaUserEdit,
  FaBox,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaLocationArrow
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../api/authapi';
import { logout } from '../../reducers/user/userslice';

const Profile = () => {
  const navigate = useNavigate();
  const {user}=useSelector((state:RootState)=>state.user)
 const dispatch:AppDispatch=useDispatch()
console.log(user);

  const handleLogout = () => {
    if (user) {
      
      
      dispatch(logoutUser(user.id))
      .unwrap().then(()=>dispatch(logout()))
     navigate('/login')
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Profile</h2>

          {/* Avatar + Name */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.profile||"https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=sujith"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
            <h3 className="text-lg font-medium text-gray-800 mt-4">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-blue-500" />
<span>
  {user?.Address?.length
    ? `${user.Address[user.Address.length - 1]?.city || "city"}, ${user.Address[user.Address.length - 1]?.state || "state"}`
    : "Location"}
</span>
         </div>
          </div>

          {/* Wallet */}
          {/* <div className="bg-blue-100 text-blue-800 flex items-center justify-between px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <FaWallet />
              <span className="font-medium">Wallet Balance:</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRupeeSign />
              <span>500</span>
            </div>
          </div> */}

          {/* Menu */}
          <ul className="space-y-4 text-sm text-gray-700 font-medium">
            <li
              className="flex items-center gap-3 cursor-pointer hover:text-[#a67c52] transition"
              onClick={() => navigate('/profile/edit')}
            >
              <FaUserEdit className="text-lg" />
              Edit Profile
            </li>

            <li
              className="flex items-center gap-3 cursor-pointer hover:text-[#a67c52] transition border-t pt-4"
              onClick={() => navigate(`/profile/bookings/${user?.id}`)}
            >
              <FaBox className="text-lg" />
              Bookings
            </li>

            {/* <li
              className="flex items-center gap-3 cursor-pointer hover:text-[#a67c52] transition border-t pt-4"
              onClick={() => navigate('/profile/transactions')}
            >
              <FaMoneyBillWave className="text-lg" />
              Transactions
            </li> */}

            <li
              className="flex items-center gap-3 cursor-pointer hover:text-[#a67c52] transition border-t pt-4"
              onClick={() => navigate('/profile/addresses')}
            >
              <FaLocationArrow className="text-lg" />
              Addresses
            </li>

            <li
              onClick={handleLogout}
              className="flex items-center gap-3 cursor-pointer text-red-600 hover:text-red-700 transition border-t pt-4"
            >
              <FaSignOutAlt className="text-lg" />
              Logout
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
