import { Toaster } from "react-hot-toast"
import LandingPage from "./pages/Landing"
import {  Route,  Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { Userroutes } from "./routes/userroutes"
import { AuthorRoutes } from "./routes/authorrutes"
import Adminroutes from "./routes/adminroutes"
import NotFound from "./components/Notfound"

const App = () => {
  return (
    <>
 
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/*" element={<Userroutes />} />
  <Route path="/author/*" element={<AuthorRoutes />} />
  <Route path="/admin/*" element={<Adminroutes />} />

  <Route path="*" element={<NotFound />} />
</Routes>

 
    

          <Toaster position="top-center" />

    </>
  )
}

export default App