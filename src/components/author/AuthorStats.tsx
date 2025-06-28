  import { DollarSign, TrendingUp, BookOpen } from 'lucide-react';
  import type { AppDispatch, RootState } from '../../store/store';
  import { useDispatch, useSelector } from 'react-redux';
  import React, { useEffect, useState } from 'react';
  import type { AuthorStats_Types } from '../../types';
  import toast from 'react-hot-toast';
import { fetchAuthorStats } from '../../api/authorapi';

  const AuthorStats = () => {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
  const [stats,setStats]=useState<AuthorStats_Types|null>(null)
  
    useEffect(() => {
      if (user?.id) {
        dispatch(fetchAuthorStats(user.id)).unwrap()
        .then((res)=>setStats(res))
        .catch((err)=>toast.error(err))
      }
    }, [dispatch, user]);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
       {stats && (
  <>
    <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} icon={<DollarSign className="h-6 w-6 text-green-600" />} color="green" />
    <StatCard title="This Month" value={`₹${stats.monthlyRevenue}`} icon={<TrendingUp className="h-6 w-6 text-blue-600" />} color="blue" />
    <StatCard title="Total Books" value={stats.totalBooks} icon={<BookOpen className="h-6 w-6 text-purple-600" />} color="purple" />
    <StatCard title="Total Sales" value={stats.totalSales} icon={<TrendingUp className="h-6 w-6 text-orange-600" />} color="orange" />
  </>
)}

      </div>
    );
  };

  const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );

  export default AuthorStats;
