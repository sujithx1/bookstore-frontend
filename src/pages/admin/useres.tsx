import { useEffect, useState } from 'react';
// import { User } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/Sidebar';
import type { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { deleteuserbyadmin, getallusers } from '../../api/adminapi';
import type { User_Tyeps } from '../../types';



const AdminUserManagement = () => {
  const [users, setUsers] = useState<User_Tyeps[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch:AppDispatch=useDispatch()

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    dispatch(getallusers()).unwrap()
    .then((res)=>{

        setTimeout(() => {
            setUsers(res);
            setLoading(false);
        }, 1000);
    });
},[dispatch])

  const toggleStatus = async(id: string,isActive:boolean) => {
    await dispatch(deleteuserbyadmin({userId:id,isActive:isActive})).unwrap()
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
    toast.success('User status updated');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">👥 User Management</h1>

        {loading ? (
          <p className="text-gray-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-sm border rounded-xl">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-center">Role</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 text-center capitalize">{user.role}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-3 py-1 text-sm text-blue-600 hover:underline"
                        onClick={() => toggleStatus(user.id,user.isActive)}
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;
