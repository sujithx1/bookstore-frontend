import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getordersByuserid } from '../../api/userapi';
import type {   PurchaseState_History } from '../../types';
import toast from 'react-hot-toast';
import { getBookbyIdThunk } from '../../api/bookapi';
import Header from '../Header';

const BookingHistory = () => {

    const [history,setHistory]=useState<PurchaseState_History[]|[]>([])

  const  {id}=useParams()
const dispatch:AppDispatch=useDispatch()
useEffect(() => {
  if(!id){
    toast.error('Id not Found')
    return
  }
  const fetchAll = async () => {
    const orders = await dispatch(getordersByuserid(id)).unwrap();

    const withBookDetails = await Promise.all(
      orders.map(async (order) => {
        const book = await dispatch(getBookbyIdThunk(order.bookId)).unwrap();
        return { ...order, bookId: book };
      })
    );

    setHistory(withBookDetails);
  };

  if (id) fetchAll();
}, [id,dispatch]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = history.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    <Header/>
    <section className="min-h-screen bg-[#f8f5f0] px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 border border-[#e4ddd4]">
        <h2 className="text-2xl font-semibold text-[#5e4636] mb-6 text-center">Booking History</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-[#3e2f26]">
            <thead className="bg-[#f0e6dd] text-[#5e4636] uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Purchase ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
               <tr key={item.purchaseId} className="border-b hover:bg-[#fdf9f3]">
  <td className="px-4 py-3 font-medium">{item.purchaseId}</td>
  
  <td className="px-4 py-3 flex items-center gap-2">
    <img src={item.bookId.picture} className="w-10 h-14 object-cover rounded-sm border" />
    <div>
      <div className="font-medium">{item.bookId.title}</div>
      {/* <div className="text-xs text-[#7c6652]">{item.bookId.authorname}</div> */}
    </div>
  </td>

  <td className="px-4 py-3">{item.bookId.authorname}</td>
  <td className="px-4 py-3">{new Date(item.purchaseDate).toLocaleDateString()}</td>
  <td className="px-4 py-3">₹{item.price}</td>
</tr>

              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded text-sm bg-[#f8f5f0] text-[#5e4636] hover:bg-[#e9e3da]"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === idx + 1
                  ? 'bg-[#a67c52] text-white'
                  : 'bg-[#f8f5f0] text-[#5e4636] hover:bg-[#e9e3da]'
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded text-sm bg-[#f8f5f0] text-[#5e4636] hover:bg-[#e9e3da]"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default BookingHistory;
