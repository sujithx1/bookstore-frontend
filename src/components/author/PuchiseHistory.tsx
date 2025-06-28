import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import type { RecentSales_Types } from "../../types";
import toast from "react-hot-toast";
import { fetchSalesHistoryThunk } from "../../api/authorapi";
import { format } from 'date-fns';

const SalesHistory = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [sales, setSales] = useState<RecentSales_Types[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('Something went wrong. Please login again.');
      return;
    }

    setLoading(true);
    dispatch(fetchSalesHistoryThunk(user.id))
      .unwrap()
      .then((data) => {
        setSales(data);
        setTotalRevenue(data.reduce((sum, sale) => sum + sale.price, 0));
      })
      .catch(() => toast.error("Failed to load sales history"))
      .finally(() => setLoading(false));
  }, [dispatch, user]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📊 Sales History</h1>
        </div>

        {/* Table or Loading */}
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading sales...</span>
            </div>
          ) : sales.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-10">No sales history available.</p>
          ) : (
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-600 tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Book Title</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                  <th className="px-6 py-4 text-center">Order ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sales.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{format(new Date(sale.purchaseDate), 'yyyy-MM-dd')}</td>
                    <td className="px-6 py-4">{sale.bookId.titile}</td>
                    <td className="px-6 py-4 text-right text-green-600 font-semibold">₹{sale.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">{sale.purchaseId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary */}
        <div className="flex justify-end pr-2">
          <div className="text-sm text-gray-500">
            Total Revenue:{' '}
            <span className="text-green-700 font-semibold">₹{totalRevenue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
