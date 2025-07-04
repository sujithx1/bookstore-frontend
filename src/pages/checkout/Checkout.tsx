import { useEffect, useState, } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import type {  BookState_types, PurchaseCreate_types, RazorpayOptions, User_Tyeps } from '../../types';
import type { AppDispatch } from '../../store/store';
import { getBookbyIdThunk } from '../../api/bookapi';
import { getuserbyIdThunk } from '../../api/authapi';
import { order_created_razorypay, purchaseBookThunk } from '../../api/userapi';


const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay' | ''>('');
  const [book, setBook] = useState<BookState_types | null>(null);
  const [user, setUser] = useState<User_Tyeps | null>(null);
  const navigate= useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const { bookId, userId } = useParams();
const handleSuccessPayment = async () => {
  if (!book || !user || !selectedAddress) {
    toast.error("Incomplete purchase data.");
    return;
  }

  const purchaseData: PurchaseCreate_types = {
    bookId: book.id,
    userId: user.id,
    authorId: book.author,
    price: book.price,
    address: selectedAddress,
    paymentmethod:'razorpay'
    
  };

  try {
    await dispatch(purchaseBookThunk(purchaseData)).unwrap();
    toast.success("Book purchase saved to database ✅");
    navigate(`/profile/bookings/${user.id}`)
    // Optionally navigate to order success page
  } catch (error) {
    console.error("Error saving purchase:", error);
    toast.error("Failed to save order to database");
  }
};

  useEffect(() => {
    if (!bookId || !userId) {
      toast.error('Missing book or user ID.');
      return;
    }

    dispatch(getuserbyIdThunk(userId))
      .unwrap()
      .then(setUser)
      .catch(() => toast.error('Failed to fetch user'));

    dispatch(getBookbyIdThunk(bookId))
      .unwrap()
      .then(setBook)
      .catch(() => toast.error('Failed to fetch book'));
  }, [bookId, userId, dispatch]);

  const handlePlaceOrder = async () => {
    console.log(user);
    
    console.log(selectedAddress,paymentMethod);
    
    if (!selectedAddress || !paymentMethod) {
      toast.error('Please select both address and payment method.');
      return;
    }

    if (!book || !user) {
      toast.error('Invalid order data.');
      return;
    }

    if (paymentMethod === 'razorpay') {
     
      try {
        const res = await dispatch(order_created_razorypay(book.price)).unwrap();
 
        const options:RazorpayOptions = {
          key: import.meta.env.VITE_RAZORPAYID,
          amount: res.amount,
          currency: res.currency, 
          name: "Book Store",
          description: `Order for ${book.title}`,
          image: "/logo.png",
          order_id: res.id,
          handler: function (response) {
            console.log("Payment Success:", response);
            toast.success("Payment successful!");

           handleSuccessPayment()
            // You can now save the purchase info to your DB
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.mobile || '',
          },
          theme: {
            color: "#a67c52",
          },
          modal:{
            escape:true,
            ondismiss: function () {
              console.log("User canceled the payment.");
              toast.error("Payment was canceled. Please try again.");
            },
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (err) {
        toast.error("Order creation failed.");
        console.error(err);
      }
    } else {
      toast.success("Order placed successfully with Cash on Delivery!");
      // Proceed to save order with selectedAddress and book info
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#3e2f26] px-4 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Order Summary */}
        {book && (
          <div className="bg-white border border-[#e5ddd3] p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-5 text-[#5e4636]">🛒 Order Summary</h2>
            <div className="flex items-start gap-4">
              <img
                src={book.picture}
                alt={book.title}
                className="w-24 h-32 rounded-md border object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-[#7c6652] mt-1">Author: {book.authorname}</p>
                <p className="text-[#a67c52] font-bold mt-2 text-lg">₹{book.price}</p>
              </div>
            </div>
          </div>
        )}

        {/* Address & Payment */}
        <div className="bg-white border border-[#e5ddd3] p-6 rounded-xl shadow space-y-6">
          {/* Address */}
          <div>
            <h2 className="text-xl font-bold text-[#5e4636] mb-4">📍 Select Address</h2>
            <div className="space-y-3">
             {Array.isArray(user?.Address) && user.Address.length > 0 ? (
  user.Address.map((addr) => (
    <label
      key={addr._id}
      className={`block border rounded-md p-4 cursor-pointer mb-2 ${
        selectedAddress === addr._id
          ? 'border-[#a67c52] bg-[#fffaf4]'
          : 'border-[#d6c8b8]'
      }`}
    >
      <input
        type="radio"
        name="address"
        className="mr-2 accent-[#a67c52]"
        value={addr._id}
        checked={selectedAddress === addr._id}
        onChange={() => setSelectedAddress(addr._id)}
      />
      <span className="font-semibold">{addr.name}</span>
      <div className="text-sm text-[#7c6652]">
        {addr.line}, {addr.state} - {addr.pincode}
      </div>
      <div className="text-sm text-[#9d8b7a]">📞 {addr.phone}</div>
    </label>
  ))
) : (
  <div className="text-gray-500 italic">No address found. Please add one.</div>
)}

<button
  onClick={()=>navigate('/profile/addresses')}
  className="mt-4 px-4 py-2 bg-[#a67c52] text-white rounded hover:bg-[#8a6542]"
>
  ➕ Add Address
</button>

            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-xl font-bold text-[#5e4636] mb-4">💳 Payment Method</h2>
            <div className="space-y-3">
              <label className={`block border rounded-md p-3 cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-[#a67c52] bg-[#fffaf4]' : 'border-[#d6c8b8]'
                }`}>
                <input
                  type="radio"
                  name="payment"
                  className="mr-2 accent-[#a67c52]"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery
              </label>
              <label className={`block border rounded-md p-3 cursor-pointer ${
                  paymentMethod === 'razorpay' ? 'border-[#a67c52] bg-[#fffaf4]' : 'border-[#d6c8b8]'
                }`}>
                <input
                  type="radio"
                  name="payment"
                  className="mr-2 accent-[#a67c52]"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                />
                Razorpay (UPI / Card / Netbanking)
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="text-right">
            <button
              onClick={handlePlaceOrder}
              className="bg-[#a67c52] text-white px-6 py-2 rounded hover:bg-[#8c6240] transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
