import './App.css'
import Home from './pages/home/Home'
import About from './pages/about/About'
import NotFound from './pages/notFound/NotFound'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/layout/Layout'
import Admin from './admin/pages/Admin'
import Register from './pages/register/Register'
import ProtectedRoot from './pages/protectedRoot/ProtectedRoot'
import CoursesDetails from './pages/coursesDetails/CoursesDetails'
import Setting from './pages/setting/Setting'
import ProfileSetting from './pages/setting/profileSetting/ProfileSetting'
import AccountSetting from './pages/setting/accountSetting/AccountSetting'
import CoursesCart from "./pages/cart/CoursesCart";
import CoursesList from "./pages/coursesList/CoursesList";
import Wishlist from "./pages/wishlist/Wishlist";
import Contact from './pages/cotact/Contact'
import MyCourses from './pages/setting/myCourses/MyCourses'
import Login from './pages/login/login'

function App() {

  const queryClient = new QueryClient()


  return (
    <>
   <QueryClientProvider client={queryClient}>
  <BrowserRouter > {/* Set basename here */}
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} /> {/* Use index for default route */}
        <Route path='about' element={<About />} />
        <Route path='course/:id' element={<CoursesDetails />} />
        <Route path='contact' element={<Contact />} />
        
        <Route path='setting' element={<ProtectedRoot><Setting /></ProtectedRoot>}>
          <Route index element={<ProtectedRoot><ProfileSetting /></ProtectedRoot>} /> 
          <Route path='account' element={<ProtectedRoot><AccountSetting /></ProtectedRoot>} />
          <Route path='mycourses' element={<ProtectedRoot><MyCourses /></ProtectedRoot>} />
        </Route>

        <Route path='cart' element={<ProtectedRoot><CoursesCart /></ProtectedRoot>} />
        <Route path='courses' element={<CoursesList />} />
        <Route path='wishlist' element={<ProtectedRoot><Wishlist /></ProtectedRoot>} />
        <Route path='admin/*' element={<ProtectedRoot><Admin /></ProtectedRoot>} />
      
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
</QueryClientProvider>

   
     

    </>
  );
}

export default App;
