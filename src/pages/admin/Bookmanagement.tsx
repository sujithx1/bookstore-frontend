import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import type { BookState_types } from '../../types';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import AdminSidebar from '../../components/admin/Sidebar';
import { deleteBookThunk } from '../../api/bookapi';
import { getallBooksbyadmin } from '../../api/adminapi';

const AdminBookManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [books, setBooks] = useState<BookState_types[]>([]);

  useEffect(() => {
    dispatch(getallBooksbyadmin())
      .unwrap()
      .then((data) => setBooks(data))
      .catch(() => toast.error('Failed to fetch books'));
  }, [dispatch]);

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    const actionText = isActive ? 'Unpublish' : 'Publish';

    const result = await Swal.fire({
      title: `Are you sure you want to ${actionText} this book?`,
      text: `This will make the book ${isActive ? 'invisible' : 'visible'} to users.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d9488',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: `Yes, ${actionText}`,
    });

    if (result.isConfirmed) {
      dispatch(deleteBookThunk({ bookId: id, isActive }))
        .unwrap()
        .then(() => {
          setBooks((prev) =>
            prev.map((book) =>
              book.id === id ? { ...book, isActive: !isActive } : book
            )
          );
          toast.success(`Book is now ${!isActive ? 'Published' : 'Unpublished'}`);
        })
        .catch(() => toast.error('Failed to update book status'));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">📚 Manage Books</h1>

        <div className="space-y-4">
          {books.length === 0 ? (
            <p className="text-gray-600">No books available.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                className="bg-white p-4 rounded-lg shadow flex items-start gap-4 border"
              >
                <img
                  src={book.picture || 'https://via.placeholder.com/100x150?text=No+Image'}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded border"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{book.description}</p>
                  <div className="text-sm text-gray-500 mt-2 space-x-4">
                    <span>Price: ₹{book.price}</span>
                    <span>Sales: {book.sellCount || 0}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        book.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {book.isActive ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <button
                  className={`px-3 py-1 text-sm rounded font-medium ${
                    book.isActive
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  onClick={() => handleToggleStatus(book.id, book.isActive)}
                >
                  {book.isActive ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminBookManagement;
