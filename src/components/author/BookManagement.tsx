import { Plus } from 'lucide-react';
import Sidebar from './SideBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import { deleteBookThunk, getBooksByAuthorIdThunk } from '../../api/bookapi';
import type { AppDispatch, RootState } from '../../store/store';
import type { BookState_types } from '../../types';

const BookManagement = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [books, setBooks] = useState<BookState_types[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = (bookId: string) => {
    navigate(`/author/book/edit/${bookId}`);
  };

  const handleDelete = async (id: string, isActive: boolean) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update status!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (result.isConfirmed && user) {
      dispatch(deleteBookThunk({ bookId: id, isActive }))
        .unwrap()
        .then(() => {
          setBooks((prev) =>
            prev.map((book) =>
              book.id === id ? { ...book, isActive: !isActive } : book
            )
          );
          toast.success(`Book changed to ${!isActive ? "Published" : "Draft"}`);
        })
        .catch(() => toast.error('Failed to update status'));
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Something went wrong. Please login again.");
      return;
    }

    setLoading(true);
    dispatch(getBooksByAuthorIdThunk(user.id))
      .unwrap()
      .then((res) => setBooks(res))
      .catch(() => toast.error("Failed to fetch books"))
      .finally(() => setLoading(false));
  }, [dispatch, user]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📚 Book Management</h1>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate('/author/addbook')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </button>
        </div>

        {/* Book List or Loading */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading books...</span>
            </div>
          ) : books.length === 0 ? (
            <p className="text-gray-600 text-sm">No books found.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                className="bg-white p-5 rounded-lg shadow-sm border flex items-start gap-5"
              >
                {/* Book Image */}
                <img
                  src={book.picture || 'https://via.placeholder.com/100x150?text=No+Image'}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md border"
                />

                {/* Book Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{book.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                    <span>Price: ₹{book.price}</span>
                    <span>Sales: {book.sellCount || 0}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {book.isActive ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    onClick={() => handleEdit(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    onClick={() => handleDelete(book.id, book.isActive)}
                  >
                    {book.isActive ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
