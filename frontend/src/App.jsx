import Footer from "./components/layout/Footer";
import Header from './components/layout/Header';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useUserRoutes from './components/routes/userRoutes';
import useAdminRoutes from './components/routes/adminRoutes';
import NotFound from './components/layout/NotFound';

function AppContent() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  const location = useLocation();
  
  // Hide header on user settings pages
  const hideHeader = location.pathname.startsWith('/me/');

  return (
    <div className='App'>
      <Toaster position="top-center" />
      <Header />
      <Routes>
        {userRoutes}
        {adminRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
