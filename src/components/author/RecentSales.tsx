import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import toast from 'react-hot-toast';
import type {  RecentSales_Types } from '../../types';
import { fetchRecentSales } from '../../api/authorapi';



const RecentSales = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [sales, setSales] = useState<RecentSales_Types[]>([]);
    const dispatch: AppDispatch = useDispatch();
  console.log(sales)
  
  useEffect(() => {
    if (!user?.id) return;

dispatch(fetchRecentSales(user.id)).unwrap()     
      .then((data) => {
       
        setSales(data);
      })
      .catch(() => toast.error("Failed to load recent sales"));
  }, [user,dispatch]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
      <div className="space-y-4">
        {sales&&
        sales.map((sale) => (
          <div
            key={sale.purchaseId}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{sale.bookId.titile}</p>
             
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">₹{sale.price}</p>
              <p className="text-xs text-gray-500">#{sale.purchaseId}</p>
            </div>
          </div>
        ))}
        {sales.length === 0 && <p className="text-gray-500 text-sm">No recent sales</p>}
      </div>
    </div>
  );
};

export default RecentSales;
