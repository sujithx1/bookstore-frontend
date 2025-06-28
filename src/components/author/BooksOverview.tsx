import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import type { BookState_types } from "../../types";
import { useEffect, useState } from "react";
import { getBooksByAuthorIdThunk } from "../../api/bookapi";
import toast from "react-hot-toast";

const BooksOverview = () => {

   const { user } = useSelector((state: RootState) => state.user);
  const [books, setBooks] = useState<BookState_types[]>([]);
    const dispatch: AppDispatch = useDispatch();


    useEffect(()=>{
      if (user) {
        dispatch(getBooksByAuthorIdThunk(user.id)).unwrap()
        .then((res)=>{
          setBooks(res)
        })
        .catch(()=>toast.error('Something error fetching Books'))
        
        
      }
    },[user,dispatch])
  return (
    
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">My Books</h3>
       
      </div>
     <div className="space-y-4">
  {books.map((book) => (
    <div key={book.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div>
        <h4 className="font-medium text-gray-900">{book.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{book.description}</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-gray-500">Price: ₹{book.price}</span>
          <span className="text-sm text-gray-500">Sales: {book.sellCount || 0}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {book.isActive ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default BooksOverview;
