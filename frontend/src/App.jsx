import './App.css';
import Footer from "./components/layout/Footer";
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import UploadAvatar from './components/user/UploadAvatar';


function App() {

  return (
    <Router>
      <div className='App'>
        <Toaster position="top-center" />
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route
              path='/me/profile'
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

            <Route
              path='/me/update_profile'
              element={
                <ProtectedRoutes>
                  <UpdateProfile />
                </ProtectedRoutes>
              }
            />

            <Route
              path='/me/upload_avatar'
              element={
                <ProtectedRoutes>
                  <UploadAvatar />
                </ProtectedRoutes>
              }
            />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
