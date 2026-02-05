import Footer from "./components/layout/Footer";
import Header from './components/layout/Header';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useUserRoutes from './components/routes/userRoutes';
import useAdminRoutes from './components/routes/adminRoutes';
import NotFound from './components/layout/NotFound';
import StandaloneResetPassword from './components/auth/StandaloneResetPassword';

function AppContent() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  const location = useLocation();
  
  // Hide header and footer on standalone auth pages and user settings pages
  const isStandaloneAuthPage = location.pathname.startsWith('/auth/');
  const isUserSettingsPage = location.pathname.startsWith('/me/');
  const hideHeaderFooter = isStandaloneAuthPage || isUserSettingsPage;

  return (
    <div className='App'>
      <Toaster position="top-center" />
      {!hideHeaderFooter && <Header />}
      <Routes>
        {/* Standalone reset password route (from email link) */}
        <Route path="/auth/reset-password/:token" element={<StandaloneResetPassword />} />
        
        {userRoutes}
        {adminRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
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
