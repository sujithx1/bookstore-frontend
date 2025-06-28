import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/Sidebar';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fetchAllsalesHistory } from '../../api/adminapi';
import type {  SalesHistory_Types } from '../../types';


const AdminRevenueHistory = () => {
  const dispatch: AppDispatch = useDispatch();
  const [revenueData, setRevenueData] = useState<SalesHistory_Types[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    dispatch(fetchAllsalesHistory())
      .unwrap()
      .then((data) => {
        setRevenueData(data);
        const total = data.reduce((sum, entry) => sum + entry.price, 0);
        setTotalRevenue(total);
      })
      .catch(() => toast.error('Failed to load revenue history'));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">💰 Revenue History</h1>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase text-gray-600 tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Book Title</th>
                <th className="px-6 py-4 text-left">Buyer</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Order ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {revenueData.map((entry, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{format(new Date(entry.purchaseDate), 'yyyy-MM-dd')}</td>
                  <td className="px-6 py-4">{entry.bookId.titile}</td>
                  <td className="px-6 py-4">{entry.userId.name}</td>
                  <td className="px-6 py-4 text-right text-green-600 font-semibold">₹{entry.price}</td>
                  <td className="px-6 py-4 text-center">{entry.purchaseId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pr-2">
          <div className="text-sm text-gray-500">
            Total Revenue: <span className="text-green-700 font-semibold">₹{totalRevenue.toLocaleString()}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRevenueHistory;
