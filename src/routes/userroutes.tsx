import { Route, Routes } from "react-router-dom"
import Home from "../pages/user/Home"
import Books from "../pages/user/Bookslist"
import Profile from "../pages/user/Profile"
import EditProfile from "../components/user/EditProfile"
import BookingHistory from "../components/user/BookingHistory"
import AddressSection from "../components/user/Addresses"
import ProtectedRoute from "../components/Protector"
import Checkout from "../pages/checkout/Checkout"
import NotFound from "../components/Notfound"


export const Userroutes = () => {
  return (
    <Routes>
        <Route path="*" element={<NotFound/>} />


        <Route path="/home" element={
          <ProtectedRoute>
            <Home/>

          </ProtectedRoute>
          
          }/>
        <Route path="/books" element={
          
          <ProtectedRoute>

            <Books/>
          </ProtectedRoute>
          
          
          }/>
        <Route path="/profile" element={
          <ProtectedRoute>

          <Profile/>
          </ProtectedRoute>
          
          }/>
        <Route path="/profile/edit" element={
            <ProtectedRoute>
              <EditProfile/>
              </ProtectedRoute>
              }/>
        <Route path="/profile/bookings/:id" element={
            <ProtectedRoute>

              <BookingHistory/>
            </ProtectedRoute>
          }/>
        <Route path="/profile/addresses" element={
            <ProtectedRoute>

              <AddressSection/>
            </ProtectedRoute>
          }/>
        <Route path="/checkout/:bookId/:userId" element={
            <ProtectedRoute>

              <Checkout/>
            </ProtectedRoute>
          }/>
    </Routes>
  )
}
