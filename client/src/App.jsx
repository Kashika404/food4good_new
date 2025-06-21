


import React, { useContext } from 'react';
import Home from './pages/Home';
import { Routes, Route, useLocation,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import DonorDash from './pages/DonorDash';
import ReceiverDash from './pages/ReceiverDash';
import VolunteerDash from './pages/VolunteerDash'; 
import ProfilePage from './pages/ProfilePage'; 
import SettingsPage from './pages/SettingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import AdminDash from './pages/AdminDash';
import { jwtDecode } from 'jwt-decode'; 


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProtectedRoute = ({ children, role }) => {
  const { token } = useContext(AppContext);
  
  if (!token) {
    
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; 

    if (userRole !== role) {
     
      return <Navigate to="/" />;
    }
  } catch (error) {
    
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }

  return children;
};



const App = () => {
  const { showLogin } = useContext(AppContext);
  const location = useLocation(); // Hook to get current path

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>

      <ToastContainer
        position="top-right"
        autoClose={4000} // Toasts will close after 4 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {showLogin && <Login />}

      {/* Show Navbar only on the homepage */}
      {location.pathname === '/' && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/donor-dash' element={<DonorDash />} />
        <Route path='/receiver-dash' element={<ReceiverDash/>}/>
        <Route path="/volunteer-dash" element={<VolunteerDash />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} /> 
        <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />

        <Route 
          path="/admin-dash" 
          element={
            <ProtectedRoute role="Admin">
              <AdminDash />
            </ProtectedRoute>
          } 
        />
        
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
