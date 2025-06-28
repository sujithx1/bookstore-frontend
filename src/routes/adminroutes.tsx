import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../pages/admin/Admin.Dashboard'
import NotFound from '../components/Notfound'
import AdminUserManagement from '../pages/admin/useres'
import AdminBookManagement from '../pages/admin/Bookmanagement'
import AdminRevenueHistory from '../pages/admin/revenueHistory'
import ProtectedRoute from '../components/Protector'

const Adminroutes = () => {
  return (
    <Routes>
          <Route path="*" element={<NotFound/>} />
        <Route path='/' element={
            <ProtectedRoute>

                <AdminDashboard/>
            </ProtectedRoute>
            
            }/>
        <Route path='/users' element={
            <ProtectedRoute>

                <AdminUserManagement/>
            </ProtectedRoute>
            }/>
        <Route path='/books' element={
            <ProtectedRoute>

                <AdminBookManagement/>
            </ProtectedRoute>
            
            }/>
        <Route path='/sales' element={
            <ProtectedRoute>

                <AdminRevenueHistory/>
            </ProtectedRoute>
            
            
            }/>

    </Routes>
  )
}

export default Adminroutes
