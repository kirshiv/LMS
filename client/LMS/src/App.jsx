import './App.css'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import SideBar from './pages/admin/SideBar'
import Dashboard from './pages/admin/Dashboard'
import AddCourse from './pages/admin/Course/AddCourse'
import CourseTable from './pages/admin/Course/CourseTable'
import EditCourse from './pages/admin/Course/EditCourse'

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[{
      path:"/",
      element:
      <>
      <HeroSection/>
      <Courses/>
      </>
    },{
      path:"login",
      element:<Login/>
    },{
      path:"my-learning",
      element:<MyLearning/>
    },{
      path:"profile",
      element:<Profile/>
    },
    {
      path:"admin",
      element:<SideBar/>,
      children:[{
        path:"dashboard",
        element:<Dashboard/>
      },
      {
      path:"course",
      element:<CourseTable/>
        }, {
        path: "course/create",
        element:<AddCourse/>
        }, {
        path: "course/:courseId",
          element:<EditCourse/>
      }
      ]
    }
  ]
  }
])
function App() {
  return( 
    <div>
      <RouterProvider router={appRouter}/>
    </div>
) 
}

export default App
