import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import type { BookState_types } from '../../types';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoooks } from '../../api/bookapi';
import toast from 'react-hot-toast';

// const sampleBooks: BookState_types[] = [
//   {
//     id: 'book-1',
//     bookId: 'B001',
//     title: 'The Tempest',
//     author: 'William Shakespeare',
//     description: 'A play about betrayal, magic, and revenge.',
//     price: 299,
//     picture: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?fit=crop&w=600&h=800&q=80',
//     isActive: true,
//   },
//   {
//     id: 'book-2',
//     bookId: 'B002',
//     title: 'Hamlet',
//     author: 'William Shakespeare',
//     description: 'A tale of madness, revenge, and tragedy.',
//     price: 499,
//     picture: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=600&h=800&q=80',
//     isActive: true,
//   },
//   {
//     id: 'book-3',
//     bookId: 'B003',
//     title: '1984',
//     author: 'George Orwell',
//     description: 'Dystopian future and authoritarian rule.',
//     price: 399,
//     picture: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?fit=crop&w=600&h=800&q=80',
//     isActive: false,
//   },
// ];

const Books = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [books,setBooks]=useState<BookState_types[]|[]>([])
  const {user}=useSelector((state:RootState)=>state.user)
  const dispatch:AppDispatch=useDispatch()

console.log(books);

  useEffect(()=>{
    dispatch(getAllBoooks()).unwrap()
    .then((res)=>setBooks(res))
    .catch(()=>toast.error('Something problem to fetch books'))
    
  },[dispatch])
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesPrice =
      priceFilter === ''
        ? true
        : priceFilter === 'low'
        ? book.price <= 300
        : priceFilter === 'mid'
        ? book.price > 300 && book.price <= 700
        : book.price > 700;
    return matchesSearch && matchesPrice;
  });

  return (
    <>
      <Header />
      <section className="min-h-screen bg-[#f9f5f0] text-[#3e2f26] px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-[#d6c8b8] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
            />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 border border-[#d6c8b8] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#a67c52]"
            >
              <option value="">All Price Ranges</option>
              <option value="low">Below ₹300</option>
              <option value="mid">₹301 - ₹700</option>
              <option value="high">Above ₹700</option>
            </select>
          </div>

          {/* Book Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white border border-[#e4dbd2] rounded-lg shadow-sm hover:shadow-lg transition p-4 flex flex-col justify-between"
              >
                <img
                  src={book.picture}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold text-[#5e4636] mb-1">{book.title}</h2>
                <p className="text-sm text-[#7c6652] mb-1 italic">by {book.authorname}</p>
                <p className="text-sm text-[#7c6652] mb-3 line-clamp-2">{book.description}</p>
                <p className="text-[#a67c52] font-bold text-lg mb-2">₹{book.price}</p>
                <button
                  className="w-full bg-[#a67c52] text-white py-2 rounded hover:bg-[#956a45] transition text-sm"
                  onClick={() => navigate(`/checkout/${book.id}/${user?.id}`)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Books;
