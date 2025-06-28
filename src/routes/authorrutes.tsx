import { Route, Routes } from "react-router-dom";
import AuthorDashBoard from "../components/author/AuthorDashBoard";
import BookManagement from "../components/author/BookManagement";
import PurchaseHistory from "../components/author/PuchiseHistory";
import AuthorProfile from "../components/author/Profile";
import AddBook from "../components/author/AddBook";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect } from "react";
import { socket } from "../socket/socket";
import toast from "react-hot-toast";
import EditBook from "../components/book/EditBook";
import NotFound from "../components/Notfound";
import ProtectedRoute from "../components/Protector";

export const AuthorRoutes = () => {

  const {user}=useSelector((state:RootState)=>state.user)

  useEffect(()=>{
    if (user&&user.role=="AUTHOR") {

      socket.on('purchased_message', (data) => {
        
      toast.success(`Your book "${data.book}" was purchased for ₹${data.price}`, {
        duration: 4000,
        position: 'top-right',
        style: {
          border: '1px solid #4CAF50',
          padding: '12px',
          color: '#333',
        },
        iconTheme: {
          primary: '#4CAF50',
          secondary: '#FFF',
        },
      });
    });

      
    }


        return () => {
      socket.off('purchased_message');
    };
  }, [user]);

  return (
    <Routes>
        <Route path="*" element={<NotFound />} />

      <Route path="/" element={
        <ProtectedRoute>

          <AuthorDashBoard 
        />
        </ProtectedRoute>
        } />
      <Route path="/books" element={
          <ProtectedRoute>

            <BookManagement />
          </ProtectedRoute>
        } />

      <Route path="/sales" element={
        
            <ProtectedRoute>

              <PurchaseHistory />
            </ProtectedRoute>
        } />

      
      <Route path="/profile" element={
                    <ProtectedRoute>

                      <AuthorProfile />
                    </ProtectedRoute>

        
        } />
      <Route path="/addbook" element={
        
        <ProtectedRoute>

          <AddBook />
        </ProtectedRoute>
        
        
        } />
      <Route path="/book/edit/:id" element={
        <ProtectedRoute>

          <EditBook/>
        </ProtectedRoute>
        } />
    </Routes>
  );
};
