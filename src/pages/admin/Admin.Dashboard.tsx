import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, DollarSign, BarChart2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/Sidebar';
import OverviewCard from '../../components/admin/OverviewCard';
import QuickActionButton from '../../components/admin/QuickActionButton';
import type { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getallorders, getallusers } from '../../api/adminapi';
import type { PurchaseState } from '../../types';
import { getAllBoooks } from '../../api/bookapi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch:AppDispatch=useDispatch()
  
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    revenue: 0,
    purchases: 0,
  }); 

  useEffect(() => {
    dispatch(getallusers())
      .unwrap()
      .then((data) => {
        setStats((prev) => ({ ...prev, users: data.length }));
      });

    dispatch(getallorders())
      .unwrap()
      .then((orders) => {
        const totalRevenue = orders.reduce((acc: number, order:PurchaseState) => acc + order.price, 0);
        setStats((prev) => ({ ...prev, revenue: totalRevenue, purchases: orders.length }));
      });


      dispatch(getAllBoooks()).unwrap()
      .then((res)=>{
        setStats((prev)=>({...prev,books:res.length}))
      })
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar/>

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">📊 Admin Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <OverviewCard icon={<Users className="text-blue-600" />} title="Total Users" value={stats.users} />
          <OverviewCard icon={<BookOpen className="text-green-600" />} title="Total Books" value={stats.books} />
          <OverviewCard icon={<DollarSign className="text-yellow-600" />} title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} />
          <OverviewCard icon={<BarChart2 className="text-red-600" />} title="Total Purchases" value={stats.purchases} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <QuickActionButton color="bg-blue-600" onClick={() => navigate('/admin/users')} label="👥 Manage Users" />
          <QuickActionButton color="bg-green-600" onClick={() => navigate('/admin/books')} label="📚 Manage Books" />
          <QuickActionButton color="bg-yellow-600" onClick={() => navigate('/admin/purchases')} label="🧾 View Purchases" />
          <QuickActionButton color="bg-purple-600" onClick={() => navigate('/admin/revenue')} label="💰 Revenue Report" />
          {/* <QuickActionButton color="bg-indigo-600" onClick={() => navigate('/admin/email')} label="✉️ Send Email" /> */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
