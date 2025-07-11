// import React, { useContext } from 'react';
// import Home from './pages/Home';
// import { Routes, Route, useLocation,Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Login from './components/Login';
// import { AppContext } from './context/AppContext';
// import DonorDash from './pages/DonorDash';
// import ReceiverDash from './pages/ReceiverDash';
// import VolunteerDash from './pages/VolunteerDash'; 
// import ProfilePage from './pages/ProfilePage'; 
// import SettingsPage from './pages/SettingsPage';
// import ResetPasswordPage from './pages/ResetPasswordPage';
// import CheckEmailPage from './pages/CheckEmailPage';
// import EmailVerifiedPage from './pages/EmailVerifiedPage';


// import AdminDash from './pages/AdminDash';
// import { jwtDecode } from 'jwt-decode'; 


// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// const ProtectedRoute = ({ children, role }) => {
//   const { token } = useContext(AppContext);
  
//   if (!token) {
    
//     return <Navigate to="/" />;
//   }

//   try {
//     const decodedToken = jwtDecode(token);
//     const userRole = decodedToken.role; 

//     if (userRole !== role) {
     
//       return <Navigate to="/" />;
//     }
//   } catch (error) {
    
//     console.error("Invalid token:", error);
//     return <Navigate to="/" />;
//   }

//   return children;
// };



// const App = () => {
//   const { showLogin } = useContext(AppContext);
//   const location = useLocation(); 

//    const simpleLayoutRoutes = [
//     '/reset-password',
//     '/verify-email',
//     '/check-email'
//   ];

//   const isSimpleLayout = simpleLayoutRoutes.some(route => location.pathname.startsWith(route));

//   return (
//     // <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>  
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={4000} 
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       {showLogin && <Login />}

//       {/* Show Navbar only on the homepage */}
//       {/* {location.pathname === '/' && <Navbar />}

//       <Routes>
//         <Route path='/' element={<Home />} />
//          <Route path="/check-email" element={<CheckEmailPage />} />
//         <Route path="/verify-email" element={<EmailVerifiedPage />} />
//         <Route path='/donor-dash' element={<DonorDash />} />
//         <Route path='/receiver-dash' element={<ReceiverDash/>}/>
//         <Route path="/volunteer-dash" element={<VolunteerDash />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/settings" element={<SettingsPage />} /> 
//         <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />

//         <Route 
//           path="/admin-dash" 
//           element={
//             <ProtectedRoute role="Admin">
//               <AdminDash />
//             </ProtectedRoute>
//           } 
//         />
        
//       </Routes>

//       <Footer /> */}
//       {isSimpleLayout ? (
//                 // For simple routes, just render the routes themselves
//                 <Routes>
//                     <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
//                     <Route path="/verify-email" element={<EmailVerifiedPage />} />
//                     <Route path="/check-email" element={<CheckEmailPage />} />
//                 </Routes>
//             ) : (
//                 // For all other routes, use the main application layout with the gradient and footer
//                 <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
//                     {location.pathname === '/' && <Navbar />}
//                     <Routes>
//                         <Route path='/' element={<Home />} />
//                         <Route path='/donor-dash' element={<DonorDash />} />
//                         <Route path='/receiver-dash' element={<ReceiverDash />} />
//                         <Route path="/volunteer-dash" element={<VolunteerDash />} />
//                         <Route path="/profile" element={<ProfilePage />} />
//                         <Route path="/settings" element={<SettingsPage />} />
//                         <Route
//                             path="/admin-dash"
//                             element={<ProtectedRoute role="Admin"><AdminDash /></ProtectedRoute>}
//                         />
//                     </Routes>
//                     <Footer />
//                 </div>
//             )}
//     </>
//   );
// };

// export default App;





// import React, { useContext } from 'react';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { AppContext } from './context/AppContext';
// import { jwtDecode } from 'jwt-decode';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Import all your pages and components
// import Home from './pages/Home';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Login from './components/Login';
// import DonorDash from './pages/DonorDash';
// import ReceiverDash from './pages/ReceiverDash';
// import VolunteerDash from './pages/VolunteerDash'; 
// import ProfilePage from './pages/ProfilePage'; 
// import SettingsPage from './pages/SettingsPage';
// import ResetPasswordPage from './pages/ResetPasswordPage';
// import CheckEmailPage from './pages/CheckEmailPage';
// import EmailVerifiedPage from './pages/EmailVerifiedPage';
// import AdminDash from './pages/AdminDash';

// const ProtectedRoute = ({ children, role }) => {
//   const { token } = useContext(AppContext);
//   if (!token) return <Navigate to="/" />;
//   try {
//     const decodedToken = jwtDecode(token);
//     if (decodedToken.role !== role) return <Navigate to="/" />;
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return <Navigate to="/" />;
//   }
//   return children;
// };

// const App = () => {
//   const { showLogin } = useContext(AppContext);
//   const location = useLocation(); 

//   const simpleLayoutRoutes = [
//     '/reset-password',
//     '/verify-email',
//     '/check-email'
//   ];
//   const isSimpleLayout = simpleLayoutRoutes.some(route => location.pathname.startsWith(route));

//   // ✅ DEFINE ALL ROUTES IN ONE PLACE
//   const AppRoutes = () => (
//     <Routes>
//       {/* Main App Routes */}
//       <Route path='/' element={<Home />} />
//       <Route path='/donor-dash' element={<DonorDash />} />
//       <Route path='/receiver-dash' element={<ReceiverDash />} />
//       <Route path="/volunteer-dash" element={<VolunteerDash />} />
//       <Route path="/profile" element={<ProfilePage />} />
//       <Route path="/settings" element={<SettingsPage />} />
//       <Route path="/admin-dash" element={<ProtectedRoute role="Admin"><AdminDash /></ProtectedRoute>} />

//       {/* Simple/Utility Routes */}
//       <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
//       <Route path="/verify-email" element={<EmailVerifiedPage />} />
//       <Route path="/check-email" element={<CheckEmailPage />} />
//     </Routes>
//   );

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       {showLogin && <Login />}

//       {/* ✅ FIX: Conditionally apply the layout wrapper, but render the unified routes */}
//       {isSimpleLayout ? (
//         <AppRoutes />
//       ) : (
//         <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
//           {location.pathname === '/' && <Navbar />}
//           <AppRoutes />
//           <Footer />
//         </div>
//       )}
//     </>
//   );
// };

// export default App;




import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all your pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import DonorDash from './pages/DonorDash';
import ReceiverDash from './pages/ReceiverDash';
import VolunteerDash from './pages/VolunteerDash'; 
import ProfilePage from './pages/ProfilePage'; 
import SettingsPage from './pages/SettingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CheckEmailPage from './pages/CheckEmailPage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';
import AdminDash from './pages/AdminDash';

const ProtectedRoute = ({ children, role }) => {
  const { token } = useContext(AppContext);
  if (!token) return <Navigate to="/" />;
  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== role) return <Navigate to="/" />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const { showLogin } = useContext(AppContext);
  const location = useLocation(); 

  const simpleLayoutRoutes = [
    '/reset-password',
    '/verify-email',
    '/check-email'
  ];
  const isSimpleLayout = simpleLayoutRoutes.some(route => location.pathname.startsWith(route));

  // ✅ FIX: Conditionally determine the class for the main container
  const containerClassName = isSimpleLayout 
    ? 'min-h-screen' // Simple layout gets a minimal wrapper
    : 'px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50';

  return (
    <div className={containerClassName}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
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

      {/* Conditionally render Navbar only on the homepage */}
      {!isSimpleLayout && location.pathname === '/' && <Navbar />}

      {/* ✅ FIX: A SINGLE, UNIFIED Routes block that is ALWAYS rendered */}
      <Routes>
        {/* Main App Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/donor-dash' element={<DonorDash />} />
        <Route path='/receiver-dash' element={<ReceiverDash />} />
        <Route path="/volunteer-dash" element={<VolunteerDash />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin-dash" element={<ProtectedRoute role="Admin"><AdminDash /></ProtectedRoute>} />

        {/* Simple/Utility Routes */}
        <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerifiedPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!isSimpleLayout && <Footer />}
    </div>
  );
};

export default App;