import AuthorStats from "./AuthorStats"
import BooksOverview from "./BooksOverview"
import RecentSales from "./RecentSales"
import Sidebar from "./SideBar"

const AuthorDashBoard = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
      <Sidebar   />
      <div className="flex-1 p-6 space-y-8">
        <AuthorStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentSales />
          <BooksOverview />
        </div>
      </div>
    </div>
    
    
    </>
  )
}

export default AuthorDashBoard